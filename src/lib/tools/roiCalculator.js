import { calculateBondRepayment } from './bondRepayment.js'

export function calculateRoi({
  purchasePrice,
  deposit,
  transferAndBondCosts,
  monthlyRentalIncome,
  monthlyExpenses,
  vacancyAllowance,
  financingMethod = 'bond',
  annualInterestRate = 0,
  termYears = 20,
  holdingPeriodYears,
  annualPropertyGrowth,
}) {
  const price = Math.max(Number(purchasePrice) || 0, 0)
  const availableDeposit = Math.min(Math.max(Number(deposit) || 0, 0), price)
  const buyingCosts = Math.max(Number(transferAndBondCosts) || 0, 0)
  const rent = Math.max(Number(monthlyRentalIncome) || 0, 0)
  const expenses = Math.max(Number(monthlyExpenses) || 0, 0)
  const vacancyRate = Math.max(Number(vacancyAllowance) || 0, 0)
  const holdingPeriod = Math.max(Number(holdingPeriodYears) || 0, 0)
  const growthRate = Math.max(Number(annualPropertyGrowth) || 0, 0)
  const isBondFinanced = financingMethod === 'bond'
  const initialCashInvested = isBondFinanced ? availableDeposit + buyingCosts : price + buyingCosts
  const annualRentalIncome = rent * 12
  const vacancyLoss = annualRentalIncome * (vacancyRate / 100)
  const annualExpenses = expenses * 12
  const annualNetRentalBeforeBond = annualRentalIncome - vacancyLoss - annualExpenses
  const loanAmount = isBondFinanced ? Math.max(price - availableDeposit, 0) : 0
  const monthlyBondRepayment = isBondFinanced
    ? calculateBondRepayment({
        loanAmount,
        annualInterestRate,
        termYears,
      }).monthlyRepayment
    : 0
  const annualBondRepayment = monthlyBondRepayment * 12
  const annualCashFlow = annualNetRentalBeforeBond - annualBondRepayment
  const totalCashFlow = annualCashFlow * holdingPeriod
  const futurePropertyValue = price * Math.pow(1 + growthRate / 100, holdingPeriod)
  const capitalGrowth = futurePropertyValue - price
  const totalReturn = totalCashFlow + capitalGrowth
  const roiPercentage = initialCashInvested > 0 ? (totalReturn / initialCashInvested) * 100 : 0
  const roiGrowthFactor = 1 + roiPercentage / 100
  const annualisedRoi =
    initialCashInvested > 0 && holdingPeriod > 0
      ? roiGrowthFactor <= 0
        ? -100
        : (Math.pow(roiGrowthFactor, 1 / holdingPeriod) - 1) * 100
      : 0

  return {
    initialCashInvested,
    annualRentalIncome,
    vacancyLoss,
    annualExpenses,
    annualNetRentalBeforeBond,
    loanAmount,
    monthlyBondRepayment,
    annualBondRepayment,
    annualCashFlow,
    totalCashFlow,
    futurePropertyValue,
    capitalGrowth,
    totalReturn,
    roiPercentage,
    annualisedRoi,
    isBondFinanced,
    holdingPeriodYears: holdingPeriod,
  }
}

export function getRoiGuidance({ roiPercentage, annualCashFlow }) {
  const returnGuidance =
    roiPercentage < 20
      ? 'This appears to be a lower-return investment based on your assumptions. Review rental income, expenses, vacancy risk and expected growth.'
      : roiPercentage <= 60
        ? 'This appears to be a moderate-return investment. Check whether the cash flow and growth assumptions are realistic for the area.'
        : 'This appears to be a stronger investment scenario. Confirm the rental demand, purchase price and growth assumptions before committing.'

  if (annualCashFlow < 0) {
    return `${returnGuidance} This property may require an annual cash top-up while financed. Make sure the shortfall fits your budget.`
  }

  return returnGuidance
}
