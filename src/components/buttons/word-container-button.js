import { Box, Icon, Typography } from '@mui/material'
import React from 'react'
import ChevronDown from '../../assets/chevron-down.svg'
import ChevronUp from '../../assets/chevron-up.svg'

const WordsContainerButton = ({ name, expand, expanded, iconSvg, sx }) => {
  const open = () => {
    expand()
  }

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '18px',
      width: '152px',
      height: '40px',
      borderRadius: '8px',
      border: '3px solid rgb(245, 237, 255)',
      marginTop: '10px',
      marginBottom: '10px',
      ...sx
    }}>
      <Box
      onClick={open}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: '187px',
        height: '40px',
        borderRadius: '8px',
        marginTop: '10px',
        marginBottom: '10px',
        justifyContent: 'space-evenly',
        cursor: 'pointer',
        ...(expanded && {
          backgroundColor: 'rgb(112, 0, 255, 0.08)',
          border: '1px solid rgba(112, 0, 255, 0.4)'
        }),
        '&:hover': {
          backgroundColor: 'rgb(112, 0, 255, 0.08)',
          border: '1px solid rgba(112, 0, 255, 0.4)'
        },
        ...sx
      }}>
        <Icon
        sx={{
          height: '32px'
        }}>
          <img src={iconSvg}/>
        </Icon>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: 'none',
            textTransform: 'capitalize'
          }}>
            {name}
        </Typography>
        <Icon
        sx={{
          marginRight: '10px',
          height: '32px',
          display: 'contents'
        }}>
          <img src={expanded ? ChevronDown : ChevronUp}/>
        </Icon>
      </Box>
    </Box>
  )
}

export default WordsContainerButton
