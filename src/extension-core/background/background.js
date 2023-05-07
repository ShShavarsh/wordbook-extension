chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    const queryParameters = tab.url.split('?')[1]
    const urlParameters = new URLSearchParams(queryParameters)

    chrome.storage.session.set({ words: [] })

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      tabId,
      videoId: urlParameters.get('v')
    })
  }
})

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' })
