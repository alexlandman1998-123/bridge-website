export default function Card({
  children,
  className = '',
  dark = false,
  glass = false,
}) {
  const base = 'rounded-[24px] border p-6 transition'

  const styles = glass
    ? 'bg-white/60 backdrop-blur-xl border-white/50 shadow-[0_18px_40px_rgba(15,23,42,0.08)]'
    : dark
      ? 'border-white/10 bg-white/[0.03] text-white'
      : 'border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]'

  return <div className={`${base} ${styles} ${className}`}>{children}</div>
}