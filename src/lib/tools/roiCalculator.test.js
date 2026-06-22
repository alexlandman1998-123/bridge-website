import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRoi, getRoiGuidance } from './roiCalculator.js'

test('calculates bond-financed property ROI with rental cash flow and capital growth', () => {
  const result = calculateRoi({
    purchasePrice: 2_000_000,
    deposit: 200_000,
    transferAndBondCosts: 120_000,
    monthlyRentalIncome: 15_000,
    monthlyExpenses: 4_000,
    vacancyAllowance: 5,
    financingMethod: 'bond',
    annualInterestRate: 11.25,
    termYears: 20,
    holdingPeriodYears: 5,
    annualPropertyGrowth: 5,
  })

  assert.equal(result.initialCashInvested, 320_000)
  assert.equal(result.annualRentalIncome, 180_000)
  assert.equal(result.annualNetRentalBeforeBond, 123_000)
  assert.equal(result.loanAmount, 1_800_000)
  assert.equal(Math.round(result.monthlyBondRepayment), 18_887)
  assert.equal(Math.round(result.annualCashFlow), -103_639)
  assert.equal(Math.round(result.futurePropertyValue), 2_552_563)
  assert.equal(Math.round(result.capitalGrowth), 552_563)
  assert.equal(Math.round(result.totalReturn), 34_367)
  assert.equal(Number(result.roiPercentage.toFixed(1)), 10.7)
  assert.equal(Number(result.annualisedRoi.toFixed(1)), 2.1)
})

test('cash purchase treats the full purchase price as initial cash invested', () => {
  const result = calculateRoi({
    purchasePrice: 2_000_000,
    deposit: 200_000,
    transferAndBondCosts: 120_000,
    monthlyRentalIncome: 15_000,
    monthlyExpenses: 4_000,
    vacancyAllowance: 5,
    financingMethod: 'cash',
    holdingPeriodYears: 5,
    annualPropertyGrowth: 5,
  })

  assert.equal(result.initialCashInvested, 2_120_000)
  assert.equal(result.loanAmount, 0)
  assert.equal(result.monthlyBondRepayment, 0)
  assert.equal(result.annualCashFlow, 123_000)
  assert.equal(Math.round(result.totalReturn), 1_167_563)
  assert.equal(Number(result.roiPercentage.toFixed(1)), 55.1)
})

test('clamps deposit and handles zero initial cash without crashing', () => {
  const result = calculateRoi({
    purchasePrice: 0,
    deposit: 100_000,
    transferAndBondCosts: 0,
    monthlyRentalIncome: 0,
    monthlyExpenses: 0,
    vacancyAllowance: 0,
    financingMethod: 'bond',
    holdingPeriodYears: 5,
    annualPropertyGrowth: 5,
  })

  assert.equal(result.initialCashInvested, 0)
  assert.equal(result.loanAmount, 0)
  assert.equal(result.roiPercentage, 0)
  assert.equal(result.annualisedRoi, 0)
})

test('returns ROI guidance based on return and cash flow', () => {
  assert.match(getRoiGuidance({ roiPercentage: 10, annualCashFlow: 10_000 }), /lower-return/)
  assert.match(getRoiGuidance({ roiPercentage: 40, annualCashFlow: -10_000 }), /annual cash top-up/)
  assert.match(getRoiGuidance({ roiPercentage: 75, annualCashFlow: 10_000 }), /stronger investment/)
})
