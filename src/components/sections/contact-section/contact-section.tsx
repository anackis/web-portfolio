import { useState } from "react"
import { Section } from "components/sections/section"
import { ConnectComponent } from "components/components/connect/connect"
import { Popup } from "components/components/popup/popup"

interface ContactSectionProps {
  openProjectModal?: (isOpen: boolean) => void
  currentSection: number
  openCvModal: () => void
}

export const ContactSection = ({
  openProjectModal,
  currentSection,
  openCvModal,
}: ContactSectionProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<"success" | "error">("success")

  const handleClosePopup = () => setShowPopup(false)

  const handleCloseModal = () => openProjectModal?.(false)

  const handleSubmitSuccess = () => {
    setPopupType("success")
    setShowPopup(true)
  }

  const handleSubmitError = () => {
    setPopupType("error")
    setShowPopup(true)
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
          onClose={handleClosePopup}
        />
      )}
      <Section id="connect__section">
        <ConnectComponent
          currentSection={currentSection}
          openCvModal={openCvModal}
          closeModal={openProjectModal ? handleCloseModal : undefined}
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitError={handleSubmitError}
        />
      </Section>
    </>
  )
}
