import { useEffect, useState } from 'react'
import Contact from './pages/Contact'
import PlatformOverview from './pages/Home'
import Pricing from './pages/Pricing'
import Properties from './pages/Properties'
import Developments from './pages/Developments'
import DevelopmentDetail from './pages/DevelopmentDetail'
import PropertyDetail from './pages/PropertyDetail'
import MarketingHome from './pages/MarketingHome'
import LandingPage from './pages/LandingPage'
import PropertyIntelligence from './pages/PropertyIntelligence'
import { landingPages } from './config/landingPages'
import { findDevelopmentBySlug } from './data/developments'
import { findAreaBySlug } from './data/propertyIntelligence'

export default function App() {
  const [pathname, setPathname] = useState(() => (window.location.pathname === '/buy' ? '/' : window.location.pathname))

  useEffect(() => {
    function handlePopState() {
      if (window.location.pathname === '/buy') {
        window.history.replaceState(null, '', '/')
        setPathname('/')
        return
      }

      setPathname(window.location.pathname)
    }

    if (window.location.pathname === '/buy') {
      window.history.replaceState(null, '', '/')
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

  if (pathname === '/platform') {
    return <LandingPage pageKey="platform" />
  }

  if (pathname === '/platform/overview' || pathname.startsWith('/platform/overview/')) {
    return <PlatformOverview />
  }

  if (pathname === '/properties') {
    return <Properties />
  }

  if (pathname === '/property-intelligence') {
    return <PropertyIntelligence view="home" />
  }

  if (pathname === '/admin/property-intelligence') {
    return <PropertyIntelligence view="admin" />
  }

  if (pathname === '/areas') {
    return <PropertyIntelligence view="areas" />
  }

  if (pathname.startsWith('/areas/')) {
    const areaSlug = pathname.replace('/areas/', '').replace(/\/$/, '')
    return <PropertyIntelligence view="area" areaSlug={areaSlug} />
  }

  if (pathname === '/market-reports') {
    return <PropertyIntelligence view="market-reports" />
  }

  if (pathname.startsWith('/market-reports/')) {
    const areaSlug = pathname.replace('/market-reports/', '').replace(/\/$/, '')
    return <PropertyIntelligence view="market-report" areaSlug={areaSlug} />
  }

  if (pathname === '/buyer-guides' || pathname === '/seller-guides' || pathname === '/calculators') {
    return <PropertyIntelligence view={pathname.replace('/', '')} />
  }

  if (pathname === '/bond-calculator' || pathname === '/transfer-cost-calculator' || pathname === '/affordability-calculator' || pathname === '/property-pulse') {
    return <PropertyIntelligence view={pathname.replace('/', '')} />
  }

  const programmaticRoutes = [
    { prefix: '/property-for-sale/', view: 'property-for-sale' },
    { prefix: '/houses-for-sale/', view: 'houses-for-sale' },
    { prefix: '/townhouses-for-sale/', view: 'townhouses-for-sale' },
    { prefix: '/apartments-for-sale/', view: 'apartments-for-sale' },
    { prefix: '/3-bedroom-houses-for-sale/', view: '3-bedroom-houses' },
    { prefix: '/schools-in/', view: 'schools' },
    { prefix: '/estate-agents/', view: 'estate-agents' },
  ]

  for (const route of programmaticRoutes) {
    if (pathname.startsWith(route.prefix)) {
      const areaSlug = pathname.replace(route.prefix, '').split('/')[0]
      const isUnder2m = pathname.endsWith('/under-r2-million')
      const view = isUnder2m && route.view === 'townhouses-for-sale'
        ? 'townhouses-under-2m'
        : isUnder2m && route.view === 'property-for-sale'
          ? 'property-under-2m'
          : route.view
      return <PropertyIntelligence view={view} areaSlug={areaSlug} />
    }
  }

  const landingPageKey = pathname.replace('/', '').replace(/\/$/, '')
  if (landingPages[landingPageKey]) {
    return <LandingPage pageKey={landingPageKey} />
  }

  if (pathname === '/developments') {
    return <Developments />
  }

  if (pathname.startsWith('/developments/')) {
    const slug = pathname.replace('/developments/', '').replace(/\/$/, '')
    if (!findDevelopmentBySlug(slug) && findAreaBySlug(slug)) {
      return <PropertyIntelligence view="developments-area" areaSlug={slug} />
    }
    return <DevelopmentDetail slug={slug} />
  }

  if (pathname.startsWith('/property/')) {
    const slug = pathname.replace('/property/', '').replace(/\/$/, '')
    return <PropertyDetail slug={slug} />
  }

  return <MarketingHome />
}
