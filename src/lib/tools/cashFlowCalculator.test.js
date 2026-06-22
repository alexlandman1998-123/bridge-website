import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateCashFlow,
  getCashFlowGuidance,
} from './cashFlowCalculator.js'

const defaultInputs = {
  monthlyRentalIncome: 15_000,
  purchasePrice: 2_000_000,
  deposit: 200_000,
  financingMethod: 'bond',
  annualInterestRate: 11.25,
  termYears: 20,
  levies: 1_500,
  ratesAndTaxes: 1_200,
  insurance: 500,
  managementFees: 1_000,
  maintenanceReserve: 1_500,
  otherExpenses: 0,
  vacancyAllowance: 5,
}

test('calculates bond-financed monthly cash flow after vacancy, expenses and bond', () => {
  const result = calculateCashFlow(defaultInputs)

  assert.equal(result.vacancyLoss, 750)
  assert.equal(result.effectiveMonthlyRental, 14_250)
  assert.equal(result.totalMonthlyExpenses, 5_700)
  assert.equal(result.loanAmount, 1_800_000)
  assert.equal(Math.round(result.monthlyBondRepayment), 18_887)
  assert.equal(Math.round(result.monthlyCashFlow), -10_337)
  assert.equal(Math.round(result.annualCashFlow), -124_039)
  assert.equal(Number(result.cashFlowMargin.toFixed(1)), -72.5)
})

test('cash purchase removes bond repayment', () => {
  const result = calculateCashFlow({
    ...defaultInputs,
    financingMethod: 'cash',
  })

  assert.equal(result.monthlyBondRepayment, 0)
  assert.equal(result.monthlyCashFlow, 8_550)
  assert.equal(result.annualCashFlow, 102_600)
})

test('clamps deposit and handles empty values safely', () => {
  const result = calculateCashFlow({
    monthlyRentalIncome: '',
    purchasePrice: 1_000_000,
    deposit: 2_000_000,
    financingMethod: 'bond',
    annualInterestRate: 11.25,
    termYears: 20,
    levies: -1,
    ratesAndTaxes: '',
    insurance: 0,
    managementFees: 0,
    maintenanceReserve: 0,
    otherExpenses: 0,
    vacancyAllowance: 5,
  })

  assert.equal(result.loanAmount, 0)
  assert.equal(result.monthlyBondRepayment, 0)
  assert.equal(result.monthlyCashFlow, 0)
})

test('returns guidance for positive and negative cash flow', () => {
  assert.match(getCashFlowGuidance({ monthlyCashFlow: 1_000, cashFlowMargin: 10 }), /positive monthly cash flow/)
  assert.match(getCashFlowGuidance({ monthlyCashFlow: -1_000, cashFlowMargin: -10 }), /monthly top-up/)
  assert.match(getCashFlowGuidance({ monthlyCashFlow: -5_000, cashFlowMargin: -40 }), /shortfall is significant/)
})
