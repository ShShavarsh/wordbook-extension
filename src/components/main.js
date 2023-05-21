import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import HistorySvg from '../assets/history.svg'
import WordsContainerButton from './buttons/word-container-button'
import WordbookPro from './header/wordbook-pro'
import SignInButton from './buttons/sign-in-button'
import Search from './word/search'
import { useAuthentication } from '../context/auth/use-auth'
import Words from './word/words'
import SummaryForm from './buttons/summary-form'
import SummaryFormExpanded from './buttons/summary-form-expanded'
import { GetVideoSummary } from '../api/get-summary'

const Main = () => {
  const { isAuthenticated } = useAuthentication()

  const [enableExtension, setEnableExtension] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState('')

  const [showHistory, setShowHistory] = useState(false)
  const [showDictionary, setShowDictionary] = useState(false)

  const [words, setWords] = useState([])

  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')
  const [loadingSummary, setLoadingSummary] = useState(false)

  const [searchPattern, setSearchPattern] = useState('')

  const GetCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  useEffect(() => {
    const getCurrentTab = async () => {
      const tab = await GetCurrentTab()

      if (tab.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
        setEnableExtension(true)
        const queryParameters = tab.url.split('?')[1]
        const urlParameters = new URLSearchParams(queryParameters)

        const videoId = urlParameters.get('v')
        setSummary('')
        setCurrentVideoId(videoId)
      } else {
        setEnableExtension(false)
      }
    }

    getCurrentTab().catch(console.error)
  }, [])

  // useEffect(() => {
  //   const getVideoSummary = async () => {
  //     if (currentVideoId) {
  //       const summary = await GetVideoSummary(currentVideoId)
  //       await chrome.storage.session.set({ summary })
  //     }
  //   }

  //   if (currentVideoId) {
  //     getVideoSummary().catch(console.error)
  //   }
  // }, [currentVideoId])

  const openHistory = async () => {
    setShowHistory(prev => !prev)
    setShowDictionary(prev => !prev)
    setShowSummary(false)

    const history = await chrome.storage.session.get(['words'])
    const historyArray = Object.keys(history).length > 0 ? history.words : []
    console.log('historyArray', historyArray)
    if (historyArray.length === 0) {
      setWords([])
    } else {
      const historyWords = JSON.parse(historyArray)
      setWords(historyWords)
    }
  }

  const openDictionary = () => {
    setShowDictionary(prev => !prev)
    setShowHistory(prev => !prev)
    setShowSummary(false)
  }

  const SetSearchPattern = (val) => {
    setSearchPattern(val)
  }

  const ShowSummary = async () => {
    setShowSummary(true)
    setShowHistory(false)
    setShowDictionary(false)

    const response = await chrome.storage.session.get({ summary })

    if (!response.summary) {
      setLoadingSummary(true)
      const summary = await GetVideoSummary(currentVideoId)
      await chrome.storage.session.set({ summary })
      setSummary(summary)
      setLoadingSummary(false)
    } else {
      setSummary(response.summary)
    }
  }

  const HideSummary = () => {
    setShowSummary(false)
    setShowHistory(false)
    setShowDictionary(false)
  }

  return (
    <>
    { enableExtension
      ? <Container
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
          marginTop: '12px',
          marginBottom: '12px'
        }}>
        { showSummary ? <SummaryFormExpanded collapse={HideSummary} summary={summary} loading={loadingSummary} /> : <SummaryForm show={ShowSummary} /> }
        {isAuthenticated && <WordsContainerButton
          name='Dictionary'
          expanded={showDictionary}
          expand={openDictionary}
          iconSvg={HistorySvg}
          sx={{
            width: '172px'
          }}/>}
        <WordsContainerButton
          name='History'
          expanded={showHistory}
          expand={openHistory}
          iconSvg={HistorySvg}
          sx={{
            width: '148px'
          }}/>
        {(showHistory || showDictionary) && <Search setPattern={SetSearchPattern} section={showHistory ? 'history' : 'dictionary'} />}
        {(showHistory || showDictionary) && <Words words={words} searchPattern={searchPattern}/>}
        </Box>
      </Container>
      : <p>aaaaaaaaaa</p>}
    </>
  )
}

export default Main
