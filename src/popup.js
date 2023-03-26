import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/main'
import { AuthProvider } from './context/auth-provider'
import './popup.css'

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)

const Popup = (
    <BrowserRouter>
        <AuthProvider>
            <Main />
        </AuthProvider>
    </BrowserRouter>
)

root.render(Popup)
