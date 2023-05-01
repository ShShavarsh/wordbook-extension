import React, { useState } from 'react'
import { Box, Container } from '@mui/material'
import HistorySvg from '../assets/history.svg'
import WordsContainerButton from './buttons/word-container-button'
import WordbookPro from './header/wordbook-pro'
import SignInButton from './buttons/sign-in-button'
import Search from './word/search'
import { useAuthentication } from '../context/auth/use-auth'
import Words from './word/words'

const Main = () => {
  const { isAuthenticated } = useAuthentication()
  const [showHistory, setShowHistory] = useState(false)
  const [showDictionary, setShowDictionary] = useState(false)

  const [searchPattern, setSearchPattern] = useState('')

  const openHistory = () => {
    setShowHistory(prev => !prev)
  }

  const openDictionary = () => {
    setShowDictionary(prev => !prev)
  }

  const SetSearchPattern = (val) => {
    setSearchPattern(val)
  }

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension')
      if (request.VideoId) { sendResponse({ farewell: 'goodbye' }) }
    }
  )

  const dummyWords = ['hey', 'what', 'love', 'support', 'problematic', 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    'terrible', 'plural', 'math', 'query', 'venom', 'machine', 'jupiter', 'lemon']

  return (
    <Container
    sx={{
      border: '3px',
      borderRadius: '5px',
      borderColor: '#F5EDFF',
      borderStyle: 'solid',
      padding: 0
    }}>
      <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'inherit',
        paddingLeft: '15px',
        marginTop: '10px'
      }}>
        <WordbookPro />
        <SignInButton />
      </Box>
      <Box sx={{
        display: 'block',
        background: 'rgba(112, 0, 255, 0.02)',
        width: 'inherit',
        marginTop: '12px'
      }}>
      {isAuthenticated && <WordsContainerButton
        name='Dictionary'
        expand={openDictionary}
        iconSvg={HistorySvg}
        sx={{
          width: '172px'
        }}/>}
      <WordsContainerButton
        name='History'
        expand={openHistory}
        iconSvg={HistorySvg}
        sx={{
          width: '148px'
        }}/>
      {(showHistory || showDictionary) && <Search setPattern={SetSearchPattern}/>}
      {(showHistory || showDictionary) && <Words words={dummyWords} searchPattern={searchPattern}/>}
      </Box>
    </Container>
  )
}

export default Main
