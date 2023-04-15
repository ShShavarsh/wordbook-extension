chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    const queryParameters = tab.url.split('?')[1]
    const urlParameters = new URLSearchParams(queryParameters)

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      tabId,
      videoId: urlParameters.get('v')
    })
  }
})
