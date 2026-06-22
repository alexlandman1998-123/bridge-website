import { useMemo, useState } from 'react'
import { WalletCards } from 'lucide-react'
import { calculateCashFlow } from '../../lib/tools/cashFlowCalculator'
import { clampNumber, formatRand } from '../../lib/tools/bondRepayment'
import CalculatorShell from './CalculatorShell'
import CashFlowResults from './CashFlowResults'
import SliderInput from './SliderInput'

const MONTHLY_RENT = {
  min: 1_000,
  max: 250_000,
  step: 500,
  defaultValue: 15_000,
}

const PURCHASE_PRICE = {
  min: 100_000,
  max: 20_000_000,
  step: 10_000,
  defaultValue: 2_000_000,
}

const DEPOSIT = {
  min: 0,
  max: 10_000_000,
  step: 10_000,
  defaultValue: 200_000,
}

const INTEREST_RATE = {
  min: 7,
  max: 15,
  step: 0.25,
  defaultValue: 11.25,
}

const TERM_YEARS = {
  min: 5,
  max: 30,
  step: 1,
  defaultValue: 20,
}

const VACANCY_ALLOWANCE = {
  min: 0,
  max: 20,
  step: 1,
  defaultValue: 5,
}

const expenseFields = [
  { key: 'levies', label: 'Levies', defaultValue: 1_500 },
  { key: 'ratesAndTaxes', label: 'Rates & Taxes', defaultValue: 1_200 },
  { key: 'insurance', label: 'Insurance', defaultValue: 500 },
  { key: 'managementFees', label: 'Management Fees', defaultValue: 1_000 },
  { key: 'maintenanceReserve', label: 'Maintenance Reserve', defaultValue: 1_500 },
  { key: 'otherExpenses', label: 'Other Expenses', defaultValue: 0 },
]

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

export default function CashFlowCalculator() {
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(MONTHLY_RENT.defaultValue)
  const [purchasePrice, setPurchasePrice] = useState(PURCHASE_PRICE.defaultValue)
  const [deposit, setDeposit] = useState(DEPOSIT.defaultValue)
  const [financingMethod, setFinancingMethod] = useState('bond')
  const [interestRate, setInterestRate] = useState(INTEREST_RATE.defaultValue)
  const [termYears, setTermYears] = useState(TERM_YEARS.defaultValue)
  const [expenses, setExpenses] = useState(() =>
    expenseFields.reduce((values, field) => ({ ...values, [field.key]: field.defaultValue }), {}),
  )
  const [vacancyAllowance, setVacancyAllowance] = useState(VACANCY_ALLOWANCE.defaultValue)
  const clampedDeposit = Math.min(deposit, purchasePrice)

  const result = useMemo(
    () =>
      calculateCashFlow({
        monthlyRentalIncome,
        purchasePrice,
        deposit: clampedDeposit,
        financingMethod,
        annualInterestRate: interestRate,
        termYears,
        ...expenses,
        vacancyAllowance,
      }),
    [
      clampedDeposit,
      expenses,
      financingMethod,
      interestRate,
      monthlyRentalIncome,
      purchasePrice,
      termYears,
      vacancyAllowance,
    ],
  )

  function setExpenseValue(key, value) {
    setExpenses((current) => ({
      ...current,
      [key]: clampNumber(value, 0, 100_000),
    }))
  }

  return (
    <CalculatorShell>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0D4F45]">Monthly Property Inputs</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#101828]">Track the monthly flow.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
            <WalletCards className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 grid gap-7">
          <SliderInput
            label="Monthly Rental Income"
            value={monthlyRentalIncome}
            min={MONTHLY_RENT.min}
            max={MONTHLY_RENT.max}
            step={MONTHLY_RENT.step}
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setMonthlyRentalIncome(clampNumber(value, MONTHLY_RENT.min, MONTHLY_RENT.max))}
          />
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
          <SliderInput
            label="Deposit"
            value={clampedDeposit}
            min={DEPOSIT.min}
            max={Math.max(purchasePrice, DEPOSIT.step)}
            step={DEPOSIT.step}
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setDeposit(clampNumber(value, DEPOSIT.min, Math.max(purchasePrice, DEPOSIT.min)))}
          />

          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-sm font-extrabold text-[#101828]">Financing Method</h3>
              <span className="text-xs font-bold text-[#667085]">Default: Bond Financed</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <ToggleButton active={financingMethod === 'cash'} onClick={() => setFinancingMethod('cash')}>Cash Purchase</ToggleButton>
              <ToggleButton active={financingMethod === 'bond'} onClick={() => setFinancingMethod('bond')}>Bond Financed</ToggleButton>
            </div>
          </div>

          {financingMethod === 'bond' ? (
            <div className="grid gap-6 rounded-[18px] border border-black/[0.06] bg-[#FBFAF7] p-4">
              <SliderInput
                label="Interest Rate"
                value={interestRate}
                min={INTEREST_RATE.min}
                max={INTEREST_RATE.max}
                step={INTEREST_RATE.step}
                suffix="Annual rate"
                formatDisplay={(value) => `${Number(value).toFixed(2)}%`}
                onChange={(value) => setInterestRate(clampNumber(value, INTEREST_RATE.min, INTEREST_RATE.max))}
              />
              <SliderInput
                label="Bond Term"
                value={termYears}
                min={TERM_YEARS.min}
                max={TERM_YEARS.max}
                step={TERM_YEARS.step}
                suffix="Years"
                inputMode="numeric"
                formatDisplay={(value) => `${Math.round(Number(value))} years`}
                onChange={(value) => setTermYears(Math.round(clampNumber(value, TERM_YEARS.min, TERM_YEARS.max)))}
              />
            </div>
          ) : null}

          <div className="grid gap-5 rounded-[18px] border border-black/[0.06] bg-[#FBFAF7] p-4">
            <div>
              <h3 className="text-sm font-extrabold text-[#101828]">Monthly Expenses</h3>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">Include the recurring costs that affect monthly cash flow.</p>
            </div>
            {expenseFields.map((field) => (
              <SliderInput
                key={field.key}
                label={field.label}
                value={expenses[field.key]}
                min={0}
                max={100_000}
                step={100}
                formatDisplay={formatRand}
                inputMode="numeric"
                onChange={(value) => setExpenseValue(field.key, value)}
              />
            ))}
          </div>

          <SliderInput
            label="Vacancy Allowance"
            value={vacancyAllowance}
            min={VACANCY_ALLOWANCE.min}
            max={VACANCY_ALLOWANCE.max}
            step={VACANCY_ALLOWANCE.step}
            suffix="Monthly rental"
            inputMode="numeric"
            formatDisplay={(value) => `${Math.round(Number(value))}%`}
            onChange={(value) => setVacancyAllowance(Math.round(clampNumber(value, VACANCY_ALLOWANCE.min, VACANCY_ALLOWANCE.max)))}
          />
        </div>
      </div>

      <CashFlowResults
        result={result}
        monthlyRentalIncome={monthlyRentalIncome}
        vacancyAllowance={vacancyAllowance}
        formatCurrency={formatRand}
      />
    </CalculatorShell>
  )
}
