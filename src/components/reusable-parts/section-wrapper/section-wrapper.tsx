import clsx from "clsx"
import "./section-wrapper.scss"
import { ReactNode } from "react"

export type SectionWrapperProps = {
  title: string
  children: ReactNode
  absolute?: boolean
  className?: string
}

export const SectionWrapper = ({
  title,
  children,
  absolute = true,
  className,
}: SectionWrapperProps) => {
  return (
    <div className={clsx("section-wrapper", className)}>
      <div
        className={clsx(
          "section-wrapper__panel",
          absolute && "section-wrapper__panel--absolute"
        )}
      >
        <div className="section-wrapper__header">
          <div className="section-wrapper__header-text">{title}</div>
        </div>
        <div className={clsx("section-wrapper__content")}>{children}</div>
      </div>
    </div>
  )
}
