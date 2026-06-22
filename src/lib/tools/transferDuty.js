// SARS transfer duty brackets must be reviewed annually when budget changes are published.
// Current 2027 rates are unchanged from the 2026 rates effective from 1 April 2025.
export const transferDutyBrackets = [
  { min: 0, max: 1_210_000, threshold: 0, base: 0, rate: 0 },
  { min: 1_210_001, max: 1_663_800, threshold: 1_210_000, base: 0, rate: 0.03 },
  { min: 1_663_801, max: 2_329_300, threshold: 1_663_800, base: 13_614, rate: 0.06 },
  { min: 2_329_301, max: 2_994_800, threshold: 2_329_300, base: 53_544, rate: 0.08 },
  { min: 2_994_801, max: 13_310_000, threshold: 2_994_800, base: 106_784, rate: 0.11 },
  { min: 13_310_001, max: Infinity, threshold: 13_310_000, base: 1_241_456, rate: 0.13 },
]

export function calculateTransferDuty(purchasePrice, { isVatTransaction = false } = {}) {
  if (isVatTransaction) return 0

  const price = Math.max(Number(purchasePrice) || 0, 0)
  const bracket = transferDutyBrackets.find((item) => price >= item.min && price <= item.max)

  if (!bracket) return 0
  return bracket.base + Math.max(price - bracket.threshold, 0) * bracket.rate
}

export function isBelowTransferDutyThreshold(purchasePrice) {
  return Math.max(Number(purchasePrice) || 0, 0) <= transferDutyBrackets[0].max
}
