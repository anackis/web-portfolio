import clsx from "clsx"
import "./slider-arrow-button.scss"
import { CSSProperties, MouseEventHandler } from "react"

export type SliderArrowButtonProps = {
  direction: "prev" | "next"
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  style?: CSSProperties
  accentColorVar?: string
  ariaLabel?: string
}

type SliderArrowButtonInlineStyle = CSSProperties & {
  "--slider-arrow-accent-color"?: string
}

export const SliderArrowButton = ({
  direction,
  onClick,
  className,
  style,
  accentColorVar,
  ariaLabel,
}: SliderArrowButtonProps) => {
  const label =
    ariaLabel ?? (direction === "next" ? "Next slide" : "Previous slide")
  const mergedStyle: SliderArrowButtonInlineStyle | undefined = accentColorVar
    ? { ...style, "--slider-arrow-accent-color": accentColorVar }
    : style

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={clsx(
        "slider-arrow-button",
        `slider-arrow-button--${direction}`,
        className
      )}
      style={mergedStyle}
    >
      <span className="slider-arrow-button__chevron">
        {direction === "next" ? ">" : "<"}
      </span>
    </button>
  )
}
