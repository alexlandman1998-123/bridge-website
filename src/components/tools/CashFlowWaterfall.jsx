function StepRow({ label, value, maxValue, color, formatCurrency }) {
  const width = maxValue > 0 ? Math.max((Math.abs(value) / maxValue) * 100, value === 0 ? 0 : 4) : 0

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-white/64">{label}</span>
        <span className="font-extrabold text-white">{formatCurrency(value)}</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function CashFlowWaterfall({ result, monthlyRentalIncome, formatCurrency }) {
  const items = [
    { label: 'Rental Income', value: monthlyRentalIncome, color: '#86E4C2' },
    { label: 'Vacancy', value: -result.vacancyLoss, color: '#D9C8A9' },
    { label: 'Expenses', value: -result.totalMonthlyExpenses, color: '#9DB7AD' },
    { label: 'Bond', value: -result.monthlyBondRepayment, color: '#E2B8A0' },
    { label: 'Cash Flow', value: result.monthlyCashFlow, color: result.monthlyCashFlow >= 0 ? '#86E4C2' : '#D9C8A9' },
  ]
  const maxValue = Math.max(...items.map((item) => Math.abs(item.value)), 1)

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Cash Flow Waterfall</h3>
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#86E4C2]">Monthly</span>
      </div>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <StepRow key={item.label} maxValue={maxValue} formatCurrency={formatCurrency} {...item} />
        ))}
      </div>
    </div>
  )
}
