import { useContext } from 'react'
import { AuthContext } from './auth-context'

export const useAuthentication = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('AuthenticationProvider context is undefined, please verify you are calling useAuthentication() as child of a <AuthenticationProvider> component.')
  }

  return context
}
