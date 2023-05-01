import React, { useMemo } from 'react'
import { WordContext } from './word-context'

const API_URL = 'https://wordbook.pro'

export function WordProvider (props) {
  const { children } = props

  const getWordDefinition = async (word) => {
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
      const errDef = {
        status: 'failure',
        definition: ''
      }

      return errDef
    }
  }

  const getWordDefinitionOxford = async (word) => {
    const url = `${API_URL}/api/v1/oxford/definition?word=${word}&language=en`

    try {
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
    } catch (e) {
      return {
        status: 'failure',
        definition: ''
      }
    }
  }

  const contextState = useMemo(() => ({
    getWordDefinition,
    getWordDefinitionOxford
  }), [getWordDefinition, getWordDefinitionOxford])

  return (
        <WordContext.Provider value={contextState}>
            {children}
        </WordContext.Provider>
  )
}
