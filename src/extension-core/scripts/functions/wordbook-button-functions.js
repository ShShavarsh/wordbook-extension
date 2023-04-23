import { GetTranscriptAsPlainText } from './api-call-functions'

export const InitializeWordbook = (status) => {
  if (document.getElementById('wordbook-button') === null) {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    const wordbookButton = CreateWordbookButton(status)
    elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
  } else {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    elementPanel.removeChild(elementPanel.children[2])
    const wordbookButton = CreateWordbookButton(status)
    elementPanel.insertBefore(wordbookButton, elementPanel.children[2])
  }
}

export const InitializeDownloadTranscriptButton = (status, videoId) => {
  if (document.getElementById('wordbook-download-transcript') === null) {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    const wordbookDownloadTranscriptButton = CreateDownloadTranscriptButton(status, videoId)
    elementPanel.insertBefore(wordbookDownloadTranscriptButton, elementPanel.children[3])
  } else {
    const elementPanel = document.getElementsByClassName('ytp-right-controls')[0]
    elementPanel.removeChild(elementPanel.children[3])
    const wordbookDownloadTranscriptButton = CreateDownloadTranscriptButton(status, videoId)
    elementPanel.insertBefore(wordbookDownloadTranscriptButton, elementPanel.children[3])
  }
}

const CreateWordbookButton = (status) => {
  const wordbookButton = document.createElement('button')
  wordbookButton.id = 'wordbook-button'
  wordbookButton.className = 'ytp-button wordbook'
  const svg = '<svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.3726 8.87999L12.5983 0.105647C12.5307 0.038033 12.4386 0 12.3428 0H0.361991C0.0403543 0 -0.121168 0.389251 0.10656 0.61651L8.11461 8.62456C8.53767 9.04762 8.53767 9.73362 8.11461 10.1571L0.10656 18.1652C-0.121168 18.3929 0.0403543 18.7817 0.361991 18.7817H12.3433C12.4391 18.7817 12.5311 18.7437 12.5987 18.6761L21.3731 9.90172C21.6548 9.61952 21.6548 9.16219 21.3726 8.87999Z" fill="#7000FF"/><path d="M29.0637 8.62456L20.5448 0.105647C20.4772 0.038033 20.3852 0 20.2894 0H16.9767C16.6551 0 16.4936 0.389251 16.7213 0.61651L24.9848 8.87999C25.267 9.16219 25.267 9.61952 24.9848 9.90172L16.7213 18.1652C16.4936 18.3929 16.6551 18.7817 16.9767 18.7817H20.2894C20.3852 18.7817 20.4772 18.7437 20.5448 18.6761L29.0637 10.1571C29.4868 9.73409 29.4868 9.04762 29.0637 8.62456Z" fill="#7000FF"/></svg>'
  const logo = 'data:image/svg+xml;base64,' + window.btoa(svg)
  wordbookButton.setAttribute('style', 'background-color: white; opacity: 0.5;-webkit-mask-image: url(' + logo + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center;vertical-align: middle;margin-right: -13px;margin-left: 9px; margin-bottom: 12px;')
  wordbookButton.ariaPressed = false

  if (status === 'available') {
    wordbookButton.title = 'Turn on/off the Wordbook captions.'
  } else {
    wordbookButton.title = 'Wordbook captions are unavailable for this video.'
    return wordbookButton
  }

  const subtitleButton = document.getElementsByClassName('ytp-right-controls')[0].children[1]

  wordbookButton.addEventListener('mouseover', function () {
    wordbookButton.style.opacity = 1
  })

  wordbookButton.addEventListener('mouseout', function () {
    if (wordbookButton.ariaPressed === 'true') {
      return
    }
    wordbookButton.style.opacity = 0.5
  })

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

const CreateDownloadTranscriptButton = (status, videoId) => {
  const wordbookDownloadTranscriptButton = document.createElement('button')
  wordbookDownloadTranscriptButton.id = 'wordbook-download-transcript'
  wordbookDownloadTranscriptButton.className = 'ytp-button wordbook wordbook-transcript'
  const svg = '<svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M28 20V21.6C28 23.8402 28 24.9603 27.564 25.816C27.1805 26.5686 26.5686 27.1805 25.816 27.564C24.9603 28 23.8402 28 21.6 28H10.4C8.15979 28 7.03969 28 6.18404 27.564C5.43139 27.1805 4.81947 26.5686 4.43597 25.816C4 24.9603 4 23.8402 4 21.6V20M22.6667 13.3333L16 20M16 20L9.33333 13.3333M16 20V4" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
  const logo = 'data:image/svg+xml;base64,' + window.btoa(svg)
  wordbookDownloadTranscriptButton.setAttribute('style', 'background-color: white; opacity: 0.5;-webkit-mask-image: url(' + logo + ');-webkit-mask-repeat: no-repeat;-webkit-box-align: center;vertical-align: middle;margin-right: -15px;margin-left: 9px; margin-bottom: 23px;')

  if (status === 'available') {
    wordbookDownloadTranscriptButton.title = 'Download the video\'s subtitles.'
  } else {
    wordbookDownloadTranscriptButton.title = 'The subtitles are unavailable for this video.'
    return wordbookDownloadTranscriptButton
  }

  wordbookDownloadTranscriptButton.addEventListener('mouseover', function () {
    wordbookDownloadTranscriptButton.style.opacity = 1
  })

  wordbookDownloadTranscriptButton.addEventListener('mouseout', function () {
    wordbookDownloadTranscriptButton.style.opacity = 0.5
  })

  wordbookDownloadTranscriptButton.addEventListener('click', async function () {
    const result = await GetTranscriptAsPlainText(videoId)

    if (result.status === 'success') {
      const blob = new Blob([result.data], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = 'transcript.txt'
      link.href = url
      link.click()
    }
  })

  return wordbookDownloadTranscriptButton
}
