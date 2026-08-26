import { roleRoutes } from './rolePages'

export const footerLinkGroups = [
  {
    title: 'Properties',
    links: [
      { label: 'Browse Properties', href: '/' },
      { label: 'Commercial Property', href: '/commercial' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Agency', href: roleRoutes.agency },
      { label: 'For Attorney', href: roleRoutes.attorney },
      { label: 'For Bond Originator', href: roleRoutes['bond-originator'] },
      { label: 'For Developer', href: roleRoutes.developer },
      { label: 'For Buyer / Seller', href: roleRoutes['buyer-seller'] },
      { label: 'Platform Overview', href: '/solutions/platform' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Arch9', href: '/about' },
      { label: 'Book A Demo', href: '/book-demo' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Centre', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
]

export const footerSocialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
]

export const footerLegalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
]
