import { useEffect } from 'react'
import { ArrowRight, Home, SearchX } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { setPageSeo } from '../lib/seo'

export default function NotFound() {
  useEffect(() => {
    setPageSeo({
      title: 'Page not found | Arch9',
      description: 'This Arch9 page is not available.',
      canonicalPath: '/',
      indexable: false,
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#05120F]">
      <Header />
      <main className="mx-auto flex min-h-[72vh] w-full max-w-[920px] flex-col items-center justify-center px-6 pb-16 pt-[132px] text-center md:px-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#E6F3ED] text-[#064537]">
          <SearchX className="h-7 w-7" />
        </div>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Page unavailable</p>
        <h1 className="mt-5 text-[3rem] font-extrabold leading-[0.96] tracking-[-0.055em] text-[#071E1A] md:text-[4.8rem]">
          This page is not available.
        </h1>
        <p className="mt-5 max-w-[620px] text-lg font-medium leading-8 text-[#51615B]">
          The page may have moved, been retired, or is no longer part of the active Arch9 website.
        </p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a href="/" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(6,69,55,0.22)] transition hover:-translate-y-0.5">
            <Home className="h-4 w-4" />
            Go home
          </a>
          <a href="/book-demo" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-[#0A3028]/18 bg-white px-7 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5 hover:border-[#064537]/30">
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
