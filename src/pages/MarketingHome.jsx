import { useEffect } from 'react'
import RoleSelector from '../components/role/RoleSelector'
import { roleRoutes } from '../config/rolePages'
import { itemListJsonLd, setPageSeo, softwareApplicationJsonLd, webPageJsonLd, websiteJsonLd } from '../lib/seo'

export default function MarketingHome() {
  useEffect(() => {
    const description =
      'Choose your role in the property transaction to see the Arch9 view that fits your workflow.'

    setPageSeo({
      title: 'Arch9 | Choose your role',
      description,
      canonicalPath: '/',
      jsonLd: [
        websiteJsonLd(),
        webPageJsonLd({
          name: 'Arch9 | Choose your role',
          description,
          path: '/',
        }),
        softwareApplicationJsonLd({
          description,
          path: '/',
          audience: ['Estate agencies', 'Property developers', 'Conveyancing attorneys', 'Bond originators', 'Property buyers', 'Property sellers'],
          featureList: ['Role-based workspaces', 'Shared transaction timeline', 'Document and milestone tracking', 'Client transaction portals'],
        }),
        itemListJsonLd([
          { name: 'For Agency', href: roleRoutes.agency },
          { name: 'For Developer', href: roleRoutes.developer },
          { name: 'For Attorney', href: roleRoutes.attorney },
          { name: 'For Bond Originator', href: roleRoutes['bond-originator'] },
          { name: 'For Buyer / Seller', href: roleRoutes['buyer-seller'] },
        ]),
      ],
    })
  }, [])

  return (
    <main className="bg-[#FAF8F3]">
      <RoleSelector className="min-h-screen px-5 py-5 md:px-8 md:py-8" />
    </main>
  )
}
