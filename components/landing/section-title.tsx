"use client"

import { motion } from "framer-motion"
import { useLandingMotion } from "@/hooks/use-landing-motion"

type SectionTitleProps = {
  title: string
  description?: string
  className?: string
}

export function SectionTitle({ title, description, className }: SectionTitleProps) {
  const { shouldReduceMotion, visible, hidden, inViewMargin } = useLandingMotion()

  const content = (
    <>
      <h2 className="premium-heading">{title}</h2>
      {description ? <p className="premium-subheading">{description}</p> : null}
    </>
  )

  if (shouldReduceMotion) {
    return <div className={className}>{content}</div>
  }

  return (
    <motion.div
      initial={hidden(18)}
      whileInView={visible}
      viewport={{ once: true, margin: inViewMargin }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {content}
    </motion.div>
  )
}
