/* eslint-disable no-undef */
chrome.tabs.onUpdated.addListener((tabId, tab, changeInfo) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    const queryParameters = tab.url.split('?')[1]
    const urlParameters = new URLSearchParams(queryParameters)

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      videoId: urlParameters.get('v')
    })
  }
})

chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url && tabs[0].url.includes('youtube.com/watch')) {
      const queryParameters = tabs[0].url.split('?')[1]
      const urlParameters = new URLSearchParams(queryParameters)

      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'NEW',
        videoId: urlParameters.get('v')
      })
    }
  })
})
