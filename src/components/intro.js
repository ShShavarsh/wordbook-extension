import React from 'react'
import { Box, Button, Container, Icon, Link, Typography } from '@mui/material'
import WordbookLogo from '../assets/wordbook-logo.svg'
import LogInSvg from '../assets/log-in.svg'

const Intro = () => {
  return (
    <Container>
      <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'inherit'
      }}>
          <Link
          target='_blank'
          href='https://wordbook.pro'
          sx={{
            display: 'contents'
          }}>
            <Icon
              sx={{
                width: '51px',
                height: '32px'
              }}>
                <img src={WordbookLogo}/>
            </Icon>
            <Typography
            sx={{
              fontFamily: 'Poppins',
              marginLeft: '10px',
              fontSize: '22px',
              textDecoration: 'none',
              boxShadow: 'none',
              color: 'black',
              cursor: 'pointer',
              width: '187px'
            }}>
              wordbook.pro
            </Typography>
          </Link>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7000FF',
              borderRadius: '8px',
              marginLeft: '130px',
              ':hover': {
                backgroundColor: '#7000FF'
              }
            }}>
          <Icon
              sx={{
                width: '51px',
                height: '32px'
              }}>
                <img src={LogInSvg}/>
            </Icon>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              boxShadow: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}>
              Sign In
            </Typography>
          </Button>
      </Box>
    </Container>
  )
}

export default Intro
