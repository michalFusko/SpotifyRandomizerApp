import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Api } from './api/api.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider api={Api}>
    <App />
    </ApiProvider>
  </StrictMode>,
)
