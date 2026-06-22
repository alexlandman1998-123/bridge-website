import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateAffordability,
  calculateMaximumLoanAmount,
} from './affordabilityCalculator.js'

test('calculates affordability from the lower of gross cap and disposable income', () => {
  const result = calculateAffordability({
    grossMonthlyIncome: 50_000,
    monthlyDebt: 5_000,
    monthlyExpenses: 15_000,
    deposit: 100_000,
    annualInterestRate: 11.25,
    termYears: 20,
    repaymentPercentage: 35,
  })

  assert.equal(result.affordableMonthlyRepayment, 17_500)
  assert.equal(Math.round(result.estimatedBond), 1_667_848)
  assert.equal(Math.round(result.estimatedPropertyPrice), 1_767_848)
  assert.equal(result.confidenceLabel, 'Stretch Budget')
})

test('uses disposable income when expenses leave less than the repayment cap', () => {
  const result = calculateAffordability({
    grossMonthlyIncome: 50_000,
    monthlyDebt: 12_000,
    monthlyExpenses: 28_000,
    deposit: 50_000,
    annualInterestRate: 11.25,
    termYears: 20,
    repaymentPercentage: 35,
  })

  assert.equal(result.affordableMonthlyRepayment, 10_000)
  assert.ok(result.estimatedPropertyPrice > 900_000)
  assert.ok(result.estimatedPropertyPrice < 1_100_000)
})

test('handles zero interest safely when reversing the bond formula', () => {
  const loanAmount = calculateMaximumLoanAmount({
    monthlyRepayment: 5_000,
    annualInterestRate: 0,
    termYears: 20,
  })

  assert.equal(loanAmount, 1_200_000)
})

test('does not produce negative affordability values', () => {
  const result = calculateAffordability({
    grossMonthlyIncome: 20_000,
    monthlyDebt: 15_000,
    monthlyExpenses: 12_000,
    deposit: -10_000,
    annualInterestRate: 11.25,
    termYears: 20,
  })

  assert.equal(result.affordableMonthlyRepayment, 0)
  assert.equal(result.estimatedBond, 0)
  assert.equal(result.estimatedPropertyPrice, 0)
})
