import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useWord } from '../../context/word/use-word'
import Word from './word'
import WordExpanded from './word-expanded'

const Words = ({ words, searchPattern }) => {
  const wordContext = useWord()
  const { getWordDefinition } = wordContext
  const [expandedWord, setExpandedWord] = useState('')
  const [definition, setDefinition] = useState()

  const Expand = async (word) => {
    setExpandedWord(word)

    console.log(getWordDefinition)

    const def = await getWordDefinition(word)
    console.log('def', def)
    setDefinition('def')
  }

  const Collapse = () => {
    setExpandedWord('')
  }

  return (
    <Box sx={{
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: '360px',
      marginTop: '15px',
      display: 'flow-root',
      width: '100%',
      '&::-webkit-scrollbar': {
        width: '7px !important',
        height: '5px',
        background: 'rgba(112, 0, 255, 0.04)',
        border: '1px solid rgba(112, 0, 255, 0.12)',
        borderRadius: '32px'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '32px',
        backgroundColor: 'rgba(112, 0, 255, 0.12)',
        cursor: 'pointer'
      }
    }}>
        { words.filter(w => w.startsWith(searchPattern)).map(w => expandedWord !== w ? <Word key={w} name={w} expandWord={Expand}/> : <WordExpanded key={w} name={w} definition={definition} collapseWord={Collapse}/>)}
    </Box>
  )
}

export default Words
