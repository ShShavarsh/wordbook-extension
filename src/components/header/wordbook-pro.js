import { Icon, Link, Typography } from '@mui/material'
import React from 'react'
import WordbookLogo from '../../assets/wordbook-logo.svg'

const WordbookPro = () => {
  return (
    <Link
    target='_blank'
    href='https://wordbook.pro'
    sx={{
      display: 'contents',
      width: '252px'
    }}>
      <Icon
        sx={{
          width: '40px',
          height: '32px'
        }}>
          <img src={WordbookLogo}/>
      </Icon>
      <Typography
      sx={{
        fontSize: '20px',
        textDecoration: 'none',
        boxShadow: 'none',
        color: 'black',
        cursor: 'pointer',
        width: '120px',
        marginBottom: '3px',
        marginLeft: '5px'
      }}>
        wordbook.pro
      </Typography>
  </Link>
  )
}

export default WordbookPro
