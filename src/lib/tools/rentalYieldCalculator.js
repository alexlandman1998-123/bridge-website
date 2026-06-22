import { calculateBondRepayment } from './bondRepayment.js'

export function calculateRentalYield({
  purchasePrice,
  monthlyRentalIncome,
  monthlyExpenses,
  vacancyAllowance,
  financingType = 'bond',
  deposit = 0,
  annualInterestRate = 0,
  termYears = 20,
}) {
  const price = Math.max(Number(purchasePrice) || 0, 0)
  const rentalIncome = Math.max(Number(monthlyRentalIncome) || 0, 0)
  const expenses = Math.max(Number(monthlyExpenses) || 0, 0)
  const vacancyRate = Math.max(Number(vacancyAllowance) || 0, 0)
  const availableDeposit = Math.min(Math.max(Number(deposit) || 0, 0), price)
  const isBondFinanced = financingType === 'bond'
  const grossAnnualRental = rentalIncome * 12
  const vacancyLoss = grossAnnualRental * (vacancyRate / 100)
  const effectiveAnnualRental = grossAnnualRental - vacancyLoss
  const annualExpenses = expenses * 12
  const netAnnualIncome = effectiveAnnualRental - annualExpenses
  const grossYield = price === 0 ? 0 : (grossAnnualRental / price) * 100
  const netYield = price === 0 ? 0 : (netAnnualIncome / price) * 100
  const monthlyNetIncomeBeforeBond = netAnnualIncome / 12
  const loanAmount = isBondFinanced ? Math.max(price - availableDeposit, 0) : 0
  const monthlyBondRepayment = isBondFinanced
    ? calculateBondRepayment({
        loanAmount,
        annualInterestRate,
        termYears,
      }).monthlyRepayment
    : 0
  const monthlyCashFlow = isBondFinanced
    ? monthlyNetIncomeBeforeBond - monthlyBondRepayment
    : monthlyNetIncomeBeforeBond

  return {
    grossAnnualRental,
    vacancyLoss,
    effectiveAnnualRental,
    annualExpenses,
    netAnnualIncome,
    grossYield,
    netYield,
    monthlyNetIncomeBeforeBond,
    loanAmount,
    monthlyBondRepayment,
    monthlyCashFlow,
    isBondFinanced,
  }
}

export function getRentalYieldGuidance({ netYield, monthlyCashFlow }) {
  const yieldGuidance =
    netYield < 5
      ? 'This may be a lower-yield investment. Check whether capital growth, location or long-term rental demand justify the numbers.'
      : netYield <= 8
        ? 'This appears to fall within a moderate rental yield range. Review cash flow, vacancy risk and long-term maintenance costs.'
        : 'This appears to be a stronger rental yield. Confirm rental demand, tenant quality and maintenance assumptions before committing.'

  if (monthlyCashFlow < 0) {
    return `${yieldGuidance} This property may require a monthly top-up if bond financed. Make sure the shortfall fits your budget.`
  }

  return yieldGuidance
}
