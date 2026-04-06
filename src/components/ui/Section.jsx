import Container from './Container'

export default function Section({
  children,
  id,
  className = '',
  containerClassName = '',
  warm = false,
  dark = false,
  tight = false,
}) {
  const bgClass = dark ? 'bg-[#061126]' : warm ? 'bg-[#F5F2EC]' : 'bg-white'
  const pyClass = tight ? 'py-12 lg:py-16' : 'py-16 lg:py-20'

  return (
    <section id={id} className={`${bgClass} ${pyClass} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}