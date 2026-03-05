import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index'
import 'flag-icons/css/flag-icons.min.css'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
