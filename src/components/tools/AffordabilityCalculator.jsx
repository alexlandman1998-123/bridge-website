import { useMemo, useState } from 'react'
import { Calculator, ChevronDown } from 'lucide-react'
import {
  calculateAffordability,
  DEFAULT_REPAYMENT_PERCENTAGE,
} from '../../lib/tools/affordabilityCalculator'
import { clampNumber, formatRand } from '../../lib/tools/bondRepayment'
import CalculatorShell from './CalculatorShell'
import SliderInput from './SliderInput'
import AffordabilityResults from './AffordabilityResults'

const GROSS_INCOME = {
  min: 5_000,
  max: 500_000,
  step: 1_000,
  defaultValue: 50_000,
}

const MONTHLY_DEBT = {
  min: 0,
  max: 200_000,
  step: 500,
  defaultValue: 5_000,
}

const MONTHLY_EXPENSES = {
  min: 0,
  max: 300_000,
  step: 500,
  defaultValue: 15_000,
}

const DEPOSIT = {
  min: 0,
  max: 5_000_000,
  step: 10_000,
  defaultValue: 100_000,
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

const REPAYMENT_PERCENTAGE = {
  min: 20,
  max: 40,
  step: 1,
  defaultValue: DEFAULT_REPAYMENT_PERCENTAGE,
}

export default function AffordabilityCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(GROSS_INCOME.defaultValue)
  const [monthlyDebt, setMonthlyDebt] = useState(MONTHLY_DEBT.defaultValue)
  const [monthlyExpenses, setMonthlyExpenses] = useState(MONTHLY_EXPENSES.defaultValue)
  const [deposit, setDeposit] = useState(DEPOSIT.defaultValue)
  const [interestRate, setInterestRate] = useState(INTEREST_RATE.defaultValue)
  const [termYears, setTermYears] = useState(TERM_YEARS.defaultValue)
  const [repaymentPercentage, setRepaymentPercentage] = useState(REPAYMENT_PERCENTAGE.defaultValue)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const result = useMemo(
    () =>
      calculateAffordability({
        grossMonthlyIncome,
        monthlyDebt,
        monthlyExpenses,
        deposit,
        annualInterestRate: interestRate,
        termYears,
        repaymentPercentage,
      }),
    [deposit, grossMonthlyIncome, interestRate, monthlyDebt, monthlyExpenses, repaymentPercentage, termYears],
  )

  return (
    <CalculatorShell>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0D4F45]">Your Financial Profile</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#101828]">Start with the essentials.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
            <Calculator className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 grid gap-7">
          <SliderInput
            label="Gross Monthly Income"
            value={grossMonthlyIncome}
            min={GROSS_INCOME.min}
            max={GROSS_INCOME.max}
            step={GROSS_INCOME.step}
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setGrossMonthlyIncome(clampNumber(value, GROSS_INCOME.min, GROSS_INCOME.max))}
          />
          <SliderInput
            label="Existing Debt Repayments"
            value={monthlyDebt}
            min={MONTHLY_DEBT.min}
            max={MONTHLY_DEBT.max}
            step={MONTHLY_DEBT.step}
            suffix="Monthly"
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setMonthlyDebt(clampNumber(value, MONTHLY_DEBT.min, MONTHLY_DEBT.max))}
          />
          <SliderInput
            label="Monthly Living Expenses"
            value={monthlyExpenses}
            min={MONTHLY_EXPENSES.min}
            max={MONTHLY_EXPENSES.max}
            step={MONTHLY_EXPENSES.step}
            suffix="Monthly"
            formatDisplay={formatRand}
            inputMode="numeric"
            onChange={(value) => setMonthlyExpenses(clampNumber(value, MONTHLY_EXPENSES.min, MONTHLY_EXPENSES.max))}
          />

          <div className="rounded-[18px] border border-black/[0.06] bg-[#FBFAF7] p-4">
            <button
              type="button"
              className="flex min-h-10 w-full items-center justify-between gap-4 text-left text-sm font-extrabold text-[#101828]"
              aria-expanded={advancedOpen}
              onClick={() => setAdvancedOpen((open) => !open)}
            >
              Advanced Assumptions
              <ChevronDown className={`h-4 w-4 text-[#0D4F45] transition ${advancedOpen ? 'rotate-180' : ''}`} />
            </button>

            {advancedOpen ? (
              <div className="mt-5 grid gap-6 border-t border-black/[0.06] pt-5">
                <SliderInput
                  label="Deposit Available"
                  value={deposit}
                  min={DEPOSIT.min}
                  max={DEPOSIT.max}
                  step={DEPOSIT.step}
                  suffix="Optional"
                  formatDisplay={formatRand}
                  inputMode="numeric"
                  onChange={(value) => setDeposit(clampNumber(value, DEPOSIT.min, DEPOSIT.max))}
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
                <SliderInput
                  label="Repayment Percentage"
                  value={repaymentPercentage}
                  min={REPAYMENT_PERCENTAGE.min}
                  max={REPAYMENT_PERCENTAGE.max}
                  step={REPAYMENT_PERCENTAGE.step}
                  suffix="Gross income"
                  inputMode="numeric"
                  formatDisplay={(value) => `${Math.round(Number(value))}%`}
                  onChange={(value) => setRepaymentPercentage(Math.round(clampNumber(value, REPAYMENT_PERCENTAGE.min, REPAYMENT_PERCENTAGE.max)))}
                />
              </div>
            ) : (
              <p className="mt-2 text-xs font-semibold leading-5 text-[#667085]">
                Using a {interestRate.toFixed(2)}% interest rate, {termYears}-year term, {formatRand(deposit)} deposit and {repaymentPercentage}% repayment cap.
              </p>
            )}
          </div>
        </div>
      </div>

      <AffordabilityResults
        result={result}
        grossMonthlyIncome={grossMonthlyIncome}
        monthlyDebt={monthlyDebt}
        monthlyExpenses={monthlyExpenses}
        deposit={deposit}
        formatCurrency={formatRand}
      />
    </CalculatorShell>
  )
}
