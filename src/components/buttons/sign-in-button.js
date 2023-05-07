import { Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import GoogleSignIn from '../../assets/google-sign-in.svg'
import { useAuthentication } from '../../context/auth/use-auth'

const SignInButton = () => {
  const { signInGoogle, ping } = useAuthentication()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('accessToken') && searchParams.has('tokenType') && searchParams.get('tokenType') === 'Bearer') {
      (async () => {
        const searchParamsObj = searchParams

        const token = searchParamsObj.get('accessToken')
        const userName = searchParamsObj.get('userName')

        const response = await ping(token)

        if (response.status === 'ok') {
          signInGoogle(token, userName)
        }
      })()
    }
  },
  [searchParams])

  return (
    <Button
    target='_blank'
    href={`https://wordbook.pro/oauth2/authorization/google?redirect_uri=${location.pathname}`}
    component={Link}
    sx={{
      height: '34px',
      marginLeft: '95px',
      alignItems: 'center',
      ':hover': {
        background: 'none'
      }
    }}>
  <Icon
    sx={{
      marginRight: '10px',
      height: '32px'
    }}>
      <img src={GoogleSignIn}/>
  </Icon>
  <Typography
    sx={{
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '20px',
      boxShadow: 'none',
      cursor: 'pointer',
      color: 'rgba(14,0,33,0.68)',
      textTransform: 'capitalize'
    }}>
      Sign In
    </Typography>
</Button>
  )
}

export default SignInButton
