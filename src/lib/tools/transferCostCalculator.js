import { calculateTransferDuty, isBelowTransferDutyThreshold } from './transferDuty.js'
import {
  calculateOtherTransferCosts,
  estimateTransferAttorneyFee,
  otherTransferCostItems,
} from './transferFees.js'

export function calculateTransferCosts({
  purchasePrice,
  isVatTransaction = false,
}) {
  const price = Math.max(Number(purchasePrice) || 0, 0)
  const transferDuty = calculateTransferDuty(price, { isVatTransaction })
  const attorneyFee = estimateTransferAttorneyFee(price)
  const otherCosts = calculateOtherTransferCosts()
  const totalCashRequired = transferDuty + attorneyFee + otherCosts
  const dutyApplies = !isVatTransaction && transferDuty > 0
  const belowDutyThreshold = !isVatTransaction && isBelowTransferDutyThreshold(price)

  const chartItems = [
    { label: 'Transfer Duty', value: transferDuty, color: '#86E4C2' },
    { label: 'Attorney Fee', value: attorneyFee, color: '#D9C8A9' },
    { label: 'Other Fees', value: otherCosts, color: '#9DB7AD' },
  ]

  return {
    purchasePrice: price,
    transferDuty,
    attorneyFee,
    otherCostItems: otherTransferCostItems,
    otherCosts,
    totalCashRequired,
    dutyApplies,
    belowDutyThreshold,
    chartItems,
  }
}
