export default function GlassPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-[24px] border border-white/50 bg-white/60 backdrop-blur-xl shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  )
}