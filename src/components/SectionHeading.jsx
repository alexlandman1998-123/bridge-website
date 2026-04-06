import { theme } from '../theme/tokens'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignment =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : 'text-left items-start'

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <p className={theme.typography.eyebrow}>{eyebrow}</p>}

      <h2 className={theme.typography.h2}>{title}</h2>

      {description && (
        <p className="max-w-2xl text-base leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  )
}