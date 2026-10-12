import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SceneGallery } from './components/SceneGallery'
import './global.css'

const params = new URLSearchParams(window.location.search)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {params.has('scenes') ? <SceneGallery /> : <App />}
  </StrictMode>,
)
