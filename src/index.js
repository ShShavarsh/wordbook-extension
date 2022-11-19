import React from 'react'
import ReactDOM from 'react-dom/client'
import Intro from './components/intro'

console.log('index page rendered')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Intro />
)
