import React from 'react'
import { createRoot } from 'react-dom/client'
import ContentScript from './cs'

function init () {
  const appContainer = document.createElement('div')
  document.body.appendChild(appContainer)
  if (!appContainer) {
    throw new Error('Can not find app container.')
  }

  const root = createRoot(appContainer)
  // eslint-disable-next-line react/react-in-jsx-scope
  root.render(<ContentScript />)
}

init()
