const API_URL = 'https://wordbook.pro'

export const GetVideoSummary = async (videoId) => {
  const url = `${API_URL}/api/v2/open-ai/summarize-transcript/${videoId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status >= 200 && response.status < 210) {
    const data = await response.json()
    return data.text
  }
}
