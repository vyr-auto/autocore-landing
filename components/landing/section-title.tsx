type SectionTitleProps = {
  title: string
  description?: string
  className?: string
}

export function SectionTitle({ title, description, className }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 className="premium-heading">{title}</h2>
      {description ? <p className="premium-subheading">{description}</p> : null}
    </div>
  )
}
