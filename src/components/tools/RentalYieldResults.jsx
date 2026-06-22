import { ArrowRight, TrendingUp } from 'lucide-react'
import { getRentalYieldGuidance } from '../../lib/tools/rentalYieldCalculator'
import InvestmentBreakdownChart from './InvestmentBreakdownChart'

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

export default function RentalYieldResults({
  result,
  purchasePrice,
  monthlyRentalIncome,
  monthlyExpenses,
  vacancyAllowance,
  deposit,
  formatCurrency,
}) {
  const cashFlowPositive = result.monthlyCashFlow >= 0
  const guidance = getRentalYieldGuidance(result)
  const breakdownItems = [
    { label: 'Rental Income', value: monthlyRentalIncome, color: '#86E4C2' },
    { label: 'Vacancy Loss', value: -(result.vacancyLoss / 12), color: '#D9C8A9' },
    { label: 'Expenses', value: -monthlyExpenses, color: '#9DB7AD' },
    { label: 'Bond Repayment', value: -result.monthlyBondRepayment, color: '#E2B8A0' },
    { label: 'Cash Flow', value: result.monthlyCashFlow, color: cashFlowPositive ? '#86E4C2' : '#D9C8A9' },
  ]

  return (
    <div className="bg-[#071E1A] p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Estimated Return</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Net Rental Yield</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#86E4C2]">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-[2.8rem] font-extrabold leading-none tracking-[-0.045em] text-[#86E4C2] md:text-[3.5rem]">
          {formatPercentage(result.netYield)}
        </p>
        <p className="mt-2 text-sm font-bold text-white/60">Based on rent, expenses and vacancy allowance.</p>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/10 bg-black/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white/64">Monthly Cash Flow</p>
            <p className={`mt-2 text-2xl font-extrabold tracking-[-0.04em] ${cashFlowPositive ? 'text-[#86E4C2]' : 'text-[#D9C8A9]'}`}>
              {formatCurrency(result.monthlyCashFlow)}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${cashFlowPositive ? 'bg-[#86E4C2] text-[#071E1A]' : 'bg-[#D9C8A9] text-[#071E1A]'}`}>
            {cashFlowPositive ? 'Positive cash flow' : 'Negative monthly cash flow'}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-black/10 px-5 py-2">
        <SummaryRow label="Purchase Price" value={formatCurrency(purchasePrice)} />
        <SummaryRow label="Monthly Rental Income" value={formatCurrency(monthlyRentalIncome)} />
        <SummaryRow label="Gross Annual Rental" value={formatCurrency(result.grossAnnualRental)} />
        <SummaryRow label={`Vacancy Allowance (${vacancyAllowance}%)`} value={formatCurrency(result.vacancyLoss)} />
        <SummaryRow label="Annual Expenses" value={formatCurrency(result.annualExpenses)} />
        <SummaryRow label="Net Annual Income" value={formatCurrency(result.netAnnualIncome)} />
        <SummaryRow label="Gross Yield" value={formatPercentage(result.grossYield)} />
        <SummaryRow label="Net Yield" value={formatPercentage(result.netYield)} />
        {result.isBondFinanced ? (
          <>
            <SummaryRow label="Deposit" value={formatCurrency(deposit)} />
            <SummaryRow label="Loan Amount" value={formatCurrency(result.loanAmount)} />
            <SummaryRow label="Monthly Bond Repayment" value={formatCurrency(result.monthlyBondRepayment)} />
          </>
        ) : null}
        <SummaryRow label="Monthly Cash Flow" value={formatCurrency(result.monthlyCashFlow)} />
      </div>

      <div className="mt-7">
        <InvestmentBreakdownChart items={breakdownItems} formatValue={formatCurrency} />
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
          Find Investment Properties
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/tools/buyers/bond-repayment-calculator"
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[#86E4C2]/60"
        >
          Calculate Bond Repayment
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
