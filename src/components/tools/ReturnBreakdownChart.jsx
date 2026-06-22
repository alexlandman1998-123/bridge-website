export default function ReturnBreakdownChart({ capitalGrowth, totalCashFlow, formatCurrency }) {
  const rentalCashFlow = Math.max(totalCashFlow, 0)
  const cashShortfall = Math.max(-totalCashFlow, 0)
  const total = Math.max(Math.abs(capitalGrowth) + rentalCashFlow + cashShortfall, 1)
  const segments = [
    { label: 'Capital Growth', value: Math.max(capitalGrowth, 0), color: '#86E4C2' },
    { label: 'Rental Cash Flow', value: rentalCashFlow, color: '#D9C8A9' },
    { label: 'Costs / Shortfall', value: cashShortfall, color: '#9DB7AD' },
  ]

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Return Breakdown</h3>
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#86E4C2]">Holding period</span>
      </div>
      <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-white/10">
        {segments.map((segment) => (
          <span
            key={segment.label}
            className="block h-full"
            style={{
              width: `${Math.max((segment.value / total) * 100, segment.value > 0 ? 3 : 0)}%`,
              backgroundColor: segment.color,
            }}
          />
        ))}
      </div>
      <div className="mt-5 grid gap-3">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-4 text-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-white/64">
              <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
              {segment.label}
            </span>
            <span className="font-extrabold text-white">{formatCurrency(segment.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
