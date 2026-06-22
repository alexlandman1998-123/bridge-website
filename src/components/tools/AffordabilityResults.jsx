import { ArrowRight, Home } from 'lucide-react'
import AffordabilityMeter from './AffordabilityMeter'

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-white/64">{label}</span>
      <span className="text-right text-sm font-extrabold text-white">{value}</span>
    </div>
  )
}

export default function AffordabilityResults({
  result,
  grossMonthlyIncome,
  monthlyDebt,
  monthlyExpenses,
  deposit,
  formatCurrency,
}) {
  const maxPrice = Math.max(Math.round(result.estimatedPropertyPrice), 0)
  const propertiesHref = `/for-sale?maxPrice=${maxPrice}`

  return (
    <div className="bg-[#071E1A] p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">What You Can Afford</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Estimated Property Budget</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#86E4C2]">
          <Home className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-[2.35rem] font-extrabold leading-none tracking-[-0.045em] text-[#86E4C2] md:text-[3.15rem]">
          {formatCurrency(result.estimatedPropertyPrice)}
        </p>
        <p className="mt-2 text-sm font-bold text-white/60">Based on your income and expenses.</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#86E4C2] px-3 py-1.5 text-xs font-extrabold text-[#071E1A]">Comfortable</span>
        <span className="text-sm font-extrabold text-white">
          {formatCurrency(result.comfortableLow)} - {formatCurrency(result.comfortableHigh)}
        </span>
        <span className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-extrabold text-white/72">
          {result.confidenceLabel}
        </span>
      </div>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-black/10 px-5 py-2">
        <SummaryRow label="Monthly Income" value={formatCurrency(grossMonthlyIncome)} />
        <SummaryRow label="Monthly Debt" value={formatCurrency(monthlyDebt)} />
        <SummaryRow label="Monthly Expenses" value={formatCurrency(monthlyExpenses)} />
        <SummaryRow label="Affordable Repayment" value={formatCurrency(result.affordableMonthlyRepayment)} />
        <SummaryRow label="Estimated Bond" value={formatCurrency(result.estimatedBond)} />
        <SummaryRow label="Available Deposit" value={formatCurrency(deposit)} />
      </div>

      <div className="mt-7">
        <AffordabilityMeter
          low={result.comfortableLow}
          high={result.comfortableHigh}
          value={result.estimatedPropertyPrice}
          formatCurrency={formatCurrency}
        />
      </div>

      <div className="mt-7 rounded-[18px] border border-white/10 bg-white/[0.06] p-5">
        <h3 className="text-lg font-extrabold tracking-[-0.03em]">Ready to start searching?</h3>
        <a
          href={propertiesHref}
          className="mt-4 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#86E4C2] px-6 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5"
        >
          View Properties In My Budget
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
