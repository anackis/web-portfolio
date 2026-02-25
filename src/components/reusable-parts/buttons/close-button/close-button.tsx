import clsx from "clsx"
import "./close-button.scss"
import { CSSProperties } from "react"

export type CloseButtonProps = {
  onClick: () => void
  accentColorVar?: string
  className?: string
  ariaLabel?: string
}

type CloseButtonInlineStyle = CSSProperties & {
  "--close-button-accent-color"?: string
}

export const CloseButton = ({
  onClick,
  accentColorVar,
  className,
  ariaLabel = "Close",
}: CloseButtonProps) => {
  const style: CloseButtonInlineStyle | undefined = accentColorVar
    ? { "--close-button-accent-color": accentColorVar }
    : undefined

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx("close-button", className)}
      style={style}
    >
      <span className="close-button__line close-button__line--rotate-45 close-button__line--accent" />
      <span className="close-button__line close-button__line--rotate-minus-45 close-button__line--accent" />
    </button>
  )
}
