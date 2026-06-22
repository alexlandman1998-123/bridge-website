import { useMemo, useState } from 'react'
import { Building2, ReceiptText } from 'lucide-react'
import { calculateTransferCosts } from '../../lib/tools/transferCostCalculator'
import { clampNumber, formatRand } from '../../lib/tools/bondRepayment'
import CalculatorShell from './CalculatorShell'
import SliderInput from './SliderInput'
import TransferCostResults from './TransferCostResults'

const PURCHASE_PRICE = {
  min: 100_000,
  max: 20_000_000,
  step: 10_000,
  defaultValue: 2_000_000,
}

const buyerTypes = ['Natural Person', 'Company', 'Trust']

function ToggleButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      className={`min-h-10 rounded-full px-4 text-sm font-extrabold transition ${
        active
          ? 'bg-[#0D4F45] text-white shadow-[0_12px_24px_rgba(13,79,69,0.16)]'
          : 'border border-black/[0.08] bg-white text-[#667085] hover:border-[#0D4F45]/28 hover:text-[#0D4F45]'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function TransferCostCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(PURCHASE_PRICE.defaultValue)
  const [buyerType, setBuyerType] = useState(buyerTypes[0])
  const [isVatTransaction, setIsVatTransaction] = useState(false)
  const [bondRequired, setBondRequired] = useState(true)

  const result = useMemo(
    () =>
      calculateTransferCosts({
        purchasePrice,
        isVatTransaction,
      }),
    [isVatTransaction, purchasePrice],
  )

  return (
    <CalculatorShell>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0D4F45]">Purchase Details</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#101828]">Estimate upfront cash.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
            <ReceiptText className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 grid gap-7">
          <SliderInput
            label="Purchase Price"
            value={purchasePrice}
            min={PURCHASE_PRICE.min}
            max={PURCHASE_PRICE.max}
            step={PURCHASE_PRICE.step}
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setPurchasePrice(clampNumber(value, PURCHASE_PRICE.min, PURCHASE_PRICE.max))}
          />

          <label className="block">
            <span className="text-sm font-extrabold text-[#101828]">Buyer Type</span>
            <div className="relative mt-3">
              <select
                className="h-12 w-full appearance-none rounded-[14px] border border-black/[0.08] bg-[#FBFAF7] px-4 pr-11 text-base font-extrabold text-[#101828] outline-none transition focus:border-[#0D4F45]/38 focus:bg-white focus:ring-4 focus:ring-[#0D4F45]/10"
                value={buyerType}
                onChange={(event) => setBuyerType(event.target.value)}
              >
                {buyerTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Building2 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0D4F45]" />
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#667085]">Phase 1 uses the same estimate for all buyer types.</p>
          </label>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-sm font-extrabold text-[#101828]">VAT Transaction?</h3>
              <span className="text-xs font-bold text-[#667085]">Default: No</span>
            </div>
            <div className="mt-3 flex gap-2">
              <ToggleButton active={!isVatTransaction} onClick={() => setIsVatTransaction(false)}>No</ToggleButton>
              <ToggleButton active={isVatTransaction} onClick={() => setIsVatTransaction(true)}>Yes</ToggleButton>
            </div>
            {isVatTransaction ? (
              <p className="mt-3 rounded-[14px] bg-[#EEF7F2] p-3 text-xs font-semibold leading-5 text-[#0D4F45]">
                VAT transactions generally do not attract transfer duty, but VAT may be included in the purchase price.
              </p>
            ) : null}
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-sm font-extrabold text-[#101828]">Bond Required?</h3>
              <span className="text-xs font-bold text-[#667085]">Default: Yes</span>
            </div>
            <div className="mt-3 flex gap-2">
              <ToggleButton active={bondRequired} onClick={() => setBondRequired(true)}>Yes</ToggleButton>
              <ToggleButton active={!bondRequired} onClick={() => setBondRequired(false)}>No</ToggleButton>
            </div>
            {bondRequired ? (
              <p className="mt-3 rounded-[14px] bg-[#FBFAF7] p-3 text-xs font-semibold leading-5 text-[#667085]">
                Bond registration costs are separate from transfer costs.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <TransferCostResults
        result={result}
        buyerType={buyerType}
        bondRequired={bondRequired}
        isVatTransaction={isVatTransaction}
        formatCurrency={formatRand}
      />
    </CalculatorShell>
  )
}
