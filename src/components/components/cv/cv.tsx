import { MouseEvent } from "react"
import "./cv.scss"
import { CloseButton } from "components/reusable-parts/buttons/close-button/close-button"

interface CVProps {
  setCvModalOpen: (open: boolean) => void
}

const CV = ({ setCvModalOpen }: CVProps) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setCvModalOpen(false)
    }
  }

  return (
    <div className="cv" onClick={handleBackdropClick}>
      <div className="cv__container">
        <CloseButton
          onClick={() => setCvModalOpen(false)}
          className="cv__close-button"
        />

        <iframe
          src="/Aleksandrs_Anackis_CV.pdf"
          title="Curriculum Vitae"
          className="cv__iframe"
        />
      </div>
    </div>
  )
}

export default CV
