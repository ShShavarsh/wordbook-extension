import React, { useMemo, useState } from 'react'
import { AuthContext } from './auth-context'

const API_URL = 'https://wordbook.pro'

export function AuthProvider (props) {
  const { children } = props

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ping = async (token) => {
    const accessToken = token !== undefined ? token : localStorage.getItem('token')
    const url = `${API_URL}/api/v1/authorization/ping`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.status >= 200 && response.status < 210) {
      return {
        status: 'ok'
      }
    } else if (response.status === 401) {
      setIsAuthenticated(false)
      return {
        status: 'unauthorized'
      }
    }
  }

  const signInGoogle = async (token, userName) => {
    setIsAuthenticated(true)
    localStorage.setItem('token', token)
    localStorage.setItem('username', userName)
  }

  const logout = () => {
    setIsAuthenticated(false)

    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  const contextState = useMemo(() => ({
    isAuthenticated,
    ping,
    signInGoogle,
    logout
  }), [ping, signInGoogle])

  return (
        <AuthContext.Provider value={contextState}>
            {children}
        </AuthContext.Provider>
  )
}
