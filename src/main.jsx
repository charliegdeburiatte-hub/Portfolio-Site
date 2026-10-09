import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply the saved Glass effects choice before first paint
try {
  if (localStorage.getItem('glass') === 'off') document.documentElement.dataset.glass = 'off'
} catch { /* storage blocked */ }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
