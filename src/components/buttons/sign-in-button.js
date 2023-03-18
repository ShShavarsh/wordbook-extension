import { Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import LogInSvg from '../../assets/log-in.svg'
import { useAuthentication } from '../../context/use-auth'

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
    variant="contained"
    target='_blank'
    href={`https://wordbook.pro/oauth2/authorization/google?redirect_uri=${location.pathname}`}
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
