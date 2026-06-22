function BreakdownRow({ label, value, maxValue, color, formatValue }) {
  const width = maxValue > 0 ? Math.max((Math.abs(value) / maxValue) * 100, value === 0 ? 0 : 4) : 0

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-white/64">{label}</span>
        <span className="font-extrabold text-white">{formatValue(value)}</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function InvestmentBreakdownChart({ items, formatValue }) {
  const maxValue = Math.max(...items.map((item) => Math.abs(item.value)), 1)

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Investment Breakdown</h3>
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#86E4C2]">Monthly view</span>
      </div>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <BreakdownRow key={item.label} maxValue={maxValue} formatValue={formatValue} {...item} />
        ))}
      </div>
    </div>
  )
}
