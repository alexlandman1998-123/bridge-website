export const DEFAULT_REPAYMENT_PERCENTAGE = 35

export function calculateMaximumLoanAmount({ monthlyRepayment, annualInterestRate, termYears }) {
  const repayment = Math.max(Number(monthlyRepayment) || 0, 0)
  const monthlyRate = Math.max(Number(annualInterestRate) || 0, 0) / 100 / 12
  const totalPayments = Math.max(Math.round((Number(termYears) || 0) * 12), 0)

  if (repayment === 0 || totalPayments === 0) return 0
  if (monthlyRate === 0) return repayment * totalPayments

  const compoundRate = Math.pow(1 + monthlyRate, totalPayments)
  return repayment * ((compoundRate - 1) / (monthlyRate * compoundRate))
}

export function calculateAffordability({
  grossMonthlyIncome,
  monthlyDebt,
  monthlyExpenses,
  deposit,
  annualInterestRate,
  termYears,
  repaymentPercentage = DEFAULT_REPAYMENT_PERCENTAGE,
}) {
  const income = Math.max(Number(grossMonthlyIncome) || 0, 0)
  const debt = Math.max(Number(monthlyDebt) || 0, 0)
  const expenses = Math.max(Number(monthlyExpenses) || 0, 0)
  const availableDeposit = Math.max(Number(deposit) || 0, 0)
  const repaymentRatio = Math.max(Number(repaymentPercentage) || 0, 0) / 100
  const disposableIncome = Math.max(income - debt - expenses, 0)
  const grossIncomeCap = income * repaymentRatio
  const affordableMonthlyRepayment = Math.min(grossIncomeCap, disposableIncome)
  const estimatedBond = calculateMaximumLoanAmount({
    monthlyRepayment: affordableMonthlyRepayment,
    annualInterestRate,
    termYears,
  })
  const estimatedPropertyPrice = estimatedBond + availableDeposit
  const comfortableLow = estimatedPropertyPrice * 0.9
  const comfortableHigh = estimatedPropertyPrice * 1.05
  const totalCommitmentRatio = income === 0 ? 0 : (debt + expenses + affordableMonthlyRepayment) / income
  const bondRepaymentRatio = income === 0 ? 0 : affordableMonthlyRepayment / income
  const confidenceLabel =
    affordableMonthlyRepayment === 0
      ? 'Needs More Buffer'
      : totalCommitmentRatio <= 0.72 && bondRepaymentRatio <= 0.32
        ? 'Conservative Estimate'
        : 'Stretch Budget'

  return {
    disposableIncome,
    grossIncomeCap,
    affordableMonthlyRepayment,
    estimatedBond,
    estimatedPropertyPrice,
    comfortableLow,
    comfortableHigh,
    totalCommitmentRatio,
    bondRepaymentRatio,
    confidenceLabel,
  }
}
