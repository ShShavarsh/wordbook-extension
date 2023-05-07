import { Box, Button, Icon, Typography } from '@mui/material'
import React from 'react'
import SummaryIcon from '../../assets/summary.svg'
import ChevronUp from '../../assets/chevron-up.svg'

const SummaryForm = ({ show }) => {
  const Expand = () => {
    show()
  }

  return (
    <Box sx={{
      display: 'table',
      marginLeft: '20px',
      marginRight: '17px',
      marginTop: '5px',
      height: '48px',
      width: '-webkit-fill-available'
    }}>
        <Box
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
            <Icon
            sx={{
              display: 'grid',
              alignSelf: 'flex-end',
              marginLeft: '15px',
              marginRight: '10px'
            }}>
                <img src={SummaryIcon}/>
            </Icon>
            <Typography
            sx={{
              fontWeight: '550',
              marginRight: 'auto',
              alignSelf: 'center',
              fontSize: '13px',
              maxWidth: '225px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
                Summary of the video
            </Typography>
            <Button
                disableRipple
                onClick={Expand}
                sx={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  minWidth: '24px',
                  '&:hover': {
                    background: 'none'
                  }
                }}
                >
                    <Icon
                    sx={{
                      display: 'contents'
                    }}>
                        <img src={ChevronUp}/>
                    </Icon>
            </Button>
        </Box>
    </Box>
  )
}

export default SummaryForm
