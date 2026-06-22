import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildRepaymentSchedule,
  calculateBondRepayment,
  clampNumber,
  formatRand,
} from './bondRepayment.js'

test('calculates the default bond repayment using the amortisation formula', () => {
  const result = calculateBondRepayment({
    loanAmount: 2_000_000,
    annualInterestRate: 11.25,
    termYears: 20,
  })

  assert.equal(Math.round(result.monthlyRepayment), 20_985)
  assert.equal(result.totalPayments, 240)
  assert.equal(Math.round(result.totalPayable), 5_036_429)
  assert.equal(Math.round(result.totalInterest), 3_036_429)
})

test('handles zero interest without dividing by zero', () => {
  const result = calculateBondRepayment({
    loanAmount: 1_200_000,
    annualInterestRate: 0,
    termYears: 20,
  })

  assert.equal(result.monthlyRepayment, 5_000)
  assert.equal(result.totalPayable, 1_200_000)
  assert.equal(result.totalInterest, 0)
})

test('clamps invalid input and formats South African Rand', () => {
  assert.equal(clampNumber(-1, 100, 500), 100)
  assert.equal(clampNumber(700, 100, 500), 500)
  assert.equal(formatRand(2_000_000), 'R 2 000 000')
})

test('builds yearly repayment chart rows', () => {
  const schedule = buildRepaymentSchedule({
    loanAmount: 2_000_000,
    annualInterestRate: 11.25,
    termYears: 20,
  })

  assert.ok(schedule.length > 0)
  assert.equal(schedule.at(-1).year, 20)
  assert.ok(Math.round(schedule.at(-1).principalPaid) <= 2_000_000)
  assert.ok(schedule.at(-1).interestPaid > 0)
})
