import { TrendingUp } from 'lucide-react'

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-white/64">{label}</span>
      <span className="text-right text-sm font-extrabold text-white">{value}</span>
    </div>
  )
}

export default function ResultSummary({
  monthlyRepayment,
  loanAmount,
  interestRate,
  termYears,
  totalInterest,
  totalPayable,
  schedule,
  formatCurrency,
}) {
  const chartMax = Math.max(...schedule.map((item) => item.totalPaid), 1)

  return (
    <div className="bg-[#071E1A] p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Your Results</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Estimated Monthly Repayment</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#86E4C2]">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-[2.6rem] font-extrabold leading-none tracking-[-0.045em] text-[#86E4C2] md:text-[3.4rem]">
          {formatCurrency(monthlyRepayment)}
        </p>
        <p className="mt-2 text-sm font-bold text-white/60">per month</p>
      </div>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-black/10 px-5 py-2">
        <SummaryRow label="Loan Amount" value={formatCurrency(loanAmount)} />
        <SummaryRow label="Interest Rate" value={`${interestRate.toFixed(2)}%`} />
        <SummaryRow label="Loan Term" value={`${termYears} years`} />
        <SummaryRow label="Total Interest" value={formatCurrency(totalInterest)} />
        <SummaryRow label="Total Payable" value={formatCurrency(totalPayable)} />
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-base font-extrabold tracking-[-0.02em]">Repayment Over Time</h3>
          <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/52">
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#86E4C2]" />Principal</span>
            <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#D9C8A9]" />Interest</span>
          </div>
        </div>
        <div className="mt-5 flex h-[150px] items-end gap-2 rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
          {schedule.map((item) => {
            const principalHeight = `${Math.max((item.principalPaid / chartMax) * 100, 4)}%`
            const interestHeight = `${Math.max((item.interestPaid / chartMax) * 100, 4)}%`
            return (
              <div key={item.year} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-1">
                <div className="flex min-h-0 flex-1 items-end gap-1">
                  <span className="block flex-1 rounded-t-full bg-[#86E4C2]" style={{ height: principalHeight }} />
                  <span className="block flex-1 rounded-t-full bg-[#D9C8A9]" style={{ height: interestHeight }} />
                </div>
                <span className="truncate text-center text-[10px] font-bold text-white/46">Y{item.year}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
