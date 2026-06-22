import { calculateBondRepayment } from './bondRepayment.js'

export function calculateCashFlow({
  monthlyRentalIncome,
  purchasePrice,
  deposit,
  financingMethod = 'bond',
  annualInterestRate = 0,
  termYears = 20,
  levies,
  ratesAndTaxes,
  insurance,
  managementFees,
  maintenanceReserve,
  otherExpenses,
  vacancyAllowance,
}) {
  const rentalIncome = Math.max(Number(monthlyRentalIncome) || 0, 0)
  const price = Math.max(Number(purchasePrice) || 0, 0)
  const availableDeposit = Math.min(Math.max(Number(deposit) || 0, 0), price)
  const vacancyRate = Math.max(Number(vacancyAllowance) || 0, 0)
  const expenseItems = [
    { label: 'Levies', value: Math.max(Number(levies) || 0, 0) },
    { label: 'Rates & Taxes', value: Math.max(Number(ratesAndTaxes) || 0, 0) },
    { label: 'Insurance', value: Math.max(Number(insurance) || 0, 0) },
    { label: 'Management Fees', value: Math.max(Number(managementFees) || 0, 0) },
    { label: 'Maintenance Reserve', value: Math.max(Number(maintenanceReserve) || 0, 0) },
    { label: 'Other Expenses', value: Math.max(Number(otherExpenses) || 0, 0) },
  ]
  const vacancyLoss = rentalIncome * (vacancyRate / 100)
  const effectiveMonthlyRental = rentalIncome - vacancyLoss
  const totalMonthlyExpenses = expenseItems.reduce((total, item) => total + item.value, 0)
  const isBondFinanced = financingMethod === 'bond'
  const loanAmount = isBondFinanced ? Math.max(price - availableDeposit, 0) : 0
  const monthlyBondRepayment = isBondFinanced
    ? calculateBondRepayment({
        loanAmount,
        annualInterestRate,
        termYears,
      }).monthlyRepayment
    : 0
  const monthlyCashFlow = effectiveMonthlyRental - totalMonthlyExpenses - monthlyBondRepayment
  const annualCashFlow = monthlyCashFlow * 12
  const cashFlowMargin = effectiveMonthlyRental > 0 ? (monthlyCashFlow / effectiveMonthlyRental) * 100 : 0

  return {
    vacancyLoss,
    effectiveMonthlyRental,
    expenseItems,
    totalMonthlyExpenses,
    loanAmount,
    monthlyBondRepayment,
    monthlyCashFlow,
    annualCashFlow,
    cashFlowMargin,
    isBondFinanced,
  }
}

export function getCashFlowGuidance({ monthlyCashFlow, cashFlowMargin }) {
  if (monthlyCashFlow >= 0) {
    return 'This property appears to generate positive monthly cash flow based on your assumptions. Confirm rental demand and expense estimates before making a decision.'
  }

  const baseGuidance = 'This property may require a monthly top-up. Make sure the shortfall fits your budget and that long-term growth justifies the cash flow gap.'

  if (cashFlowMargin < -30) {
    return `${baseGuidance} The monthly shortfall is significant. Review the purchase price, rental income, deposit and financing assumptions carefully.`
  }

  return baseGuidance
}
