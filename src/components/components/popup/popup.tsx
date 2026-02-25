import { useEffect } from "react"
import { createPortal } from "react-dom"
import { CloseButton } from "components/reusable-parts/buttons/close-button/close-button"
import "./popup.scss"

interface PopupProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  autoCloseDuration?: number
}

export function Popup({
  message,
  type,
  onClose,
  autoCloseDuration = 2000,
}: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, autoCloseDuration)

    return () => clearTimeout(timer)
  }, [onClose, autoCloseDuration])

  return createPortal(
    <div className="popup">
      <div className={`popup__container popup__container--${type}`}>
        <div className="popup__message">{message}</div>
        <CloseButton
          onClick={onClose}
          className="popup__close-button"
          accentColorVar={type === "success" ? "#22c55e" : "#ef4444"}
          ariaLabel="Close notification"
        />
      </div>
    </div>,
    document.body,
  )
}
