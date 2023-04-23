import { GetTranslation } from './api-call-functions'
import { CreateWordDefinition } from './word-functions'
import '../../styles/loading-spinner.css'

export const CreateTranslationContainer = (word, lastDefinition) => {
  const popupWindow = document.getElementById('wordbook-definition-popup')

  const addToDictionaryContainer = document.getElementById('wordbook-add-to-dictionary-container')

  const translationContainer = document.createElement('div')
  translationContainer.id = 'wordbook-translation-selector'
  translationContainer.style = 'max-height: 300px; overflow-x: auto; display: inline-grid; padding: 0px; background: #FFFFFF; border: 1px solid rgba(112, 0, 255, 0.4); box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03); border-radius: 8px;'
  popupWindow.insertBefore(translationContainer, addToDictionaryContainer)

  // const sourceLanguages = ['bg', 'zh', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'de', 'el', 'hu', 'id', 'it', 'ja', 'lv', 'lt', 'pl', 'pt', 'ro', 'ru', 'sl', 'sk', 'es', 'sv', 'tr', 'uk']
  const targetLanguages = [
    { lang: 'bg', country: 'Bulgarian' },
    { lang: 'zh', country: 'Chinese' },
    { lang: 'bg', country: 'Czech' },
    { lang: 'da', country: 'Danish' },
    { lang: 'nl', country: 'Dutch' },
    { lang: 'et', country: 'Estonian' },
    { lang: 'fi', country: 'Finnish' },
    { lang: 'fr', country: 'French' },
    { lang: 'de', country: 'German' },
    { lang: 'el', country: 'Greek' },
    { lang: 'hu', country: 'Hungarian' },
    { lang: 'id', country: 'Indonesian' },
    { lang: 'it', country: 'Italian' },
    { lang: 'ja', country: 'Japanese' },
    { lang: 'lv', country: 'Latvian' },
    { lang: 'lt', country: 'Lithuanian' },
    { lang: 'pl', country: 'Polish' },
    { lang: 'pt-pt', country: 'Portugese' },
    { lang: 'ro', country: 'Romanian' },
    { lang: 'ru', country: 'Russian' },
    { lang: 'sk', country: 'Slovak' },
    { lang: 'sl', country: 'Slovenian' },
    { lang: 'es', country: 'Spanish' },
    { lang: 'sv', country: 'Swedish' },
    { lang: 'uk', country: 'Ukrainian' }
  ]

  for (let i = 0; i < targetLanguages.length; i++) {
    const language = document.createElement('button')
    language.innerText = targetLanguages[i].country
    language.style = 'cursor: pointer; display: flex; padding-left: 15px;  background: transparent; border: none; font-style: normal; font-weight: 500; font-size: 16px; line-height: 30px; color: #0E0021; mix-blend-mode: normal;'

    language.addEventListener('mouseover', function () {
      language.style.background = '#FAF5FF'
    })

    language.addEventListener('mouseout', function () {
      language.style.background = '#FFFFFF'
    })

    language.addEventListener('click', async function (e) {
      const translationDiv = document.getElementById('wordbook-translate-container')
      translationDiv.ariaPressed = 'false'

      translationDiv.style.pointerEvents = 'none'

      const translationButton = document.getElementById('wordbook-translation-button')
      translationButton.style.background = 'rgba(112, 0, 255, 0.6)'
      const translateSpan = document.getElementById('wordbook-translate-word-span')
      translateSpan.style.color = 'rgba(112, 0, 255, 0.6)'

      const translationContainer = document.getElementById('wordbook-translation-selector')
      if (translationContainer) {
        translationContainer.remove()
      }

      const spinner = document.createElement('div')
      spinner.id = 'loading'
      spinner.className = 'loading'
      spinner.style = 'z-index: 999; height: 2em; width: 2em; margin: auto; margin-top: 20%;'
      popupWindow.insertBefore(spinner, addToDictionaryContainer)

      const translation = await GetTranslation(word, 'en', targetLanguages.find(l => l.country === language.innerText).lang)

      spinner.remove()

      console.log(lastDefinition)

      CreateWordDefinition(lastDefinition.status, lastDefinition.definition)

      if (translation.status === 'success') {
        CreateTranslationBox(`${language.innerText} translation`, translation.translation)
      } else {
        CreateTranslationBox(`${language.innerText} translation`, 'Sorry! Couldn\'t get the translation.')
      }

      translationDiv.style.pointerEvents = 'all'
    })

    translationContainer.appendChild(language)
  }
}

const CreateTranslationBox = (title, actualTranslation) => {
  const translationSuccessContainer = document.createElement('p')
  translationSuccessContainer.id = 'wordbook-translation-container'
  translationSuccessContainer.style = 'background: rgb(250, 245, 255); border-radius: 4px; padding: 8px 12px; display: grid; margin-bottom: 10px;'

  const wordDefinitionContainer = document.getElementById('word-definition-container')
  wordDefinitionContainer.insertBefore(translationSuccessContainer, wordDefinitionContainer.firstChild)

  const translationLanguageText = document.createElement('span')
  translationLanguageText.style = 'font-style: normal; font-weight: 500; font-size: 15px; line-height: 20px; color: #0E0021; margin-bottom: 5px;'
  translationLanguageText.innerText = title

  translationSuccessContainer.appendChild(translationLanguageText)

  const actualTranslationLine = document.createElement('span')
  actualTranslationLine.id = 'wordbook-actual-translation'
  actualTranslationLine.style = 'font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: rgba(14, 0, 33, 0.68); margin-bottom: 5px;'
  actualTranslationLine.innerText = actualTranslation

  translationSuccessContainer.appendChild(actualTranslationLine)
}
