import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/main'
import { AuthProvider } from './context/auth-provider'

const index = () => {
  return (
    <BrowserRouter>
        <AuthProvider>
            <Main />
        </AuthProvider>
    </BrowserRouter>
  )
}

export default index
