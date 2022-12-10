/* eslint-disable no-undef */
(() => {
  const WORDBOOK_API_URL = 'https://wordbook.pro'

  chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    const { type, videoId } = obj

    if (document.getElementById('wordbook-button') === null) {
      InitializeWordbook()
    } else {
      ReInitializeWordbook()
    }

    if (document.getElementById('caption-window-wordbook') === null) {
      CreateCaptionText()
    }

    const transcript = await GetTranscript(videoId)

    if (transcript !== null) {
      SetSubtitle(transcript)
    }

    if (type === 'NEW') {
      //
    }
  })

  const InitializeWordbook = () => {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    const wordbookButton = CreateWordbookButton()
    elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
  }

  const ReInitializeWordbook = () => {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    elementPanel.removeChild(elementPanel.children[2])
    const wordbookButton = CreateWordbookButton()
    elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
  }

  const SetSubtitle = (transcript) => {
    const currentTime = GetPlayedSeconds()

    let index = Math.floor(currentTime / 5)

    setInterval(() => {
      const currentTime = GetPlayedSeconds()

      const currentIndex = Math.floor(currentTime / 5)

      if (currentIndex !== index) {
        if (currentTime >= transcript[currentIndex].start) {
          index = currentIndex
          SetCurrentSubtitle(transcript[currentIndex].text)
        }
      }
    }, 100)
  }

  const CreateWordbookButton = () => {
    const wordbookButton = document.createElement('button')
    wordbookButton.id = 'wordbook-button'
    wordbookButton.className = 'ytp-button wordbook'
    const svg = '<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.3726 8.87999L12.5983 0.105647C12.5307 0.038033 12.4386 0 12.3428 0H0.361991C0.0403543 0 -0.121168 0.389251 0.10656 0.61651L8.11461 8.62456C8.53767 9.04762 8.53767 9.73362 8.11461 10.1571L0.10656 18.1652C-0.121168 18.3929 0.0403543 18.7817 0.361991 18.7817H12.3433C12.4391 18.7817 12.5311 18.7437 12.5987 18.6761L21.3731 9.90172C21.6548 9.61952 21.6548 9.16219 21.3726 8.87999Z" fill="#7000FF"/><path d="M29.0637 8.62456L20.5448 0.105647C20.4772 0.038033 20.3852 0 20.2894 0H16.9767C16.6551 0 16.4936 0.389251 16.7213 0.61651L24.9848 8.87999C25.267 9.16219 25.267 9.61952 24.9848 9.90172L16.7213 18.1652C16.4936 18.3929 16.6551 18.7817 16.9767 18.7817H20.2894C20.3852 18.7817 20.4772 18.7437 20.5448 18.6761L29.0637 10.1571C29.4868 9.73409 29.4868 9.04762 29.0637 8.62456Z" fill="#7000FF"/></svg>'
    const logo = 'data:image/svg+xml;base64,' + window.btoa(svg)
    wordbookButton.setAttribute('style', 'background-color: white; opacity: 0.5;-webkit-mask-image: url(' + logo + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center;vertical-align: middle;margin-right: -13px;margin-left: 9px; margin-bottom: 12px;')
    wordbookButton.ariaPressed = false

    const subtitleButton = document.getElementsByClassName('ytp-right-controls')[0].children[1]

    wordbookButton.addEventListener('click', function () {
      const subtitleButton = document.getElementsByClassName('ytp-right-controls')[0].children[1]
      const captionWindow = document.getElementById('caption-window-wordbook')

      if (wordbookButton.ariaPressed === 'false') {
        if (subtitleButton.ariaPressed === 'true') {
          subtitleButton.click()
          subtitleButton.ariaPressed = false
        }
        wordbookButton.ariaPressed = true
        wordbookButton.style.opacity = 1
        captionWindow.style.visibility = 'unset'
      } else if (wordbookButton.ariaPressed === 'true') {
        captionWindow.style.visibility = 'hidden'

        wordbookButton.style.opacity = 0.5
        wordbookButton.ariaPressed = false

        const popupWindow = document.getElementById('wordbook-definition-popup')
        if (popupWindow) {
          popupWindow.remove()
        }
      }
    })

    subtitleButton.addEventListener('click', function () {
      const captionWindow = document.getElementById('caption-window-wordbook')

      if (wordbookButton.ariaPressed === 'true') {
        wordbookButton.click()
        wordbookButton.ariaPressed = false
        captionWindow.style.visibility = 'hidden'
        wordbookButton.style.opacity = 0.5
      }
    })

    return wordbookButton
  }

  // const TransformCaptions = () => {
  //   const captionSegments = document.getElementsByClassName('ytp-caption-segment')
  //   if (captionSegments) {
  //     for (i = 0; i < captionSegments.length; i++) {
  //       const words = captionSegments[i].innerText.split(' ')

  //       const captionParentNode = captionSegments[i].parentNode
  //       captionParentNode.removeChild(captionSegments[i])

  //       for (j = 0; j < words.length; j++) {
  //         const wordButton = CreateWordButton(words[j])
  //         captionParentNode.appendChild(wordButton)
  //       }
  //     }
  //   }
  // }

  const CreateCaptionText = () => {
    const captionWindowContainer = document.getElementsByClassName('ytp-caption-window-container')[0]

    const captionWindow = document.createElement('div')
    captionWindow.className = 'caption-window ytp-caption-window-bottom ytp-caption-window-rollup'
    captionWindow.id = 'caption-window-wordbook'
    captionWindow.dir = 'ltr'
    captionWindow.tabIndex = '0'
    captionWindow.lang = 'en'
    captionWindow.draggable = 'false'

    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const width = videoWindow.clientWidth * 0.65
    const height = videoWindow.clientHeight * 0.15

    captionWindow.setAttribute('style', 'touch-action: none; text-align: left; overflow: hidden; left: 12%; bottom: 1%; width: ' + width + 'px; height: ' + height + 'px; visibility: hidden;')
    captionWindowContainer.appendChild(captionWindow)

    const captionText = document.createElement('span')
    captionText.className = 'captions-text'
    captionText.setAttribute('style', 'overflow-wrap: normal; display:block; text-align: -webkit-center;')

    captionWindow.appendChild(captionText)

    return captionText
  }

  const SetCurrentSubtitle = (captionSegment) => {
    const captionText = document.getElementsByClassName('captions-text')[0]

    for (j = captionText.children.length - 1; j >= 0; j--) {
      captionText.removeChild(captionText.children[j])
    }

    words = captionSegment.split(' ')

    for (i = 0; i < words.length; i++) {
      const wordButton = CreateWordButton(words[i])
      captionText.appendChild(wordButton)
    }

    UpdateCaptionProps()
  }

  const CreateWordButton = (word) => {
    const wordButton = document.createElement('button')

    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const size = Math.sqrt((videoWindow.clientHeight * videoWindow.clientHeight) + (videoWindow.clientWidth * videoWindow.clientWidth))
    const fontSize = size * 0.02

    wordButton.style = 'cursor: pointer; display: inline-block; white-space: pre-wrap; border: none; padding: 5px 5px; background: rgba(8,8,8, 0.75); font-size: ' + fontSize + 'px; color: rgb(255,255,255); fill: rgb(255,255,255); font-family: "Youtube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption",sans-serif'
    wordButton.innerText = word
    wordButton.addEventListener('mouseover', function () {
      wordButton.style.fontWeight = 'bold'
    })
    wordButton.addEventListener('mouseout', function () {
      wordButton.style.fontWeight = 'normal'
    })

    wordButton.addEventListener('click', function () {
      const playButton = document.getElementsByClassName('ytp-play-button')[0]
      if (playButton.dataset.titleNoTooltip === 'Pause') {
        playButton.click()
      }

      const popupWindow = document.getElementById('wordbook-definition-popup')
      if (popupWindow) {
        popupWindow.remove()
        CreateDefinitionPopup()
      } else {
        CreateDefinitionPopup()
      }
    })
    return wordButton
  }

  const CreateDefinitionPopup = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]

    const popupWindow = document.createElement('div')
    const captionWindowHeight = Math.round(document.getElementsByClassName('caption-window')[0].clientHeight)

    popupWindow.id = 'wordbook-definition-popup'
    popupWindow.style = `position: absolute; background: #FFFFFF; border-radius: 8px; box-sizing: border-box; padding: 16px 20px; z-index: 999; left: 25%; top: ${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 15}px`
    videoWindow.appendChild(popupWindow)

    const playButton = document.getElementsByClassName('ytp-play-button')[0]
    playButton.addEventListener('click', function () {
      if (playButton.dataset.titleNoTooltip === 'Play') {
        popupWindow.remove()
      }
    })

    UpdatePopupSize()
  }

  // const GetDefinition = async (word) => {
  //   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

  //   const response = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   if (response.status >= 200 && response.status < 210) {
  //     const data = await response.json()

  //     if (data) {
  //       const allMeanings = []

  //       data.forEach(sector => {
  //         if (sector.meanings) {
  //           sector.meanings.forEach(wordType => {
  //             const meaning = {
  //               partOfSpeech: '',
  //               definitions: [{}]
  //             }

  //             const foundedMeaning = allMeanings.find((meaning) => meaning.partOfSpeech === wordType.partOfSpeech)

  //             if (foundedMeaning) {
  //               const indexToChange = allMeanings.indexOf(foundedMeaning)

  //               if (wordType.definitions) {
  //                 wordType.definitions.forEach(def => {
  //                   foundedMeaning.definitions.push({ definition: def.definition })
  //                 })

  //                 allMeanings[indexToChange] = foundedMeaning
  //               }
  //             } else {
  //               meaning.partOfSpeech = wordType.partOfSpeech

  //               if (wordType.definitions) {
  //                 wordType.definitions.forEach(def => {
  //                   meaning.definitions.push({ definition: def.definition })
  //                 })
  //               }

  //               allMeanings.push(meaning)
  //             }
  //           })
  //         }
  //       })

  //       const definition = {
  //         status: 'success',
  //         word: data[0].word,
  //         meanings: allMeanings
  //       }

  //       return {
  //         status: 'success',
  //         definition
  //       }
  //     }
  //   } else {
  //     return {
  //       status: 'failure',
  //       definition: ''
  //     }
  //   }
  // }

  // const GetOxfordDefinition = async (word) => {
  //   const url = `${WORDBOOK_API_URL}/api/v1/oxford/definition?word=${word}&language=en`

  //   const response = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   if (response.status >= 200 && response.status < 210) {
  //     const data = await response.json()

  //     if (data) {
  //       let allMeanings = []

  //       data.results[0].lexicalEntries.forEach(def => {
  //         const meaning = {
  //           partOfSpeech: '',
  //           definitions: [{}]
  //         }

  //         meaning.partOfSpeech = def.lexicalCategory.text

  //         if (def.entries) {
  //           def.entries.forEach(entry => {
  //             if (entry.senses) {
  //               entry.senses.forEach(sense => {
  //                 if (sense.definitions) {
  //                   meaning.definitions.push({ definition: sense.definitions[0] })
  //                 }

  //                 if (sense.subsenses) {
  //                   sense.subsenses.forEach(subsense => {
  //                     if (subsense && subsense.definitions) {
  //                       meaning.definitions.push({ definition: subsense.definitions[0] })
  //                     }
  //                   })
  //                 }
  //               })
  //             }
  //           })
  //         }

  //         allMeanings = allMeanings.concat(meaning)
  //       })

  //       const definition = {
  //         status: 'success',
  //         word: data.word,
  //         meanings: allMeanings
  //       }

  //       return {
  //         status: 'success',
  //         definition
  //       }
  //     }
  //   } else {
  //     return {
  //       status: 'failure',
  //       definition: ''
  //     }
  //   }
  // }

  const GetTranscript = async (videoId) => {
    const url = `${WORDBOOK_API_URL}/api/v1/transcript/${videoId}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const dict = [{}]

    if (response.status >= 200 && response.status < 210) {
      const data = await response.json()

      if (data) {
        data.transcript.forEach(element => {
          element.text = element.text.replace('\n', ' ')
          const index = Math.floor(element.start / 5)

          if (index === 0) {
            dict[0] = {
              start: 0,
              text: element.text
            }

            return true
          }

          if (!dict[index]) {
            const len = dict.length

            if (index !== len) {
              for (let i = 0; i < index - len; i++) {
                dict[len + i] = {
                  start: dict[len + i - 1].start,
                  text: dict[len + i - 1].text
                }
              }
            }

            const startpoint = {
              start: element.start,
              text: element.text
            }

            dict[index] = startpoint
          } else {
            dict[index].text += ' ' + element.text
          }
        }
        )
      }
    }

    return dict
  }

  const GetPlayedSeconds = () => {
    const youtubePlayer = document.querySelector('video')

    return youtubePlayer.currentTime
  }

  const UpdateCaptionProps = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    new ResizeObserver(CalculateNewCaptionFontSize).observe(videoWindow)
    new ResizeObserver(CalculateNewCaptionSize).observe(videoWindow)
  }

  const UpdatePopupSize = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    new ResizeObserver(CalculatePopupSize).observe(videoWindow)
  }

  const CalculatePopupSize = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const width = videoWindow.clientWidth * 0.35
    const height = videoWindow.clientHeight * 0.4

    const popupWindow = document.getElementById('wordbook-definition-popup')
    popupWindow.style.width = width + 'px'
    popupWindow.style.height = height + 'px'

    const captionWindowHeight = Math.round(document.getElementsByClassName('caption-window')[0].clientHeight)

    popupWindow.style.top = `${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 85}px`
  }

  const CalculateNewCaptionFontSize = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const size = Math.sqrt((videoWindow.clientHeight * videoWindow.clientHeight) + (videoWindow.clientWidth * videoWindow.clientWidth))
    const fontSize = size * 0.02

    const captionText = document.getElementsByClassName('captions-text')[0]

    for (j = 0; j < captionText.children.length; j++) {
      captionText.children[j].style.fontSize = fontSize + 'px'
    }
  }

  const CalculateNewCaptionSize = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const width = videoWindow.clientWidth * 0.65
    const height = videoWindow.clientHeight * 0.15

    const captionWindow = document.getElementsByClassName('caption-window')[0]
    captionWindow.style.width = width + 'px'
    captionWindow.style.height = height + 'px'
  }
})()
