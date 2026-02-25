import { memo, MouseEvent, useRef, useState } from "react"
import myImg from "assets/photos/myimg.webp"
import { CloseButton } from "components/reusable-parts/buttons/close-button/close-button"
import { Popup } from "components/components/popup/popup"
import { useSendEmail } from "hooks/use-send-email"
import { ConnectHeader } from "./parts/connect-header"
import { ConnectForm } from "./parts/connect-form"

interface ConnectComponentProps {
  closeModal?: () => void
  currentSection?: number
  openCvModal: () => void
  onSubmitSuccess?: () => void
  onSubmitError?: () => void
}

export const ConnectComponent = memo(
  ({
    closeModal,
    currentSection,
    openCvModal,
    onSubmitSuccess,
    onSubmitError,
  }: ConnectComponentProps) => {
    const form = useRef<HTMLFormElement>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [popupType, setPopupType] = useState<"success" | "error">("success")

    const { sendEmail, isSubmitting } = useSendEmail({
      onSuccess: () => {
        if (closeModal) {
          closeModal()
          onSubmitSuccess?.()
        } else {
          setPopupType("success")
          setShowPopup(true)
        }
      },
      onError: () => {
        if (closeModal) {
          onSubmitError?.()
        } else {
          setPopupType("error")
          setShowPopup(true)
        }
      },
    })

    const isVisible = !closeModal && currentSection === 4

    const handleCvButtonClick = () => {
      closeModal?.()
      openCvModal()
    }

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && closeModal) {
        closeModal()
      }
    }

    return (
      <>
        {showPopup && (
          <Popup
            message={
              popupType === "success"
                ? "Message sent successfully!"
                : "Failed to send message. Please try again."
            }
            type={popupType}
            onClose={() => setShowPopup(false)}
          />
        )}
        <div
          id="connect"
          className={`connect ${closeModal ? "connect--backdrop" : ""}`}
          onClick={closeModal ? handleBackdropClick : undefined}
        >
          <div
            className={`connect__wrapper ${
              closeModal ? "connect__wrapper--modal" : ""
            } ${
              !closeModal && isVisible
                ? "connect__wrapper--visible"
                : "connect__wrapper--hidden"
            }`}
          >
            <div className="connect__imgarea">
              <img className="connect__image" src={myImg} alt="aboutme-img" />
            </div>

            <div className="connect__textarea">
              <div className="connect__textarea-wrapper">
                <ConnectHeader onCvButtonClick={handleCvButtonClick} />

                <ConnectForm
                  formRef={form}
                  onSubmit={sendEmail}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>

            {closeModal && (
              <CloseButton
                onClick={closeModal}
                className="connect__close-button"
                accentColorVar="var(--color-primary-purple)"
                ariaLabel="Close contact modal"
              />
            )}
          </div>
        </div>
      </>
    )
  },
)
