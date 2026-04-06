export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-[1440px] px-8 ${className}`}>
      {children}
    </div>
  )
}