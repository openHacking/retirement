import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AdBanner from './components/AdBanner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdBanner />
    <App />
    <footer style={{ textAlign: 'center', marginTop: '20px' }}>
      关注微信公众号：
      <a href="https://mp.weixin.qq.com/s/G7wu6WfpdqpcZz3OnHHR6w" target="_blank" rel="noopener noreferrer">
        技术分社
      </a>
    </footer>
  </StrictMode>,
)
