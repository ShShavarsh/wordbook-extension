import { Box, Button, Icon, Typography } from '@mui/material'
import React from 'react'
import AddToDictionary from '../../assets/add-to-dictionary.svg'
import ChevronUp from '../../assets/chevron-up.svg'

const Word = ({ name, key, expandWord }) => {
  const Expand = () => {
    expandWord(name)
  }

  return (
    <Box sx={{
      display: 'table',
      marginLeft: '20px',
      marginRight: '10px',
      marginTop: '5px',
      height: '48px',
      width: '-webkit-fill-available'
    }}>
         <Box
         key={key}
        sx={{
          boxSizing: 'border-box',
          borderRadius: '8px',
          maxWidth: 'inherit',
          border: '4px solid rgba(112, 0, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          '&:hover': {
            border: '4px solid rgba(112, 0, 255, 0.12)'
          },
          '& fieldset': { border: 'none' }
        }}>
            <Button
                sx={{
                  cursor: 'pointer',
                  marginLeft: '10px',
                  minWidth: 'auto',
                  '&:hover': {
                    background: 'none'
                  }
                }}
                >
                    <Icon
                    sx={{
                      display: 'grid'
                    }}>
                        <img src={AddToDictionary}/>
                    </Icon>
            </Button>
            <Typography
            sx={{
              fontWeight: '400',
              marginRight: 'auto',
              alignSelf: 'center',
              fontSize: '18px',
              maxWidth: '225px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
                {name}
            </Typography>
            <Button
                onClick={Expand}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'none'
                  }
                }}
                >
                    <Icon
                    sx={{
                      marginRight: '5px'
                    }}>
                        <img src={ChevronUp}/>
                    </Icon>
            </Button>
        </Box>
    </Box>
  )
}

export default Word
