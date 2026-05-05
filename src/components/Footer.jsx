export default function Footer() {
  return (
    <footer className="border-t border-[#e6dccf] bg-[rgba(255,250,244,0.72)]">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] lg:px-8">
        <div>
          <p className="text-[1rem] font-semibold tracking-[0.24em] text-[#171412]">BRIDGE 9</p>
          <p className="mt-4 max-w-[28rem] text-sm leading-7 text-[#6f6457]">
            Bridge 9 is a shared property transaction workspace built for developers, agents, conveyancers, bond originators, managing agents, and buyers.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#171412]">Platform</p>
          <div className="mt-4 space-y-3 text-sm text-[#6f6457]">
            <a href="/#platform" className="block transition hover:text-[#171412]">Platform overview</a>
            <a href="/#modules" className="block transition hover:text-[#171412]">Modules</a>
            <a href="/#reporting" className="block transition hover:text-[#171412]">Reporting</a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#171412]">Who it’s for</p>
          <div className="mt-4 space-y-3 text-sm text-[#6f6457]">
            <a href="/#who-its-for" className="block transition hover:text-[#171412]">Developers</a>
            <a href="/#who-its-for" className="block transition hover:text-[#171412]">Agents</a>
            <a href="/#who-its-for" className="block transition hover:text-[#171412]">Conveyancers</a>
            <a href="/#who-its-for" className="block transition hover:text-[#171412]">Bond originators</a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#171412]">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-[#6f6457]">
            <a href="/contact" className="block transition hover:text-[#171412]">Book a demo</a>
            <a href={`${import.meta.env.VITE_BRIDGE_APP_URL || 'https://bridge-nine-blond.vercel.app'}/auth`} className="block transition hover:text-[#171412]">Login</a>
            <a href="/#workflow" className="block transition hover:text-[#171412]">Workflow</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
