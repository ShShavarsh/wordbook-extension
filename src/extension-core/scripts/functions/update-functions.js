export const UpdateCaptionProps = () => {
  const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
  if (videoWindow) {
    new ResizeObserver(CalculateNewCaptionFontSize).observe(videoWindow)
    new ResizeObserver(CalculateNewCaptionSize).observe(videoWindow)
  }
}

export const UpdateWordDefinitionContainerHeight = () => {
  const wordPopup = document.getElementById('wordbook-definition-popup')
  new ResizeObserver(CalculateNewWordDefinitionHeight).observe(wordPopup)
}

export const UpdatePopupSize = () => {
  const videoWindow = document.getElementsByClassName('ytp-caption-window-container')[0]
  new ResizeObserver(CalculatePopupSize).observe(videoWindow)
}

export const CalculateNewWordDefinitionHeight = () => {
  const wordPopup = document.getElementById('wordbook-definition-popup')
  if (wordPopup) {
    const wordPopupHeight = wordPopup.clientHeight

    const definitionContainer = document.getElementById('word-definition-container')
    if (definitionContainer) {
      definitionContainer.style.maxHeight = `${wordPopupHeight - 70}px`
    }
  }
}

export const CalculatePopupSize = () => {
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

export const CalculateNewCaptionFontSize = () => {
  const videoWindowContainer = document.getElementsByClassName('ytp-caption-window-container')

  if (!videoWindowContainer || !videoWindowContainer[0]) {
    return
  }

  const videoWindow = videoWindowContainer[0]

  const size = Math.sqrt((videoWindow.clientHeight * videoWindow.clientHeight) + (videoWindow.clientWidth * videoWindow.clientWidth))
  const fontSize = size * 0.02

  const captionText = document.getElementsByClassName('captions-text')[0]

  for (let j = 0; j < captionText.children.length; j++) {
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
