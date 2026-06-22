export default function AffordabilityMeter({ low, high, value, formatCurrency }) {
  const markerPosition = high > 0 ? Math.min(Math.max((value / high) * 100, 0), 100) : 0

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Affordable Budget</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#86E4C2]">Low to high</p>
        </div>
        <span className="rounded-full bg-[#86E4C2]/14 px-3 py-1.5 text-xs font-extrabold text-[#86E4C2]">Comfortable</span>
      </div>
      <div className="relative mt-7 h-3 rounded-full bg-white/10">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#86E4C2] to-[#D9C8A9]" style={{ width: `${markerPosition}%` }} />
        <span
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-[#071E1A] bg-[#86E4C2] shadow-[0_0_0_1px_rgba(255,255,255,0.18)]"
          style={{ left: `${markerPosition}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-xs font-extrabold text-white/60">
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
    </div>
  )
}
