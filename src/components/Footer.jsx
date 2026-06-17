const footerLinks = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Roles', href: '/#roles' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#e6dccf] bg-[rgba(255,250,244,0.82)]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-[1fr_auto] xl:px-16">
        <div>
          <p className="text-[1rem] font-bold tracking-[0.24em] text-[#171412]">ARCH9</p>
          <p className="mt-5 max-w-[34rem] text-base leading-7 text-[#6f6457]">
            Arch9 is the shared property transaction workspace for agents, attorneys, bond originators, developers, clients, buyers, and sellers.
          </p>
        </div>

        <nav className="grid gap-4 text-base font-semibold text-[#5f554b] sm:grid-cols-2 lg:flex lg:items-start lg:gap-8" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <a key={item.label} href={item.href} className="min-h-11">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
