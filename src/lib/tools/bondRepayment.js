const DEFAULT_SCHEDULE_YEARS = 6

export function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) return min
  return Math.min(Math.max(value, min), max)
}

export function calculateBondRepayment({ loanAmount, annualInterestRate, termYears }) {
  const principal = Math.max(Number(loanAmount) || 0, 0)
  const yearlyTerm = Math.max(Number(termYears) || 0, 0)
  const totalPayments = Math.round(yearlyTerm * 12)

  if (principal === 0 || totalPayments === 0) {
    return {
      monthlyRepayment: 0,
      totalPayable: 0,
      totalInterest: 0,
      totalPayments,
    }
  }

  const monthlyRate = Math.max(Number(annualInterestRate) || 0, 0) / 100 / 12
  const monthlyRepayment =
    monthlyRate === 0
      ? principal / totalPayments
      : principal *
        ((monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1))

  const totalPayable = monthlyRepayment * totalPayments
  const totalInterest = totalPayable - principal

  return {
    monthlyRepayment,
    totalPayable,
    totalInterest,
    totalPayments,
  }
}

export function buildRepaymentSchedule({
  loanAmount,
  annualInterestRate,
  termYears,
  maxPoints = DEFAULT_SCHEDULE_YEARS,
}) {
  const principal = Math.max(Number(loanAmount) || 0, 0)
  const years = Math.max(Math.round(Number(termYears) || 0), 0)
  const monthlyRate = Math.max(Number(annualInterestRate) || 0, 0) / 100 / 12
  const { monthlyRepayment } = calculateBondRepayment({
    loanAmount: principal,
    annualInterestRate,
    termYears: years,
  })

  if (principal === 0 || years === 0) return []

  const interval = Math.max(Math.ceil(years / maxPoints), 1)
  let balance = principal
  let principalPaid = 0
  let interestPaid = 0
  const rows = []

  for (let month = 1; month <= years * 12; month += 1) {
    const monthInterest = monthlyRate === 0 ? 0 : balance * monthlyRate
    const monthPrincipal = Math.min(monthlyRepayment - monthInterest, balance)

    interestPaid += monthInterest
    principalPaid += monthPrincipal
    balance = Math.max(balance - monthPrincipal, 0)

    const isYearEnd = month % 12 === 0
    const year = month / 12
    if (isYearEnd && (year % interval === 0 || year === years)) {
      rows.push({
        year,
        principalPaid,
        interestPaid,
        totalPaid: principalPaid + interestPaid,
      })
    }
  }

  return rows
}

export function formatRand(value) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}
