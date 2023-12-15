import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CharacterProvider } from './context/AllCharacterContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CharacterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CharacterProvider>
  </React.StrictMode>,
)
