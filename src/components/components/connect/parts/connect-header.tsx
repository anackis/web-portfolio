import { memo } from "react"
import myImgMobile from "assets/photos/myimg_mobile.webp"
import socialGithub from "assets/socialIcons/github.svg"
import socialLinkedIn from "assets/socialIcons/linkedin.svg"
import cvIcon from "assets/socialIcons/cv-icon.svg"
import {
  PERSONAL_PHONE,
  PERSONAL_EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "constants/personal-info"

interface ConnectHeaderProps {
  onCvButtonClick: () => void
}

export const ConnectHeader = memo(({ onCvButtonClick }: ConnectHeaderProps) => {
  return (
    <div className="connect__textarea-header">
      <div>
        <img
          className="connect__image connect__image--mobile-small"
          src={myImgMobile}
          alt="aboutme-img"
        />
      </div>

      <div>
        <div className="connect__section-title connect__title">Contacts</div>

        <div className="connect__divider block" />

        <div className="connect__links">
          <a
            className="connect__social-link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={socialLinkedIn}
              alt="navIcon"
              className="connect__social-icon"
            />
          </a>

          <a
            className="connect__social-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={socialGithub}
              alt="navIcon"
              className="connect__social-icon"
            />
          </a>

          <button
            type="button"
            className="connect__social-link connect__social-link--cv"
            onClick={onCvButtonClick}
            aria-label="Open CV"
          >
            <img
              src={cvIcon}
              alt="cvIcon"
              className="connect__social-icon connect__social-icon--cv"
            />
          </button>
        </div>

        <div className="connect__contacts connect__contacts--mobile">
          <a href={`tel:${PERSONAL_PHONE}`}>{PERSONAL_PHONE}</a>

          <a href={`mailto:${PERSONAL_EMAIL}`}>{PERSONAL_EMAIL}</a>
        </div>
      </div>
    </div>
  )
})
