import { ArrowRight, WalletCards } from 'lucide-react'
import { getCashFlowGuidance } from '../../lib/tools/cashFlowCalculator'
import CashFlowWaterfall from './CashFlowWaterfall'

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-white/64">{label}</span>
      <span className="text-right text-sm font-extrabold text-white">{value}</span>
    </div>
  )
}

function formatPercentage(value) {
  return `${Number(value || 0).toFixed(1)}%`
}

export default function CashFlowResults({
  result,
  monthlyRentalIncome,
  vacancyAllowance,
  formatCurrency,
}) {
  const cashFlowPositive = result.monthlyCashFlow >= 0
  const guidance = getCashFlowGuidance(result)

  return (
    <div className="bg-[#071E1A] p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Cash Flow Result</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Monthly Cash Flow</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#86E4C2]">
          <WalletCards className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
        <p className={`text-[2.45rem] font-extrabold leading-none tracking-[-0.045em] md:text-[3.15rem] ${cashFlowPositive ? 'text-[#86E4C2]' : 'text-[#D9C8A9]'}`}>
          {formatCurrency(result.monthlyCashFlow)}
        </p>
        <p className="mt-2 text-sm font-bold text-white/60">
          {cashFlowPositive ? 'Positive Cash Flow' : 'Monthly Top-Up Required'}
        </p>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/10 bg-black/10 px-5 py-2">
        <SummaryRow label="Monthly Rental Income" value={formatCurrency(monthlyRentalIncome)} />
        <SummaryRow label={`Vacancy Allowance (${vacancyAllowance}%)`} value={formatCurrency(-result.vacancyLoss)} />
        <SummaryRow label="Effective Rental Income" value={formatCurrency(result.effectiveMonthlyRental)} />
        <SummaryRow label="Total Monthly Expenses" value={formatCurrency(-result.totalMonthlyExpenses)} />
        <SummaryRow label="Monthly Bond Repayment" value={formatCurrency(-result.monthlyBondRepayment)} />
        <SummaryRow label="Monthly Cash Flow" value={formatCurrency(result.monthlyCashFlow)} />
        <SummaryRow label="Annual Cash Flow" value={formatCurrency(result.annualCashFlow)} />
        <SummaryRow label="Cash Flow Margin" value={formatPercentage(result.cashFlowMargin)} />
      </div>

      <div className="mt-7">
        <CashFlowWaterfall
          result={result}
          monthlyRentalIncome={monthlyRentalIncome}
          formatCurrency={formatCurrency}
        />
      </div>

      <div className="mt-7 rounded-[18px] border border-white/10 bg-white/[0.06] p-5">
        <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Smart Guidance</h3>
        <p className="mt-2 text-sm font-medium leading-6 text-white/68">{guidance}</p>
      </div>

      <div className="mt-7 grid gap-3">
        <a
          href="/for-sale?investment=true"
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#86E4C2] px-6 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5"
        >
          Find Cash Flow Properties
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/tools/investors/rental-yield-calculator"
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[#86E4C2]/60"
        >
          Calculate Rental Yield
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
