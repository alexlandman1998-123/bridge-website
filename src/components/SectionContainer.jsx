import { theme } from '../theme/tokens'

export default function SectionContainer({
  id,
  tone = 'default',
  className = '',
  children,
}) {
  const toneClass = {
    default: '',
    soft: 'bg-[rgba(255,250,244,0.52)]',
    dark: 'bg-[#171412] text-white',
  }[tone]

  return (
    <section id={id} className={`${theme.layout.section} ${toneClass} ${className}`}>
      <div className={theme.layout.container}>{children}</div>
    </section>
  )
}
