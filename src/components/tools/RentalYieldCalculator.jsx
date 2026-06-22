import { useMemo, useState } from 'react'
import { Building2 } from 'lucide-react'
import { calculateRentalYield } from '../../lib/tools/rentalYieldCalculator'
import { clampNumber, formatRand } from '../../lib/tools/bondRepayment'
import CalculatorShell from './CalculatorShell'
import RentalYieldResults from './RentalYieldResults'
import SliderInput from './SliderInput'

const PURCHASE_PRICE = {
  min: 100_000,
  max: 20_000_000,
  step: 10_000,
  defaultValue: 2_000_000,
}

const MONTHLY_RENT = {
  min: 1_000,
  max: 250_000,
  step: 500,
  defaultValue: 15_000,
}

const MONTHLY_EXPENSES = {
  min: 0,
  max: 100_000,
  step: 500,
  defaultValue: 4_000,
}

const VACANCY_ALLOWANCE = {
  min: 0,
  max: 20,
  step: 1,
  defaultValue: 5,
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

export default function RentalYieldCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(PURCHASE_PRICE.defaultValue)
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(MONTHLY_RENT.defaultValue)
  const [monthlyExpenses, setMonthlyExpenses] = useState(MONTHLY_EXPENSES.defaultValue)
  const [vacancyAllowance, setVacancyAllowance] = useState(VACANCY_ALLOWANCE.defaultValue)
  const [financingType, setFinancingType] = useState('bond')
  const [deposit, setDeposit] = useState(DEPOSIT.defaultValue)
  const [interestRate, setInterestRate] = useState(INTEREST_RATE.defaultValue)
  const [termYears, setTermYears] = useState(TERM_YEARS.defaultValue)

  const result = useMemo(
    () =>
      calculateRentalYield({
        purchasePrice,
        monthlyRentalIncome,
        monthlyExpenses,
        vacancyAllowance,
        financingType,
        deposit,
        annualInterestRate: interestRate,
        termYears,
      }),
    [deposit, financingType, interestRate, monthlyExpenses, monthlyRentalIncome, purchasePrice, termYears, vacancyAllowance],
  )

  return (
    <CalculatorShell>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0D4F45]">Investment Details</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#101828]">Model the return.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
            <Building2 className="h-5 w-5" />
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
            label="Monthly Expenses"
            value={monthlyExpenses}
            min={MONTHLY_EXPENSES.min}
            max={MONTHLY_EXPENSES.max}
            step={MONTHLY_EXPENSES.step}
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setMonthlyExpenses(clampNumber(value, MONTHLY_EXPENSES.min, MONTHLY_EXPENSES.max))}
          />
          <p className="-mt-4 text-xs font-semibold leading-5 text-[#667085]">
            Levies, rates, insurance, management fees and maintenance allowance.
          </p>
          <SliderInput
            label="Vacancy Allowance"
            value={vacancyAllowance}
            min={VACANCY_ALLOWANCE.min}
            max={VACANCY_ALLOWANCE.max}
            step={VACANCY_ALLOWANCE.step}
            suffix="Annual rental"
            inputMode="numeric"
            formatDisplay={(value) => `${Math.round(Number(value))}%`}
            onChange={(value) => setVacancyAllowance(Math.round(clampNumber(value, VACANCY_ALLOWANCE.min, VACANCY_ALLOWANCE.max)))}
          />
          <p className="-mt-4 text-xs font-semibold leading-5 text-[#667085]">
            Estimated percentage of annual rental income lost to vacancy.
          </p>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-sm font-extrabold text-[#101828]">Financing</h3>
              <span className="text-xs font-bold text-[#667085]">Default: Bond Financed</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <ToggleButton active={financingType === 'cash'} onClick={() => setFinancingType('cash')}>Cash Purchase</ToggleButton>
              <ToggleButton active={financingType === 'bond'} onClick={() => setFinancingType('bond')}>Bond Financed</ToggleButton>
            </div>
          </div>

          {financingType === 'bond' ? (
            <div className="grid gap-6 rounded-[18px] border border-black/[0.06] bg-[#FBFAF7] p-4">
              <SliderInput
                label="Deposit"
                value={Math.min(deposit, purchasePrice)}
                min={DEPOSIT.min}
                max={Math.max(purchasePrice, DEPOSIT.step)}
                step={DEPOSIT.step}
                formatDisplay={formatRand}
                inputMode="numeric"
                onChange={(value) => setDeposit(clampNumber(value, DEPOSIT.min, Math.max(purchasePrice, DEPOSIT.min)))}
              />
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
        </div>
      </div>

      <RentalYieldResults
        result={result}
        purchasePrice={purchasePrice}
        monthlyRentalIncome={monthlyRentalIncome}
        monthlyExpenses={monthlyExpenses}
        vacancyAllowance={vacancyAllowance}
        deposit={Math.min(deposit, purchasePrice)}
        formatCurrency={formatRand}
      />
    </CalculatorShell>
  )
}
