import { Button, Icon, Link, Typography } from '@mui/material'
import React from 'react'
import LogInSvg from '../../assets/log-in.svg'

const SignInButton = () => {
  return (
    <Button
    variant="contained"
    target='_blank'
    href='https://wordbook.pro/oauth2/authorization/google'
    component={Link}
    sx={{
      backgroundColor: '#7000FF',
      borderRadius: '8px',
      marginLeft: '95px',
      height: '38px',
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
  )
}

export default SignInButton
