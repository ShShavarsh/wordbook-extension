import React, { useEffect } from 'react'
// import './content-script.js'
// import useScript from './use-script'

const ContentScript = () => {
  // useScript('./content-script.js')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'test.js'
    script.async = true
    document.body.appendChild(script)
  }
  , [])

  chrome.runtime.onMessage.addListener(async (obj) => {
    const { type, tabId, videoId } = obj

    console.log('type', type)
    console.log('videoId', videoId)
    console.log('tabId', tabId)

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
