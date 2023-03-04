import { Box, Icon, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChevronDown from '../../assets/chevron-down.svg'
import ChevronUp from '../../assets/chevron-up.svg'

const WordsContainerButton = ({ name, expand, iconSvg }) => {
  const [expanded, setExpanded] = useState(false)

  const open = () => {
    setExpanded(prev => !prev)
    expand()
  }

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '20px',
      width: '187px',
      height: '56px',
      borderRadius: '12px',
      border: '3px solid rgb(245, 237, 255)',
      marginTop: '10px',
      marginBottom: '10px'
    }}>
      <Box
      onClick={open}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: '187px',
        height: '56px',
        borderRadius: '12px',
        marginTop: '10px',
        marginBottom: '10px',
        justifyContent: 'space-evenly',
        cursor: 'pointer',
        ...(expanded && {
          backgroundColor: 'rgb(112, 0, 255, 0.2)',
          border: '1px solid rgba(112, 0, 255, 0.4)'
        }),
        '&:hover': {
          backgroundColor: 'rgb(112, 0, 255, 0.2)',
          border: '1px solid rgba(112, 0, 255, 0.4)'
        }
      }}>
        <Icon
        sx={{
          height: '32px'
        }}>
          <img src={iconSvg}/>
        </Icon>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontSize: '16px',
            boxShadow: 'none',
            textTransform: 'capitalize'
          }}>
            {name}
        </Typography>
        <Icon
        sx={{
          marginRight: '10px',
          height: '32px'
        }}>
          <img src={expanded ? ChevronUp : ChevronDown}/>
        </Icon>
      </Box>
    </Box>
  )
}

export default WordsContainerButton
