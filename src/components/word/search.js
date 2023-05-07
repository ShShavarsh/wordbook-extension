import { Box, Icon, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchSvg from '../../assets/Search.svg'

const Search = ({ setPattern, section }) => {
  const SetPattern = (e) => {
    setPattern(e.target.value)
  }

  return (
    <Box sx={{
      display: 'grid',
      marginLeft: '20px',
      marginRight: '20px',
      height: '32px',
      marginTop: '5px',
      '& .MuiOutlinedInput-root': {
        height: '32px'
      }
    }}>
        <TextField
        placeholder={`Search in the ${section}`}
        onChange={SetPattern}
        InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                <Icon
                sx={{
                  height: '18px',
                  marginBottom: '5px',
                  marginRight: '10px',
                  '& img': { height: '18px', marginBottom: '5px' }
                }}>
                    <img src={SearchSvg}/>
                </Icon>
              </InputAdornment>
          )
        }}
        sx={{
          boxSizing: 'border-box',
          '& .MuiOutlinedInput-root': {
            borderBottom: '1px solid rgba(112, 0, 255, 0.4)',
            '&:hover fieldset': {
              borderBottom: '1px solid rgba(112, 0, 255, 0.4)'
            }
          },
          '& .MuiInputAdornment-root': {
            marginRight: 0
          },
          '& fieldset': { border: 'none' },
          '& input::placeholder': {
            fontSize: '12px'
          },
          '& input': {
            marginBottom: '5px'
          }
        }}>

        </TextField>
    </Box>
  )
}

export default Search
