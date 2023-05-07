import React, { useState } from 'react'
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

const Main = () => {
  const { isAuthenticated } = useAuthentication()
  const [showHistory, setShowHistory] = useState(false)
  const [showDictionary, setShowDictionary] = useState(false)

  const [words, setWords] = useState([])

  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')

  const [searchPattern, setSearchPattern] = useState('')

  const openHistory = async () => {
    setShowHistory(prev => !prev)
    setShowDictionary(prev => !prev)
    setShowSummary(false)

    const history = await chrome.storage.session.get(['words'])
    const historyArray = Object.keys(history).length > 0 ? history : []
    if (historyArray.length === 0) {
      setWords([])
    } else {
      const historyWords = JSON.parse(historyArray.words)
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
  }

  const HideSummary = () => {
    setShowSummary(false)
    setShowHistory(false)
    setShowDictionary(false)
  }

  const dummySummary = "Well hello and welcome to this English lesson about nice once again welcome to this English lesson about nice gifts? No I'm not. What kind of nice things will I talk about? person in this English lesson. Well hello and welcome to this English lesson about nice once again welcome to this English lesson about nice gifts? No I'm not. What kind of nice things will I talk about? person in this English lesson. Well hello and welcome to this English lesson about nice once again welcome to this English lesson about nice gifts? No I'm not. What kind of nice things will I talk about?"

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
        marginTop: '12px',
        marginBottom: '12px'
      }}>
      { showSummary ? <SummaryFormExpanded collapse={HideSummary} summary={dummySummary} /> : <SummaryForm show={ShowSummary} /> }
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
  )
}

export default Main
