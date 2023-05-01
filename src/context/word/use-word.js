import { useContext } from 'react'
import { WordContext } from './word-context'

export const useWord = () => {
  const context = useContext(WordContext)

  if (!context) {
    throw new Error('WordProvider context is undefined, please verify you are calling useWord() as child of a <WordProvider> component.')
  }

  return context
}
