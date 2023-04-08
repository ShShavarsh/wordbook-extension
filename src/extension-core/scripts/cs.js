import React from 'react'
import './content-script.js'
import useScript from './use-script'

const ContentScript = () => {
  useScript('./content-script.js')

  let tabID

  chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    const { type, videoId, tabId } = obj

    tabID = tabId

    console.log('type', type)
    console.log('videoId', videoId)
    console.log('tabId', tabId)
  })

  // chrome.scripting.executeScript.executeScript({
  //   target: { tabID },
  //   files: ['script.js']
  // })
  //   .then(() => console.log('script injected'))

  return (
    <div>aaaaaaaaaaa</div>
  )
}

export default ContentScript

// <script src="./content-script.js" type="text/javascript" />
