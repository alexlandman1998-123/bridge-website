import { useEffect, useState } from 'react'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Pricing from './pages/Pricing'

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (pathname === '/contact') {
    return <Contact />
  }

  if (pathname === '/pricing') {
    return <Pricing />
  }

  return <Home />
}
