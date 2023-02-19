/* eslint-disable no-undef */
(async () => {
  const WORDBOOK_API_URL = 'https://wordbook.pro'

  chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    const { type, videoId } = obj

    ClearPopup()

    InitializeWordbook()

    SetScrollbarCss()

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

  let lastDefinitionResponse

  const SetScrollbarCss = () => {
    const customStyle = document.createElement('style')
    const css = '#word-definition-container::-webkit-scrollbar {width: 5.5px!important; border-radius: 10px!important; height: 5px;} #word-definition-container::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,.3);cursor: pointer;} #wordbook-translation-selector::-webkit-scrollbar {width: 5.5px!important; border-radius: 10px!important; height: 5px;} #wordbook-translation-selector::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,.3);cursor: pointer;}'
    if (customStyle.styleSheet) {
      customStyle.styleSheet.cssText = css
    } else {
      customStyle.appendChild(document.createTextNode(css))
    }
    const headElement = document.head
    headElement.appendChild(customStyle)
  }

  const ClearPopup = () => {
    const popupWindow = document.getElementById('wordbook-definition-popup')
    if (popupWindow) {
      popupWindow.remove()
    }
  }

  const InitializeWordbook = () => {
    if (document.getElementById('wordbook-button') === null) {
      const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
      const wordbookButton = CreateWordbookButton()
      elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
    } else {
      const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
      elementPanel.removeChild(elementPanel.children[2])
      const wordbookButton = CreateWordbookButton()
      elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
    }
  }

  const SetSubtitle = (transcript) => {
    const currentTime = GetPlayedSeconds()

    let index = Math.floor(currentTime / 5)

    setInterval(() => {
      const currentTime = GetPlayedSeconds()

      const currentIndex = Math.floor(currentTime / 5)

      if (currentIndex !== index) {
        if (transcript[currentIndex] && transcript[currentIndex].start && currentTime >= transcript[currentIndex].start) {
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
    if (videoWindow) {
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
  }

  const SetCurrentSubtitle = (captionSegment) => {
    const captionTexts = document.getElementsByClassName('captions-text')
    let captionText
    if (captionTexts && captionTexts[0]) {
      captionText = captionTexts[0]
    }

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

    wordButton.style = 'cursor: pointer; display: inline-block; white-space: pre-wrap; border: none; padding: 5px 5px 5px; background: rgba(8,8,8, 0.75); font-size: ' + fontSize + 'px; color: rgb(255,255,255); fill: rgb(255,255,255); font-family: "Youtube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption",sans-serif'
    wordButton.innerText = word
    wordButton.addEventListener('mouseover', function () {
      wordButton.style.fontWeight = 'bold'
    })
    wordButton.addEventListener('mouseout', function () {
      wordButton.style.fontWeight = 'normal'
    })

    wordButton.addEventListener('click', async function () {
      const playButton = document.getElementsByClassName('ytp-play-button')[0]
      if (playButton.dataset.titleNoTooltip === 'Pause') {
        playButton.click()
      }

      const validWord = validateWord(word)
      let definitionStatus = ''
      let definition

      if (validWord !== '') {
        const response = await GetDefinition(validWord)

        lastDefinitionResponse = response

        if (response.status === 'failure') {
          const oxfordResponse = await GetOxfordDefinition(validWord)

          lastDefinitionResponse = oxfordResponse

          definitionStatus = oxfordResponse.status
          definition = oxfordResponse.definition
        } else {
          definitionStatus = response.status
          definition = response.definition
        }
      }

      const popupWindow = document.getElementById('wordbook-definition-popup')
      if (popupWindow) {
        popupWindow.remove()
        CreateDefinitionPopup(validWord, definitionStatus, definition)
      } else {
        CreateDefinitionPopup(validWord, definitionStatus, definition)
      }
    })
    return wordButton
  }

  const validateWord = (word) => {
    const wordFormat1 = /(?:\w|['-]\w)+/

    const extractWord = word.match(wordFormat1)

    if (extractWord) {
      return extractWord[0]
    }

    return ''
  }

  const CreateDefinitionPopup = (word, status, definition) => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    const playerContainer = document.getElementsByClassName('ytd-player')[0]

    const popupWindow = document.createElement('div')
    const captionWindowHeight = Math.round(document.getElementsByClassName('caption-window')[0].clientHeight)

    popupWindow.id = 'wordbook-definition-popup'
    popupWindow.style = `position: absolute; display: flex; flex-direction: column; background: #FFFFFF; border-radius: 8px; box-sizing: border-box; padding: 16px 20px; z-index: 999; left: 30%; top: ${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 15}px`
    playerContainer.appendChild(popupWindow)

    const wordName = document.createElement('div')
    wordName.id = 'wordbook-word-name'
    wordName.style = 'align-items: center; margin-bottom: 10px;'

    popupWindow.appendChild(wordName)

    const wordSpan = document.createElement('span')
    wordSpan.style = 'height: auto; font-style: normal; font-weight: 400; font-size: 20px; line-height: 20px; color: #0E0021; margin: 0 12px 0 0;'

    wordName.appendChild(wordSpan)

    const wordNameText = document.createElement('b')
    wordNameText.innerText = word

    wordSpan.appendChild(wordNameText)

    const translationButton = document.createElement('button')
    translationButton.id = 'wordbook-translation-button'
    const translationSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.913 17H20.087M12.913 17L11 21M12.913 17L15.7783 11.009C16.0092 10.5263 16.1246 10.2849 16.2826 10.2086C16.4199 10.1423 16.5801 10.1423 16.7174 10.2086C16.8754 10.2849 16.9908 10.5263 17.2217 11.009L20.087 17M20.087 17L22 21M2 5H8M8 5H11.5M8 5V3M11.5 5H14M11.5 5C11.0039 7.95729 9.85259 10.6362 8.16555 12.8844M10 14C9.38747 13.7248 8.76265 13.3421 8.16555 12.8844M8.16555 12.8844C6.81302 11.8478 5.60276 10.4266 5 9M8.16555 12.8844C6.56086 15.0229 4.47143 16.7718 2 18" stroke="#7000FF" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
    const translationIcon = 'data:image/svg+xml;base64,' + window.btoa(translationSvg)
    translationButton.style = 'background: rgba(112, 0, 255, 0.6); border: none; cursor: pointer; padding: 0; -webkit-mask-image: url(' + translationIcon + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center; width: 20px; height: 20px; float: right; margin-right: 10px;'
    translationButton.ariaPressed = 'false'

    const clearPopupButton = document.createElement('button')
    const svg = '<svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13M1 1L13 13" stroke="#0E0021" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    const icon = 'data:image/svg+xml;base64,' + window.btoa(svg)
    clearPopupButton.style = 'background: #7000FF; border: none; cursor: pointer; padding: 0; -webkit-mask-image: url(' + icon + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center; width: 16px; height: 16px; float: right;'

    clearPopupButton.addEventListener('mouseover', function () {
      clearPopupButton.style.background = 'rgba(112, 0, 255)'
    })

    clearPopupButton.addEventListener('mouseout', function () {
      clearPopupButton.style.background = 'rgba(112, 0, 255, 0.6)'
    })

    clearPopupButton.addEventListener('click', function () {
      const popup = document.getElementById('wordbook-definition-popup')
      if (popup) {
        popupWindow.remove()
      }
    })

    translationButton.addEventListener('mouseover', function () {
      translationButton.style.background = 'rgba(112, 0, 255)'
    })

    translationButton.addEventListener('mouseout', function () {
      translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
    })

    translationButton.addEventListener('click', function () {
      if (translationButton.ariaPressed === 'false') {
        translationButton.ariaPressed = 'true'
        translationButton.style.background = 'rgba(112, 0, 255)'
        const translateSpan = document.createElement('span')
        translateSpan.id = 'wordbook-translate-word-span'
        translateSpan.innerText = 'Translate'
        translateSpan.style = 'font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: #0E0021; mix-blend-mode: normal; flex: none; order: 0; flex-grow: 0; float: right; margin-right: 5px'
        wordName.appendChild(translateSpan)

        const wordDefinitionContainer = document.getElementById('word-definition-container')
        if (wordDefinitionContainer) {
          wordDefinitionContainer.remove()
          CreateTranslationContainer(word)
        }
      } else {
        translationButton.ariaPressed = 'false'
        translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
        const translateSpan = document.getElementById('wordbook-translate-word-span')
        if (translateSpan) {
          translateSpan.remove()
        }

        const translationContainer = document.getElementById('wordbook-translation-selector')
        if (translationContainer) {
          translationContainer.remove()
        }

        CreateWordDefinition(status, definition)
      }
    })

    wordName.appendChild(clearPopupButton)
    wordName.appendChild(translationButton)

    CreateWordDefinition(status, definition)

    CreateAddToDictionaryButton()

    const playButton = document.getElementsByClassName('ytp-play-button')[0]
    playButton.addEventListener('click', function () {
      if (playButton.dataset.titleNoTooltip === 'Play') {
        popupWindow.remove()
      }
    })

    const videoStream = document.getElementsByClassName('video-stream')[0]
    videoStream.addEventListener('click', function () {
      popupWindow.remove()
    })

    document.body.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.code === 'Space') {
        popupWindow.remove()
      }
    })

    UpdatePopupSize()
  }

  const CreateTranslationContainer = (word) => {
    const popupWindow = document.getElementById('wordbook-definition-popup')

    const addToDictionaryContainer = document.getElementById('wordbook-add-to-dictionary-container')

    const translationContainer = document.createElement('div')
    translationContainer.id = 'wordbook-translation-selector'
    translationContainer.style = 'max-height: 300px; overflow-x: auto; display: inline-grid; padding: 0px; background: #FFFFFF; border: 1px solid rgba(112, 0, 255, 0.4); box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03); border-radius: 8px;'
    popupWindow.insertBefore(translationContainer, addToDictionaryContainer)

    // const sourceLanguages = ['bg', 'zh', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'de', 'el', 'hu', 'id', 'it', 'ja', 'lv', 'lt', 'pl', 'pt', 'ro', 'ru', 'sl', 'sk', 'es', 'sv', 'tr', 'uk']
    const targetLanguages = [
      { lang: 'bg', country: 'Bulgarian' },
      { lang: 'zh', country: 'Chinese' },
      { lang: 'bg', country: 'Czech' },
      { lang: 'da', country: 'Danish' },
      { lang: 'nl', country: 'Dutch' },
      { lang: 'et', country: 'Estonian' },
      { lang: 'fi', country: 'Finnish' },
      { lang: 'fr', country: 'French' },
      { lang: 'de', country: 'German' },
      { lang: 'el', country: 'Greek' },
      { lang: 'hu', country: 'Hungarian' },
      { lang: 'id', country: 'Indonesian' },
      { lang: 'it', country: 'Italian' },
      { lang: 'ja', country: 'Japanese' },
      { lang: 'lv', country: 'Latvian' },
      { lang: 'lt', country: 'Lithuanian' },
      { lang: 'pl', country: 'Polish' },
      { lang: 'pt-pt', country: 'Portugese' },
      { lang: 'ro', country: 'Romanian' },
      { lang: 'ru', country: 'Russian' },
      { lang: 'sk', country: 'Slovak' },
      { lang: 'sl', country: 'Slovenian' },
      { lang: 'es', country: 'Spanish' },
      { lang: 'sv', country: 'Swedish' },
      { lang: 'uk', country: 'Ukrainian' }
    ]

    for (i = 0; i < targetLanguages.length; i++) {
      const language = document.createElement('button')
      language.innerText = targetLanguages[i].country
      language.style = 'cursor: pointer; display: flex; padding-left: 15px;  background: transparent; border: none; font-style: normal; font-weight: 500; font-size: 16px; line-height: 30px; color: #0E0021; mix-blend-mode: normal;'

      language.addEventListener('mouseover', function () {
        language.style.background = '#FAF5FF'
      })

      language.addEventListener('mouseout', function () {
        language.style.background = '#FFFFFF'
      })

      language.addEventListener('click', async function (e) {
        const translationButton = document.getElementById('wordbook-translation-button')
        translationButton.ariaPressed = 'false'
        translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
        const translateSpan = document.getElementById('wordbook-translate-word-span')
        if (translateSpan) {
          translateSpan.remove()
        }

        const translationContainer = document.getElementById('wordbook-translation-selector')
        if (translationContainer) {
          translationContainer.remove()
        }

        const spinner = document.createElement('div')
        spinner.id = 'loading'
        spinner.className = 'loading'
        spinner.style = 'z-index: 999; height: 2em; width: 2em; margin: auto; margin-top: 20%;'
        popupWindow.insertBefore(spinner, addToDictionaryContainer)

        const translation = await GetTranslation(word, 'en', targetLanguages.find(l => l.country === language.innerText).lang)

        spinner.remove()

        CreateWordDefinition(lastDefinitionResponse.status, lastDefinitionResponse.definition)

        if (translation.status === 'success') {
          CreateTranslationBox(`${language.innerText} translation`, translation.translation)
        } else {
          CreateTranslationBox(`${language.innerText} translation`, 'Sorry! Couldn\'t get the translation.')
        }
      })

      translationContainer.appendChild(language)
    }
  }

  const CreateTranslationBox = (title, actualTranslation) => {
    const translationSuccessContainer = document.createElement('p')
    translationSuccessContainer.id = 'wordbook-translation-container'
    translationSuccessContainer.style = 'background: rgb(250, 245, 255); border-radius: 4px; padding: 8px 12px; display: grid; margin-bottom: 10px;'

    const wordDefinitionContainer = document.getElementById('word-definition-container')
    wordDefinitionContainer.insertBefore(translationSuccessContainer, wordDefinitionContainer.firstChild)

    const translationLanguageText = document.createElement('span')
    translationLanguageText.style = 'font-style: normal; font-weight: 500; font-size: 15px; line-height: 20px; color: #0E0021; margin-bottom: 5px;'
    translationLanguageText.innerText = title

    translationSuccessContainer.appendChild(translationLanguageText)

    const actualTranslationLine = document.createElement('span')
    actualTranslationLine.id = 'wordbook-actual-translation'
    actualTranslationLine.style = 'font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(14, 0, 33, 0.68); margin-bottom: 5px;'
    actualTranslationLine.innerText = actualTranslation

    translationSuccessContainer.appendChild(actualTranslationLine)
  }

  const CreateWordDefinition = (status, definition) => {
    const wordPopup = document.getElementById('wordbook-definition-popup')
    const wordPopupHeight = wordPopup.clientHeight

    const wordDefinition = document.createElement('div')
    wordDefinition.id = 'word-definition-container'
    wordDefinition.style = `overflow-y: auto !important; height: fit-content; max-height: ${wordPopupHeight - 70}px;`

    const addToDictionaryContainer = document.getElementById('wordbook-add-to-dictionary-container')

    wordPopup.insertBefore(wordDefinition, addToDictionaryContainer)

    UpdateWordDefinitionContainerHeight()

    if (status === 'failure') {
      const definitionContainer = document.createElement('p')
      definitionContainer.id = 'word-definition-failure-container'
      definitionContainer.style = 'background: rgb(250, 245, 255); border-radius: 4px; padding: 8px 12px; display: grid;'

      wordDefinition.appendChild(definitionContainer)

      const failureMessage = document.createElement('span')
      failureMessage.id = 'word-definition-failure'
      failureMessage.innerText = "Sorry! Couldn't get the word definition."
      failureMessage.style = 'font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(14, 0, 33, 0.68); margin-bottom: 5px;'

      definitionContainer.appendChild(failureMessage)
    } else if (status === 'success' && definition) {
      for (i = 0; i < definition.meanings.length; i++) {
        const successContainer = document.createElement('p')
        successContainer.id = `word-definition-success-container-${i + 1}`
        successContainer.style = 'background: #FAF5FF; border-radius: 4px; padding: 8px 12px; display: grid;'

        wordDefinition.appendChild(successContainer)

        if (definition.meanings[i].partOfSpeech) {
          const partOfSpeech = document.createElement('span')
          partOfSpeech.style = 'font-style: normal; font-weight: 500; font-size: 15px; line-height: 20px; color: #0E0021; margin-bottom: 5px;'

          successContainer.appendChild(partOfSpeech)

          const partOfSpeechText = document.createElement('b')
          partOfSpeechText.innerText = definition.meanings[i].partOfSpeech

          partOfSpeech.appendChild(partOfSpeechText)
        }

        const meanings = definition.meanings[i].definitions.slice(1, 4)
        for (j = 0; j < meanings.length; j++) {
          const realDefinition = document.createElement('span')
          realDefinition.innerText = meanings[j].definition
          realDefinition.style = 'font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(14, 0, 33, 0.68);'

          successContainer.appendChild(realDefinition)
        }
      }
    }
  }

  const CreateAddToDictionaryButton = () => {
    const addToDictionaryContainer = document.createElement('div')
    addToDictionaryContainer.id = 'wordbook-add-to-dictionary-container'
    addToDictionaryContainer.style = 'display: flex; align-items: center; margin-top: 10px;'

    const popupWindow = document.getElementById('wordbook-definition-popup')
    popupWindow.appendChild(addToDictionaryContainer)

    const addToDictionaryIconButton = document.createElement('button')
    addToDictionaryIconButton.id = 'wordbook-add-to-dictionary-icon'
    const addToDictionaryIconButtonSvg = '<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 11V5M5 8H11M15 19V5.8C15 4.11984 15 3.27976 14.673 2.63803C14.3854 2.07354 13.9265 1.6146 13.362 1.32698C12.7202 1 11.8802 1 10.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V19L8 15L15 19Z" stroke="rgb(112, 0, 255, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
    const addToDictionaryIcon = 'data:image/svg+xml;base64,' + window.btoa(addToDictionaryIconButtonSvg)
    addToDictionaryIconButton.style = 'background: rgba(112, 0, 255, 1); border: none; cursor: pointer; padding: 0; -webkit-mask-image: url(' + addToDictionaryIcon + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center; width: 20px; height: 20px; float: right;'
    addToDictionaryIconButton.ariaPressed = 'false'

    addToDictionaryContainer.appendChild(addToDictionaryIconButton)

    const addToDictionaryTextButton = document.createElement('button')
    addToDictionaryTextButton.id = 'wordbook-add-to-dictionary-text'
    addToDictionaryTextButton.style = 'font-style: normal; cursor: pointer; font-weight: 550; font-size: 16px; line-height: 24px; display: flex; align-items: center; text-align: center; color: rgb(112, 0, 255, 1); flex: none; order: 1; flex-grow: 0; border: none; background: transparent;'
    addToDictionaryTextButton.innerText = 'Add to Dictionary'

    addToDictionaryContainer.appendChild(addToDictionaryTextButton)
  }

  const GetPlayedSeconds = () => {
    const youtubePlayer = document.querySelector('video')

    return youtubePlayer.currentTime
  }

  const UpdateCaptionProps = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    if (videoWindow) {
      new ResizeObserver(CalculateNewCaptionFontSize).observe(videoWindow)
      new ResizeObserver(CalculateNewCaptionSize).observe(videoWindow)
    }
  }

  const UpdateWordDefinitionContainerHeight = () => {
    const wordPopup = document.getElementById('wordbook-definition-popup')
    new ResizeObserver(CalculateNewWordDefinitionHeight).observe(wordPopup)
  }

  const UpdatePopupSize = () => {
    const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
    new ResizeObserver(CalculatePopupSize).observe(videoWindow)
  }

  const CalculateNewWordDefinitionHeight = () => {
    const wordPopup = document.getElementById('wordbook-definition-popup')
    if (wordPopup) {
      const wordPopupHeight = wordPopup.clientHeight

      const definitionContainer = document.getElementById('word-definition-container')
      if (definitionContainer) {
        definitionContainer.style.maxHeight = `${wordPopupHeight - 70}px`
      }
    }
  }

  const CalculatePopupSize = () => {
    const videoWindowContainer = document.getElementsByClassName('ytp-caption-window-container')

    if (!videoWindowContainer || !videoWindowContainer[0]) {
      return
    }

    const videoWindow = videoWindowContainer[0]

    let width
    let height

    width = videoWindow.clientWidth * 0.3
    height = videoWindow.clientHeight * 0.4

    if (videoWindow.clientWidth && videoWindow.clientHeight) {
      if (videoWindow.clientWidth > 1000 && videoWindow.clientWidth < 1500) {
        width = videoWindow.clientWidth * 0.3
      } else if (videoWindow.clientWidth > 1500 && videoWindow.clientWidth < 1900) {
        width = videoWindow.clientWidth * 0.25
      } else if (videoWindow.clientWidth > 1900) {
        width = videoWindow.clientWidth * 0.22
      }

      if (videoWindow.clientHeight > 600 && videoWindow.clientHeight < 730) {
        height = videoWindow.clientHeight * 0.4
      } else if (videoWindow.clientHeight > 730 && videoWindow.clientHeight < 850) {
        height = videoWindow.clientHeight * 0.37
      } else if (videoWindow.clientHeight > 850) {
        height = videoWindow.clientHeight * 0.35
      }
    }

    const popupWindow = document.getElementById('wordbook-definition-popup')

    if (!popupWindow) {
      return
    }

    popupWindow.style.width = width + 'px'
    popupWindow.style.height = height + 'px'

    const captionWindowHeight = Math.round(document.getElementsByClassName('caption-window')[0].clientHeight)

    popupWindow.style.top = `${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 85}px`

    if (videoWindow.clientHeight) {
      if (videoWindow.clientHeight > 600 && videoWindow.clientHeight < 730) {
        popupWindow.style.top = `${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 85}px`
      } else if (videoWindow.clientHeight > 730 && videoWindow.clientHeight < 850) {
        popupWindow.style.top = `${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 100}px`
      } else if (videoWindow.clientHeight > 850) {
        popupWindow.style.top = `${videoWindow.clientHeight - captionWindowHeight - popupWindow.clientHeight - 130}px`
      }
    }
  }

  const CalculateNewCaptionFontSize = () => {
    const videoWindowContainer = document.getElementsByClassName('ytp-caption-window-container')

    if (!videoWindowContainer || !videoWindowContainer[0]) {
      return
    }

    const videoWindow = videoWindowContainer[0]

    const size = Math.sqrt((videoWindow.clientHeight * videoWindow.clientHeight) + (videoWindow.clientWidth * videoWindow.clientWidth))
    const fontSize = size * 0.02

    const captionText = document.getElementsByClassName('captions-text')[0]

    for (j = 0; j < captionText.children.length; j++) {
      captionText.children[j].style.fontSize = fontSize + 'px'
    }
  }

  const CalculateNewCaptionSize = () => {
    const videoWindowContainer = document.getElementsByClassName('ytp-caption-window-container')

    if (!videoWindowContainer || !videoWindowContainer[0]) {
      return
    }

    const videoWindow = videoWindowContainer[0]

    const width = videoWindow.clientWidth * 0.65
    const height = videoWindow.clientHeight * 0.15

    const captionWindow = document.getElementsByClassName('caption-window')[0]
    captionWindow.style.width = width + 'px'
    captionWindow.style.height = height + 'px'
  }

  const GetDefinition = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status >= 200 && response.status < 210) {
      const data = await response.json()

      if (data) {
        const allMeanings = []

        data.forEach(sector => {
          if (sector.meanings) {
            sector.meanings.forEach(wordType => {
              const meaning = {
                partOfSpeech: '',
                definitions: [{}]
              }

              const foundedMeaning = allMeanings.find((meaning) => meaning.partOfSpeech === wordType.partOfSpeech)

              if (foundedMeaning) {
                const indexToChange = allMeanings.indexOf(foundedMeaning)

                if (wordType.definitions) {
                  wordType.definitions.forEach(def => {
                    foundedMeaning.definitions.push({ definition: def.definition })
                  })

                  allMeanings[indexToChange] = foundedMeaning
                }
              } else {
                meaning.partOfSpeech = wordType.partOfSpeech

                if (wordType.definitions) {
                  wordType.definitions.forEach(def => {
                    meaning.definitions.push({ definition: def.definition })
                  })
                }

                allMeanings.push(meaning)
              }
            })
          }
        })

        const definition = {
          status: 'success',
          word: data[0].word,
          meanings: allMeanings
        }

        return {
          status: 'success',
          definition
        }
      }
    } else {
      return {
        status: 'failure',
        definition: ''
      }
    }
  }

  const GetTranslation = async (word, srcLang, toLang) => {
    const url = `${WORDBOOK_API_URL}/api/v2/rapid/deepl/translate?tl=${toLang}&sl=${srcLang}&text=${word}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status >= 200 && response.status < 210) {
      const data = await response.json()

      if (data) {
        return {
          status: 'success',
          translation: data.text
        }
      } else {
        return {
          status: 'failure'
        }
      }
    }

    return {
      status: 'failure'
    }
  }

  const GetOxfordDefinition = async (word) => {
    const url = `${WORDBOOK_API_URL}/api/v1/oxford/definition?word=${word}&language=en`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status >= 200 && response.status < 210) {
      const data = await response.json()

      if (data) {
        let allMeanings = []

        data.results[0].lexicalEntries.forEach(def => {
          const meaning = {
            partOfSpeech: '',
            definitions: [{}]
          }

          meaning.partOfSpeech = def.lexicalCategory.text

          if (def.entries) {
            def.entries.forEach(entry => {
              if (entry.senses) {
                entry.senses.forEach(sense => {
                  if (sense.definitions) {
                    meaning.definitions.push({ definition: sense.definitions[0] })
                  }

                  if (sense.subsenses) {
                    sense.subsenses.forEach(subsense => {
                      if (subsense && subsense.definitions) {
                        meaning.definitions.push({ definition: subsense.definitions[0] })
                      }
                    })
                  }
                })
              }
            })
          }

          allMeanings = allMeanings.concat(meaning)
        })

        const definition = {
          status: 'success',
          word: data.word,
          meanings: allMeanings
        }

        return {
          status: 'success',
          definition
        }
      }
    } else {
      return {
        status: 'failure',
        definition: ''
      }
    }
  }

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
})()
