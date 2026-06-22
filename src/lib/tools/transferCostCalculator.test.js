import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateTransferCosts } from './transferCostCalculator.js'
import { calculateTransferDuty, transferDutyBrackets } from './transferDuty.js'
import { estimateTransferAttorneyFee } from './transferFees.js'

test('uses current SARS transfer duty brackets from config', () => {
  assert.equal(transferDutyBrackets[0].max, 1_210_000)
  assert.equal(Math.round(calculateTransferDuty(2_000_000)), 33_786)
  assert.equal(Math.round(calculateTransferDuty(3_000_000)), 107_356)
})

test('removes transfer duty for VAT transactions', () => {
  const result = calculateTransferCosts({
    purchasePrice: 2_000_000,
    isVatTransaction: true,
  })

  assert.equal(result.transferDuty, 0)
  assert.equal(result.totalCashRequired, 35_000)
  assert.equal(result.dutyApplies, false)
})

test('calculates attorney and other transfer cost totals', () => {
  const result = calculateTransferCosts({
    purchasePrice: 2_000_000,
  })

  assert.equal(result.attorneyFee, 30_000)
  assert.equal(result.otherCosts, 5_000)
  assert.equal(Math.round(result.totalCashRequired), 68_786)
  assert.equal(result.dutyApplies, true)
})

test('detects purchases below the duty threshold', () => {
  const result = calculateTransferCosts({
    purchasePrice: 1_000_000,
  })

  assert.equal(result.transferDuty, 0)
  assert.equal(result.belowDutyThreshold, true)
  assert.equal(estimateTransferAttorneyFee(1_000_000), 18_000)
})
