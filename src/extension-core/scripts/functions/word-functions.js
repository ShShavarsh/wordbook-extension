import { CreateTranslationContainer } from './translation-functions'
import { UpdatePopupSize, UpdateWordDefinitionContainerHeight } from './update-functions'

export const CreateWordButton = (word) => {
  const wordButton = document.createElement('button')

  const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
  const size = Math.sqrt((videoWindow.clientHeight * videoWindow.clientHeight) + (videoWindow.clientWidth * videoWindow.clientWidth))
  const fontSize = size * 0.02

  wordButton.style = 'cursor: pointer; display: inline-block; white-space: pre-wrap; border: none; padding: 5px 5px 5px; background: rgba(8,8,8, 0.75); font-size: ' + fontSize + 'px; color: rgb(255,255,255); fill: rgb(255,255,255); font-family: "Youtube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption",sans-serif'
  wordButton.innerText = word

  return wordButton
}

export const CreateDefinitionPopup = (word, status, definition, lastDefinition) => {
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

  const translateDiv = document.createElement('div')
  translateDiv.id = 'wordbook-translate-container'
  translateDiv.style = 'cursor: pointer; flex: none; order: 0; flex-grow: 0; float: right; margin-right: 25px'
  translateDiv.ariaPressed = 'false'

  const translateSpan = document.createElement('span')
  translateSpan.id = 'wordbook-translate-word-span'
  translateSpan.innerText = 'Translate'
  translateSpan.style = 'font-style: normal; font-weight: 500; font-size: 16px; line-height: 24px; color: rgb(112, 0, 255, 0.6); mix-blend-mode: normal; flex-grow: 0; float: right;'

  const translationButton = document.createElement('button')
  translationButton.id = 'wordbook-translation-button'
  const translationSvg = '<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.913 15H19.087M11.913 15L10 19M11.913 15L14.7783 9.00902C15.0092 8.52627 15.1246 8.2849 15.2826 8.20862C15.4199 8.14228 15.5801 8.14228 15.7174 8.20862C15.8754 8.2849 15.9908 8.52627 16.2217 9.00902L19.087 15M19.087 15L21 19M1 3H7M7 3H10.5M7 3V1M10.5 3H13M10.5 3C10.0039 5.95729 8.85259 8.63618 7.16555 10.8844M9 12C8.38747 11.7248 7.76265 11.3421 7.16555 10.8844M7.16555 10.8844C5.81302 9.84776 4.60276 8.42664 4 7M7.16555 10.8844C5.56086 13.0229 3.47143 14.7718 1 16" stroke="#7000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
  const translationIcon = 'data:image/svg+xml;base64,' + window.btoa(translationSvg)
  translationButton.style = 'background: rgba(112, 0, 255, 0.6); cursor:pointer; border: none; padding: 0; -webkit-mask-image: url(' + translationIcon + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center; width: 24px; height: 20px; float: right; margin-right: 5px;'

  const clearPopupButton = document.createElement('button')
  const svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18 6L6 18M6 6L18 18" stroke="#7000FF" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
  const icon = 'data:image/svg+xml;base64,' + window.btoa(svg)
  clearPopupButton.style = 'background: #7000FF; border: none; cursor: pointer; padding: 0; -webkit-mask-image: url(' + icon + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center; width: 24px; height: 24px; float: right;'

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

  translateDiv.addEventListener('mouseover', function () {
    translationButton.style.background = 'rgba(112, 0, 255)'
    translateSpan.style.color = 'rgba(112, 0, 255)'
  })

  translateDiv.addEventListener('mouseout', function () {
    translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
    translateSpan.style.color = 'rgba(112, 0, 255, 0.6)'
  })

  translateDiv.addEventListener('click', function () {
    if (translateDiv.ariaPressed === 'false') {
      translateDiv.ariaPressed = 'true'
      translationButton.style.background = 'rgba(112, 0, 255)'
      translateSpan.style.color = 'rgba(112, 0, 255)'

      const wordDefinitionContainer = document.getElementById('word-definition-container')
      if (wordDefinitionContainer) {
        wordDefinitionContainer.remove()
        CreateTranslationContainer(word, lastDefinition)
      }
    } else {
      translateDiv.ariaPressed = 'false'
      translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
      translateSpan.style.color = 'rgba(112, 0, 255, 0.6)'

      const translationContainer = document.getElementById('wordbook-translation-selector')
      if (translationContainer) {
        translationContainer.remove()
      }

      CreateWordDefinition(status, definition)
    }
  })

  wordName.appendChild(clearPopupButton)

  translateDiv.appendChild(translateSpan)
  translateDiv.appendChild(translationButton)
  wordName.appendChild(translateDiv)

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

export const CreateWordDefinition = (status, definition) => {
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
    for (let i = 0; i < definition.meanings.length; i++) {
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
      for (let j = 0; j < meanings.length; j++) {
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

export const ValidateWord = (word) => {
  const wordFormat1 = /(?:\w|['-]\w)+/

  const extractWord = word.match(wordFormat1)

  if (extractWord) {
    return extractWord[0]
  }

  return ''
}
