export const otherTransferCostItems = [
  { label: 'Deeds Office Fee', amount: 1_500 },
  { label: 'Postage & Petties', amount: 1_000 },
  { label: 'FICA / Admin Fee', amount: 1_500 },
  { label: 'Electronic Fee', amount: 1_000 },
]

export function estimateTransferAttorneyFee(purchasePrice) {
  const price = Math.max(Number(purchasePrice) || 0, 0)

  if (price <= 500_000) return 12_000
  if (price <= 1_000_000) return 18_000
  if (price <= 1_500_000) return 24_000
  if (price <= 2_000_000) return 30_000
  if (price <= 3_000_000) return 38_000
  if (price <= 5_000_000) return 52_000
  return 65_000
}

export function calculateOtherTransferCosts() {
  return otherTransferCostItems.reduce((total, item) => total + item.amount, 0)
}
