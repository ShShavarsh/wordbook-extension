import React from 'react'
import { InitializeWordbook, InitializeDownloadTranscriptButton } from './init-buttons'
// import './content-script.js'
// import useScript from './use-script'

const ContentScript = () => {
  // useScript('./content-script.js')

  chrome.runtime.onMessage.addListener(async (obj) => {
    const { type, tabId, videoId } = obj

    console.log('type', type)
    console.log('videoId', videoId)
    console.log('tabId', tabId)

    InitializeWordbook()
    InitializeDownloadTranscriptButton()

    // chrome.scripting.executeScript({
    //   target: { tabId },
    //   func: getTitle
    // })
    //   .then(() => console.log('script injected'))
  })

  return (
    <div>aaaaaaaaaaa</div>
  )
}

export default ContentScript

// <script src="./content-script.js" type="text/javascript" />
