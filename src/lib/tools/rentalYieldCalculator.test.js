import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateRentalYield,
  getRentalYieldGuidance,
} from './rentalYieldCalculator.js'

test('calculates gross yield, net yield and bond-financed cash flow', () => {
  const result = calculateRentalYield({
    purchasePrice: 2_000_000,
    monthlyRentalIncome: 15_000,
    monthlyExpenses: 4_000,
    vacancyAllowance: 5,
    financingType: 'bond',
    deposit: 200_000,
    annualInterestRate: 11.25,
    termYears: 20,
  })

  assert.equal(result.grossAnnualRental, 180_000)
  assert.equal(result.vacancyLoss, 9_000)
  assert.equal(result.annualExpenses, 48_000)
  assert.equal(result.netAnnualIncome, 123_000)
  assert.equal(result.grossYield, 9)
  assert.equal(result.netYield, 6.15)
  assert.equal(result.loanAmount, 1_800_000)
  assert.equal(Math.round(result.monthlyBondRepayment), 18_887)
  assert.equal(Math.round(result.monthlyCashFlow), -8_637)
})

test('cash purchase uses net income before bond as monthly cash flow', () => {
  const result = calculateRentalYield({
    purchasePrice: 2_000_000,
    monthlyRentalIncome: 15_000,
    monthlyExpenses: 4_000,
    vacancyAllowance: 5,
    financingType: 'cash',
  })

  assert.equal(result.loanAmount, 0)
  assert.equal(result.monthlyBondRepayment, 0)
  assert.equal(result.monthlyCashFlow, 10_250)
})

test('clamps deposit to purchase price', () => {
  const result = calculateRentalYield({
    purchasePrice: 1_000_000,
    monthlyRentalIncome: 8_000,
    monthlyExpenses: 2_000,
    vacancyAllowance: 0,
    financingType: 'bond',
    deposit: 2_000_000,
    annualInterestRate: 11.25,
    termYears: 20,
  })

  assert.equal(result.loanAmount, 0)
  assert.equal(result.monthlyBondRepayment, 0)
})

test('returns guidance based on yield and cash flow', () => {
  assert.match(getRentalYieldGuidance({ netYield: 4, monthlyCashFlow: 1_000 }), /lower-yield/)
  assert.match(getRentalYieldGuidance({ netYield: 6.2, monthlyCashFlow: -1_000 }), /monthly top-up/)
  assert.match(getRentalYieldGuidance({ netYield: 9, monthlyCashFlow: 1_000 }), /stronger rental yield/)
})
