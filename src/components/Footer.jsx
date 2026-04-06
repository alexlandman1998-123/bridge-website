export default function Footer() {
  return (
    <footer className="bg-white/90 px-6 py-10 shadow-inner shadow-slate-900/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-[0.4em] text-slate-900">Bridge</p>
          <p className="mt-2">One shared platform for property transactions.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="#product" className="transition hover:text-slate-900">
            Product
          </a>
          <a href="#solutions" className="transition hover:text-slate-900">
            Solutions
          </a>
          <a href="#how-it-works" className="transition hover:text-slate-900">
            How It Works
          </a>
          <a href="#contact" className="transition hover:text-slate-900">
            Contact
          </a>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Bridge
        </p>
      </div>
    </footer>
  )
}