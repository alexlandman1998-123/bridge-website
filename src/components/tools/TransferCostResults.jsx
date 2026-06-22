import { ArrowRight, ReceiptText } from 'lucide-react'

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-white/64">{label}</span>
      <span className="text-right text-sm font-extrabold text-white">{value}</span>
    </div>
  )
}

function GuidanceBlock({ result, isVatTransaction }) {
  let message = 'Transfer duty is usually the largest upfront transfer cost. Make sure this cash is available before registration.'

  if (isVatTransaction) {
    message = 'VAT transactions are treated differently from ordinary transfer duty transactions. Confirm with your conveyancer before relying on this estimate.'
  } else if (result.belowDutyThreshold) {
    message = 'Good news - this purchase price may not attract transfer duty. You should still budget for attorney and admin costs.'
  }

  return (
    <div className="mt-7 rounded-[18px] border border-white/10 bg-white/[0.06] p-5">
      <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Smart Guidance</h3>
      <p className="mt-2 text-sm font-medium leading-6 text-white/68">{message}</p>
    </div>
  )
}

export default function TransferCostResults({
  result,
  buyerType,
  bondRequired,
  isVatTransaction,
  formatCurrency,
}) {
  const chartTotal = Math.max(result.chartItems.reduce((total, item) => total + item.value, 0), 1)
  const propertiesHref = `/for-sale?maxPrice=${Math.round(result.purchasePrice)}`

  return (
    <div className="bg-[#071E1A] p-6 text-white md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Estimated Costs</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Estimated Transfer Costs</h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#86E4C2]">
          <ReceiptText className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-[2.45rem] font-extrabold leading-none tracking-[-0.045em] text-[#86E4C2] md:text-[3.2rem]">
          {formatCurrency(result.totalCashRequired)}
        </p>
        <p className="mt-2 text-sm font-bold text-white/60">cash estimate above the purchase price</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${isVatTransaction ? 'bg-[#D9C8A9] text-[#071E1A]' : result.dutyApplies ? 'bg-[#86E4C2] text-[#071E1A]' : 'bg-white/10 text-white/72'}`}>
          {isVatTransaction ? 'VAT transaction selected - transfer duty excluded' : result.dutyApplies ? 'Transfer duty applies' : 'No transfer duty estimate'}
        </span>
        <span className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-extrabold text-white/72">{buyerType}</span>
      </div>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-black/10 px-5 py-2">
        <SummaryRow label="Purchase Price" value={formatCurrency(result.purchasePrice)} />
        <SummaryRow label="Transfer Duty" value={formatCurrency(result.transferDuty)} />
        <SummaryRow label="Attorney Fee" value={formatCurrency(result.attorneyFee)} />
        {result.otherCostItems.map((item) => (
          <SummaryRow key={item.label} label={item.label} value={formatCurrency(item.amount)} />
        ))}
        <SummaryRow label="Total Cash Required" value={formatCurrency(result.totalCashRequired)} />
      </div>

      <div className="mt-7 rounded-[18px] border border-white/10 bg-white/[0.045] p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-extrabold tracking-[-0.02em] text-white">Cost Breakdown</h3>
          <span className="text-xs font-black uppercase tracking-[0.14em] text-[#86E4C2]">Once-off costs</span>
        </div>
        <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-white/10">
          {result.chartItems.map((item) => (
            <span
              key={item.label}
              className="block h-full"
              style={{
                width: `${Math.max((item.value / chartTotal) * 100, item.value > 0 ? 3 : 0)}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          {result.chartItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold text-white/64">
                <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-extrabold text-white">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <GuidanceBlock result={result} isVatTransaction={isVatTransaction} />

      <div className="mt-7 grid gap-3">
        <a
          href={propertiesHref}
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#86E4C2] px-6 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5"
        >
          View Properties In This Budget
          <ArrowRight className="h-4 w-4" />
        </a>
        {bondRequired ? (
          <a
            href="/tools/buyers/bond-cost-calculator"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[#86E4C2]/60"
          >
            Calculate Bond Costs
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  )
}
