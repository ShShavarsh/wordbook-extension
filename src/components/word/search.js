import { Box, Icon, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchSvg from '../../assets/Search.svg'

const Search = () => {
  return (
    <Box sx={{
      display: 'grid',
      marginLeft: '20px',
      marginRight: '20px'
    }}>
        <TextField
        placeholder='Search words in history'
        inputProp={{
          style: {
            height: '48px'
          }
        }}
        InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                <Icon
                sx={{
                  marginRight: '10px'
                }}>
                    <img src={SearchSvg}/>
                </Icon>
              </InputAdornment>
          )
        }}
        sx={{
          boxSizing: 'border-box',
          backgroundColor: 'rgb(112, 0, 255, 0.08)',
          border: '1px solid rgba(112, 0, 255, 0.2)',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              backgroundColor: 'rgb(112, 0, 255, 0.08)',
              border: '1px solid rgba(112, 0, 255, 0.2)'
            }
          }
        }}>

        </TextField>
    </Box>
  )
}

export default Search
