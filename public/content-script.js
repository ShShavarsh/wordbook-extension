/* eslint-disable no-undef */
(() => {
  let currentVideo = ''

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, videoId } = obj

    if (type === 'NEW') {
      currentVideo = videoId
      newVideoLoaded()
    }
  })

  const newVideoLoaded = () => {
    console.log('new video loaded with id - ' + currentVideo)
  }
})()
