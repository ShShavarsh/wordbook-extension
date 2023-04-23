import { UpdateCaptionProps } from './update-functions'
import { CreateWordButton } from './word-functions'

export const CreateCaptionText = () => {
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

export const SetSubtitle = (transcript) => {
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

const SetCurrentSubtitle = (captionSegment) => {
  const captionTexts = document.getElementsByClassName('captions-text')
  let captionText
  if (captionTexts && captionTexts[0]) {
    captionText = captionTexts[0]
  }

  for (let j = captionText.children.length - 1; j >= 0; j--) {
    captionText.removeChild(captionText.children[j])
  }

  const words = captionSegment.split(' ')

  for (let i = 0; i < words.length; i++) {
    const wordButton = CreateWordButton(words[i])
    captionText.appendChild(wordButton)
  }

  UpdateCaptionProps()
}

export const GetPlayedSeconds = () => {
  const youtubePlayer = document.querySelector('video')

  return youtubePlayer.currentTime
}
