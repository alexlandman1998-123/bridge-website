export const SITE_URL = 'https://arch9.co.za'
export const SITE_NAME = 'Arch9'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/icons/pwa-icon-512.png`
export const DEFAULT_OG_IMAGE_ALT = 'Arch9'
export const DEFAULT_OG_IMAGE_WIDTH = '512'
export const DEFAULT_OG_IMAGE_HEIGHT = '512'

export function setPageSeo({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  indexable = true,
  robots,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  siteName = SITE_NAME,
  twitterCard = 'summary_large_image',
  jsonLd = [],
} = {}) {
  const safeTitle = title || document.title || SITE_NAME
  const safeDescription = description || ''
  const resolvedCanonicalUrl = canonicalUrl || toAbsoluteUrl(canonicalPath || window.location.pathname)
  const resolvedImage = image ? toAbsoluteUrl(image) : DEFAULT_OG_IMAGE
  const robotsContent = robots || (indexable ? 'index,follow' : 'noindex,follow')

  document.title = safeTitle

  setMeta('description', safeDescription)
  setMeta('robots', robotsContent)

  setMeta('og:type', type, 'property')
  setMeta('og:locale', 'en_ZA', 'property')
  setMeta('og:site_name', siteName, 'property')
  setMeta('og:title', safeTitle, 'property')
  setMeta('og:description', safeDescription, 'property')
  setMeta('og:url', resolvedCanonicalUrl, 'property')
  setMeta('og:image', resolvedImage, 'property')
  setMeta('og:image:alt', imageAlt, 'property')
  setMeta('og:image:width', imageWidth, 'property')
  setMeta('og:image:height', imageHeight, 'property')

  setMeta('twitter:card', twitterCard)
  setMeta('twitter:title', safeTitle)
  setMeta('twitter:description', safeDescription)
  setMeta('twitter:image', resolvedImage)
  setMeta('twitter:image:alt', imageAlt)

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', resolvedCanonicalUrl)

  document.querySelectorAll('script[data-arch9-jsonld]').forEach((node) => node.remove())
  jsonLd.filter(Boolean).forEach((schema) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-arch9-jsonld', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })

  return {
    title: safeTitle,
    description: safeDescription,
    canonicalUrl: resolvedCanonicalUrl,
    robots: robotsContent,
    image: resolvedImage,
  }
}

function setMeta(name, content, attr = 'name') {
  let meta = document.querySelector(`meta[${attr}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content || '')
}

export function toAbsoluteUrl(pathOrUrl = '/') {
  if (!pathOrUrl) return SITE_URL
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${normalizedPath}`
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.href),
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': toAbsoluteUrl('/#organization'),
    name: SITE_NAME,
    url: toAbsoluteUrl('/'),
    logo: DEFAULT_OG_IMAGE,
    description:
      'Arch9 is a shared property transaction workspace for agents, attorneys, bond originators, developers, buyers and sellers.',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': toAbsoluteUrl('/#website'),
    name: SITE_NAME,
    url: toAbsoluteUrl('/'),
    publisher: {
      '@id': toAbsoluteUrl('/#organization'),
    },
    inLanguage: 'en-ZA',
  }
}

export function webPageJsonLd({ name, description, path = '/', type = 'WebPage' } = {}) {
  const url = toAbsoluteUrl(path)
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      '@id': toAbsoluteUrl('/#website'),
    },
    publisher: {
      '@id': toAbsoluteUrl('/#organization'),
    },
    inLanguage: 'en-ZA',
  }
}

export function softwareApplicationJsonLd({
  name = SITE_NAME,
  description,
  path = '/',
  applicationCategory = 'BusinessApplication',
  audience = [],
  featureList = [],
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem: 'Web',
    url: toAbsoluteUrl(path),
    description,
    publisher: {
      '@id': toAbsoluteUrl('/#organization'),
    },
  }

  if (audience.length) {
    schema.audience = audience.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    }))
  }

  if (featureList.length) {
    schema.featureList = featureList
  }

  return schema
}

export function serviceJsonLd({ name, description, path, serviceType, audience = [] } = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: toAbsoluteUrl(path),
    provider: {
      '@id': toAbsoluteUrl('/#organization'),
    },
  }

  if (serviceType) schema.serviceType = serviceType

  if (audience.length) {
    schema.audience = audience.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    }))
  }

  return schema
}

export function itemListJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: toAbsoluteUrl(item.href),
      name: item.name,
    })),
  }
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
