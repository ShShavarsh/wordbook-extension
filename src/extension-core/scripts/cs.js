import React, { useEffect } from 'react'
import { InitializeWordbook, InitializeDownloadTranscriptButton } from './functions/wordbook-button-functions'
import { GetPlayedSeconds, CreateCaptionText } from './functions/caption-functions'
import { GetTranscript, GetDefinition, GetOxfordDefinition } from './functions/api-call-functions'
import { UpdateCaptionProps } from './functions/update-functions'
import { CreateWordButton, ValidateWord, CreateDefinitionPopup } from './functions/word-functions'
import { SetScrollbarCss } from './functions/css-setup'

const ContentScript = () => {
  const InitSubtitle = (transcript) => {
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

    if (captionText.children) {
      for (let j = captionText.children.length - 1; j >= 0; j--) {
        captionText.removeChild(captionText.children[j])
      }
    }

    const words = captionSegment.split(' ')

    for (let i = 0; i < words.length; i++) {
      const wordButton = CreateWordButton(words[i])
      ApplyEventsToWordButton(wordButton)
      captionText.appendChild(wordButton)
    }

    UpdateCaptionProps()
  }

  const ApplyEventsToWordButton = async (wordButton) => {
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

      const validWord = ValidateWord(wordButton.innerText)
      let definitionStatus = ''
      let definition

      let lastDefinition

      if (validWord !== '') {
        const currentHistory = await chrome.storage.session.get(['words'])
        const currentHistoryArray = Object.keys(currentHistory).length > 0 ? currentHistory.words : []
        if (currentHistoryArray.length === 0) {
          const words = []
          words.push(validWord)
          await chrome.storage.session.set({ words: JSON.stringify(words) })
        } else {
          const words = JSON.parse(currentHistoryArray)
          if (!words.includes(validWord)) {
            words.push(validWord)
            await chrome.storage.session.set({ words: JSON.stringify(words) })
          }
        }

        const response = await GetDefinition(validWord)

        lastDefinition = response

        if (response.status === 'failure') {
          const oxfordResponse = await GetOxfordDefinition(validWord)

          lastDefinition = oxfordResponse

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
        CreateDefinitionPopup(validWord, definitionStatus, definition, lastDefinition)
      } else {
        CreateDefinitionPopup(validWord, definitionStatus, definition, lastDefinition)
      }
    })
  }

  useEffect(async () => {
    chrome.runtime.onMessage.addListener(async (obj) => {
      const { type, videoId } = obj

      if (type === 'NEW') {
        const popupWindow = document.getElementById('wordbook-definition-popup')
        if (popupWindow) {
          popupWindow.remove()
        }
      }

      const transcript = await GetTranscript(videoId)

      console.log('aaaa')
      if (transcript) {
        InitializeWordbook('available')
        InitializeDownloadTranscriptButton('available', videoId)
      } else {
        InitializeWordbook('unavailable')
        InitializeDownloadTranscriptButton('unavailable', videoId)
      }

      SetScrollbarCss()

      if (document.getElementById('caption-window-wordbook') === null) {
        CreateCaptionText()
      }

      if (transcript !== null) {
        InitSubtitle(transcript)
      }
    })
  }, [])

  return (
    <> </>
  )
}

export default ContentScript
