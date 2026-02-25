import { useEffect, useState, useRef } from "react"
import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"
import socialGithub from "assets/socialIcons/github.svg"
import socialLinkedIn from "assets/socialIcons/linkedin.svg"
import cvIcon from "assets/socialIcons/cv-icon.svg"
import { BREAKPOINTS } from "constants/constants"
import { GITHUB_URL, LINKEDIN_URL } from "constants/personal-info"

interface Props {
  setCvModalOpen: (isOpen: boolean) => void
}

export const SidePanel = ({ setCvModalOpen }: Props) => {
  const { section } = useSection()
  const { screenWidth } = useUI()
  const [isVisible, setIsVisible] = useState(false)
  const initialRender = useRef(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const shouldHide =
      section === 3 || (screenWidth < BREAKPOINTS.LG_MD && section === 4)

    if (shouldHide) {
      setIsVisible(false)
    } else {
      const delay = initialRender.current ? 3500 : 500
      timer = setTimeout(() => {
        setIsVisible(true)
        initialRender.current = false
      }, delay)
    }
    return () => clearTimeout(timer)
  }, [section, screenWidth])

  const sidePanelClassName = `side-panel ${
    isVisible ? "side-panel--visible" : ""
  }`.trim()

  return (
    <aside className={sidePanelClassName}>
      <div className="side-panel__content">
        <div className="side-panel__text title title_fz16">
          <span>Social networks</span>
        </div>
        <div className="side-panel__divider" />

        <button
          type="button"
          className="side-panel__icon side-panel__icon--cv"
          onClick={() => {
            setCvModalOpen(true)
          }}
        >
          <img src={cvIcon} alt="cv-icon" />
        </button>

        <a
          className="side-panel__icon side-panel__icon--github"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img src={socialGithub} alt="github-icon" />
        </a>

        <a
          className="side-panel__icon side-panel__icon--linkedin"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img src={socialLinkedIn} alt="linkedIn-icon" />
        </a>
      </div>
    </aside>
  )
}
