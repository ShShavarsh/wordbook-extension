import React, { useState } from 'react'
import { Box, Container } from '@mui/material'
import HistorySvg from '../assets/history.svg'
import WordsContainerButton from './buttons/word-container-button'
import WordbookPro from './header/wordbook-pro'
import SignInButton from './buttons/sign-in-button'
import Search from './word/search'
import { useAuthentication } from '../context/use-auth'

const Main = () => {
  const { isAuthenticated } = useAuthentication()
  const [showHistory, setShowHistory] = useState(false)

  const openHistory = () => {
    setShowHistory(prev => !prev)
    console.log('show history')
  }

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension')
      if (request.VideoId) { sendResponse({ farewell: 'goodbye' }) }
    }
  )

  return (
    <Container
    sx={{
      padding: '5px',
      border: '3px',
      borderRadius: '5px',
      borderColor: '#F5EDFF',
      borderStyle: 'solid'
    }}>
      <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'inherit',
        marginLeft: '20px',
        marginTop: '7px'
      }}>
        <WordbookPro />
        <SignInButton />
      </Box>
      <WordsContainerButton
        name='History'
        expand={openHistory}
        iconSvg={HistorySvg} />
      {showHistory && <Search />}
      {isAuthenticated && <WordsContainerButton
        name='Dictionary'
        expand={openHistory}
        iconSvg={HistorySvg} />}
    </Container>
  )
}

export default Main
