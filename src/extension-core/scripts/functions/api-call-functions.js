const WORDBOOK_API_URL = 'https://wordbook.pro'

export const GetDefinition = async (word) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status >= 200 && response.status < 210) {
    const data = await response.json()

    if (data) {
      const allMeanings = []

      data.forEach(sector => {
        if (sector.meanings) {
          sector.meanings.forEach(wordType => {
            const meaning = {
              partOfSpeech: '',
              definitions: [{}]
            }

            const foundedMeaning = allMeanings.find((meaning) => meaning.partOfSpeech === wordType.partOfSpeech)

            if (foundedMeaning) {
              const indexToChange = allMeanings.indexOf(foundedMeaning)

              if (wordType.definitions) {
                wordType.definitions.forEach(def => {
                  foundedMeaning.definitions.push({ definition: def.definition })
                })

                allMeanings[indexToChange] = foundedMeaning
              }
            } else {
              meaning.partOfSpeech = wordType.partOfSpeech

              if (wordType.definitions) {
                wordType.definitions.forEach(def => {
                  meaning.definitions.push({ definition: def.definition })
                })
              }

              allMeanings.push(meaning)
            }
          })
        }
      })

      const definition = {
        status: 'success',
        word: data[0].word,
        meanings: allMeanings
      }

      return {
        status: 'success',
        definition
      }
    }
  } else {
    return {
      status: 'failure',
      definition: ''
    }
  }
}

export const GetTranslation = async (word, srcLang, toLang) => {
  const url = `${WORDBOOK_API_URL}/api/v2/rapid/deepl/translate?tl=${toLang}&sl=${srcLang}&text=${word}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status >= 200 && response.status < 210) {
    const data = await response.json()

    if (data) {
      return {
        status: 'success',
        translation: data.text
      }
    } else {
      return {
        status: 'failure'
      }
    }
  }

  return {
    status: 'failure'
  }
}

export const GetOxfordDefinition = async (word) => {
  const url = `${WORDBOOK_API_URL}/api/v1/oxford/definition?word=${word}&language=en`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status >= 200 && response.status < 210) {
    const data = await response.json()

    if (data) {
      let allMeanings = []

      data.results[0].lexicalEntries.forEach(def => {
        const meaning = {
          partOfSpeech: '',
          definitions: [{}]
        }

        meaning.partOfSpeech = def.lexicalCategory.text

        if (def.entries) {
          def.entries.forEach(entry => {
            if (entry.senses) {
              entry.senses.forEach(sense => {
                if (sense.definitions) {
                  meaning.definitions.push({ definition: sense.definitions[0] })
                }

                if (sense.subsenses) {
                  sense.subsenses.forEach(subsense => {
                    if (subsense && subsense.definitions) {
                      meaning.definitions.push({ definition: subsense.definitions[0] })
                    }
                  })
                }
              })
            }
          })
        }

        allMeanings = allMeanings.concat(meaning)
      })

      const definition = {
        status: 'success',
        word: data.word,
        meanings: allMeanings
      }

      return {
        status: 'success',
        definition
      }
    }
  } else {
    return {
      status: 'failure',
      definition: ''
    }
  }
}

export const GetTranscript = async (videoId) => {
  const url = `${WORDBOOK_API_URL}/api/v1/transcript/${videoId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const dict = [{}]

  if (response.status >= 200 && response.status < 210) {
    const data = await response.json()

    if (data) {
      data.transcript.forEach(element => {
        element.text = element.text.replace('\n', ' ')
        const index = Math.floor(element.start / 5)

        if (index === 0) {
          dict[0] = {
            start: 0,
            text: element.text
          }

          return true
        }

        if (!dict[index]) {
          const len = dict.length

          if (index !== len) {
            for (let i = 0; i < index - len; i++) {
              dict[len + i] = {
                start: dict[len + i - 1].start,
                text: dict[len + i - 1].text
              }
            }
          }

          const startpoint = {
            start: element.start,
            text: element.text
          }

          dict[index] = startpoint
        } else {
          dict[index].text += ' ' + element.text
        }
      }
      )
    }
  } else {
    return null
  }

  return dict
}

export const GetTranscriptAsPlainText = async (videoId) => {
  const url = `${WORDBOOK_API_URL}/api/v1/transcript-text/${videoId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status >= 200 && response.status < 210) {
      const data = await response.text()

      if (data) {
        return {
          status: 'success',
          data
        }
      }
    }

    return {
      status: 'failure',
      message: 'Can\'t get transcript text.'
    }
  } catch (e) {
    return {
      status: 'failure',
      message: 'Can\'t get transcript text.'
    }
  }
}
