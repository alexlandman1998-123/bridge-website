export default function CalculatorShell({ children }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_28px_90px_rgba(16,24,40,0.08)]">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">{children}</div>
    </div>
  )
}
