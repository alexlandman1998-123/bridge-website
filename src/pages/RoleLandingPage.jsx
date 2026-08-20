import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ConnectedJourney from '../components/role/ConnectedJourney'
import RoleCTA from '../components/role/RoleCTA'
import RoleFeatureGrid from '../components/role/RoleFeatureGrid'
import RoleHero from '../components/role/RoleHero'
import RoleSelector from '../components/role/RoleSelector'
import RoleWorkflow from '../components/role/RoleWorkflow'
import { rolePages } from '../config/rolePages'
import { breadcrumbJsonLd, serviceJsonLd, setPageSeo, softwareApplicationJsonLd } from '../lib/seo'

export default function RoleLandingPage({ role }) {
  const page = rolePages[role] || rolePages.developers
  const canonicalPath = `/solutions/${page.key}`

  useEffect(() => {
    setPageSeo({
      title: page.seoTitle,
      description: page.seoDescription,
      canonicalPath,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Solutions', href: '/platform' },
          { name: page.eyebrow, href: canonicalPath },
        ]),
        serviceJsonLd({
          name: page.seoTitle.replace(' | Arch9', ''),
          description: page.seoDescription,
          path: canonicalPath,
          serviceType: 'Property transaction infrastructure',
          audience: [page.eyebrow],
        }),
        softwareApplicationJsonLd({
          name: page.seoTitle.replace(' | Arch9', ''),
          description: page.seoDescription,
          path: canonicalPath,
          audience: [page.eyebrow],
          featureList: page.features.map((feature) => feature.title),
        }),
      ],
    })
  }, [canonicalPath, page])

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#071E1A]">
      <Header />
      <main>
        <RoleHero page={page} />
        <RoleFeatureGrid page={page} />
        <RoleWorkflow page={page} />
        <ConnectedJourney page={page} />
        <section className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
            <blockquote className="rounded-[22px] border border-[#0A3028]/8 bg-white p-7 shadow-[0_24px_80px_rgba(7,30,26,0.055)] md:p-9">
              <p className="text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[#071E1A]">"{page.socialProof.quote}"</p>
              <footer className="mt-6 text-sm font-extrabold text-[#0E6A55]">{page.socialProof.attribution}</footer>
            </blockquote>
            <RoleSelector compact />
          </div>
        </section>
        <RoleCTA page={page} />
      </main>
      <Footer />
    </div>
  )
}
