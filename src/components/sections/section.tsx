import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  id: string
}

export const Section = ({ children, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className="interface-container__section"
      style={{ height: "100dvh" }}
    >
      {children}
    </motion.section>
  )
}
