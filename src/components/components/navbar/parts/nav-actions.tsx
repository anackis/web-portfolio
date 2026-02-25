import socialGithub from "assets/socialIcons/github.svg"
import socialLinkedIn from "assets/socialIcons/linkedin.svg"
import cvIcon from "assets/socialIcons/cv-icon.svg"
import {
  PERSONAL_PHONE,
  PERSONAL_EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "constants/personal-info"

interface NavActionsProps {
  setConnectModalOpen: (isOpen: boolean) => void
  setCvModalOpen: (isOpen: boolean) => void
}

export const NavActions = ({
  setConnectModalOpen,
  setCvModalOpen,
}: NavActionsProps) => {
  return (
    <>
      <div className="nav__contacts">
        <div>
          <a href={`tel:${PERSONAL_PHONE}`}>{PERSONAL_PHONE}</a>
        </div>

        <div>
          <a href={`mailto:${PERSONAL_EMAIL}`}>{PERSONAL_EMAIL}</a>
        </div>
      </div>

      <div className="nav__socials">
        <a
          className="nav__social-button"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={socialLinkedIn} alt="LinkedIn" />
        </a>

        <a
          className="nav__social-button nav__social-button--github"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={socialGithub} alt="GitHub" />
        </a>

        <button
          type="button"
          className="nav__social-button nav__social-button--cv"
          onClick={() => setCvModalOpen(true)}
        >
          <img src={cvIcon} alt="cvIcon" />
        </button>
      </div>

      <button
        className="nav__connect-btn"
        onClick={() => setConnectModalOpen(true)}
      >
        CONNECT NOW
      </button>
    </>
  )
}
