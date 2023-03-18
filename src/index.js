import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/main'
import { AuthProvider } from './context/auth-provider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthProvider>
            <Main />
        </AuthProvider>
    </BrowserRouter>
)
