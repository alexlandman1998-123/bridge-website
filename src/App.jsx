import { useEffect, useState } from 'react'
import Contact from './pages/Contact'
import PlatformOverview from './pages/Home'
import Pricing from './pages/Pricing'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import MarketingHome from './pages/MarketingHome'

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

  if (pathname === '/platform/overview' || pathname.startsWith('/platform/overview/')) {
    return <PlatformOverview />
  }

  if (pathname === '/properties') {
    return <Properties />
  }

  if (pathname.startsWith('/property/')) {
    const slug = pathname.replace('/property/', '').replace(/\/$/, '')
    return <PropertyDetail slug={slug} />
  }

  return <MarketingHome />
}
