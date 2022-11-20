import React from 'react'
import { Box, Button, Container, Icon, Link, Typography } from '@mui/material'
import WordbookLogo from '../assets/wordbook-logo.svg'
import LogInSvg from '../assets/log-in.svg'

const Intro = () => {
  return (
    <Container
    sx={{
      padding: '5px',
      border: '3px',
      borderRadius: '5px',
      borderColor: '#F5EDFF',
      borderStyle: 'solid'
    }}>
      <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'inherit',
        marginLeft: '20px'
      }}>
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
              fontFamily: 'Poppins',
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
            target='_blank'
            href='https://wordbook.pro/signIn'
            component={Link}
            sx={{
              backgroundColor: '#7000FF',
              borderRadius: '8px',
              width: '120px',
              height: '38px',
              marginLeft: '130px',
              alignItems: 'center',
              ':hover': {
                backgroundColor: '#7000FF'
              }
            }}>
          <Icon
              sx={{
                marginRight: '10px',
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
