import clsx from "clsx"
import "./slider-dot-button.scss"
import { CSSProperties, MouseEventHandler } from "react"

type SliderDotButtonProps = {
  index: number
  className?: string
  style?: CSSProperties
  accentColorVar?: string
  label?: string
  onClick?: MouseEventHandler<HTMLSpanElement>
}

type SliderDotButtonInlineStyle = CSSProperties & {
  "--slider-dot-accent-color"?: string
}

export const SliderDotButton = ({
  index,
  className,
  style,
  accentColorVar,
  label,
  onClick,
}: SliderDotButtonProps) => {
  const mergedStyle: SliderDotButtonInlineStyle | undefined = accentColorVar
    ? { ...style, "--slider-dot-accent-color": accentColorVar }
    : style

  const ariaLabel = label ?? `Go to slide ${index + 1}`

  return (
    <span
      aria-label={ariaLabel}
      className={clsx("slider-dot-button", className)}
      style={mergedStyle}
      onClick={onClick}
    >
      <span className="slider-dot-button__sr-label">{ariaLabel}</span>
    </span>
  )
}
