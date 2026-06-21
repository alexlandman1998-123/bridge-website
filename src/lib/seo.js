export function setPageSeo({ title, description, canonicalPath, indexable = true, jsonLd = [] }) {
  document.title = title

  const origin = window.location.origin
  const canonicalUrl = canonicalPath?.startsWith('http') ? canonicalPath : `${origin}${canonicalPath || window.location.pathname}`

  setMeta('description', description)
  setMeta('robots', indexable ? 'index,follow' : 'noindex,follow')
  setMeta('og:title', title, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:url', canonicalUrl, 'property')

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)

  document.querySelectorAll('script[data-arch9-jsonld]').forEach((node) => node.remove())
  jsonLd.filter(Boolean).forEach((schema) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-arch9-jsonld', 'true')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })
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

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.href}`,
    })),
  }
}

export function itemListJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${window.location.origin}${item.href}`,
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
