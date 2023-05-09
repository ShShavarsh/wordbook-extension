import { Box, Button, Icon, Skeleton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import SummaryIcon from '../../assets/summary.svg'
import ChevronDown from '../../assets/chevron-down.svg'
import CopyIcon from '../../assets/copy.svg'

const SummaryFormExpanded = ({ collapse, summary, loading }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const Expand = () => {
    collapse()
  }

  const Copy = () => {
    navigator.clipboard.writeText(summary)
    setShowTooltip(true)
    setTimeout(function () { setShowTooltip(false) }, 2000)
  }

  return (
    <Box sx={{
      boxSizing: 'border-box',
      borderRadius: '8px',
      maxWidth: 'inherit',
      border: '4px solid rgba(112, 0, 255, 0.08)',
      display: 'table',
      marginLeft: '20px',
      marginRight: '17px',
      marginTop: '5px',
      height: '48px',
      width: '-webkit-fill-available',
      '&:hover': {
        border: '4px solid rgba(112, 0, 255, 0.12)'
      }
    }}>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
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
            <Tooltip
                placement="bottom-start"
                title={showTooltip ? 'Copied to clipboard!' : ''}
            >
                <Button
                    disableRipple
                    onClick={Copy}
                    sx={{
                      cursor: 'pointer',
                      marginRight: '5px',
                      minWidth: '24px',
                      '&:hover': {
                        background: 'none'
                      },
                      '&:click': {
                        animation: 'blinker 1s linear infinite'
                      }
                    }}
                    >
                        <Icon
                        sx={{
                          marginRight: '5px',
                          display: 'contents'
                        }}>
                            <img src={CopyIcon}/>
                        </Icon>
                </Button>
            </Tooltip>
            <Button
                disableRipple
                onClick={Expand}
                sx={{
                  cursor: 'pointer',
                  marginRight: '17px',
                  minWidth: '24px',
                  padding: '6px 0 0 0',
                  '&:hover': {
                    background: 'none'
                  }
                }}
                >
                    <Icon
                    sx={{
                      marginRight: '5px',
                      display: 'contents'
                    }}>
                        <img src={ChevronDown}/>
                    </Icon>
            </Button>
        </Box>
        <Box
        sx={{
          padding: '7px',
          marginLeft: '14px'
        }}>
            {
                loading
                  ? <>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  <Skeleton variant='text' animation='pulse' height='13px'/>
                  </>
                  : <Typography
            sx={{
              fontWeight: '400',
              marginRight: '5px',
              fontSize: '13px',
              lineHeight: '24px',
              color: 'rgba(14, 0, 33, 0.68)',
              overflowY: 'scroll',
              mixBlendMode: 'normal',
              paddingRight: '5px',
              maxHeight: '200px',
              '&::-webkit-scrollbar': {
                width: '7px !important',
                height: '5px',
                background: 'rgba(112, 0, 255, 0.04)',
                border: '1px solid rgba(112, 0, 255, 0.12)',
                borderRadius: '32px'
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '32px',
                backgroundColor: 'rgba(112, 0, 255, 0.12)',
                cursor: 'pointer'
              }
            }}>
                {summary}
            </Typography>
            }
        </Box>
    </Box>
  )
}

export default SummaryFormExpanded
