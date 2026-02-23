import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { HeaderProvider } from "./context/HeaderContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </BrowserRouter>
  </StrictMode>,
)
