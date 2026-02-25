import { useEffect, useRef, useState } from "react"
import { useSection } from "contexts/section-context"
import socialGithub from "assets/socialIcons/github.svg"
import socialLinkedIn from "assets/socialIcons/linkedin.svg"
import cvIcon from "assets/socialIcons/cv-icon.svg"
import {
  PERSONAL_PHONE,
  PERSONAL_EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "constants/personal-info"
import { MenuButton } from "./parts/menu-button"

const MENU_SECTIONS = [
  "HOME",
  "ABOUT",
  "SKILLS",
  "PROJECTS",
  "CONTACTS",
] as const

const useDelayedVisibility = (isVisible: boolean): boolean => {
  const [isVisibleDelayed, setIsVisibleDelayed] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setIsVisibleDelayed(isVisible),
      isVisible ? 500 : 0,
    )
    return () => clearTimeout(timeoutId)
  }, [isVisible])

  return isVisibleDelayed
}

interface MenuProps {
  menuOpened: boolean
  setMenuOpened: (opened: boolean) => void
  setCvModalOpen: (opened: boolean) => void
}

export const Menu = ({
  menuOpened,
  setMenuOpened,
  setCvModalOpen,
}: MenuProps) => {
  const { section, setSection } = useSection()
  const delayedMenuOpen = useDelayedVisibility(menuOpened)
  const previousSectionRef = useRef(section)

  useEffect(() => {
    if (menuOpened && previousSectionRef.current !== section) {
      setMenuOpened(false)
    }

    previousSectionRef.current = section
  }, [menuOpened, section])

  return (
    <>
      <button className="hamburger" onClick={() => setMenuOpened(!menuOpened)}>
        <div
          className={`hamburger__line ${
            menuOpened
              ? "hamburger__line--rotate-45 hamburger__line--highlighted"
              : ""
          }`}
        />

        <div className={`hamburger__line ${menuOpened ? "hidden" : ""}`} />

        <div
          className={`hamburger__line ${
            menuOpened
              ? "hamburger__line--rotate-minus-45 hamburger__line--highlighted"
              : ""
          }`}
        />
      </button>

      <div className={`menu ${menuOpened ? "" : "menu--hidden"}`}>
        <div className="menu__panel">
          {MENU_SECTIONS.map((label, index) => (
            <MenuButton
              key={label}
              label={label}
              onClick={setSection}
              index={index}
              isVisible={delayedMenuOpen}
              isActive={section === index}
            />
          ))}

          <div className="menu__socials">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={socialLinkedIn}
                alt="LinkedIn profile"
                className={`menu__social-icon menu__social-icon--linkedin ${
                  delayedMenuOpen ? "menu__social-icon--visible" : ""
                }`}
              />
            </a>

            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={socialGithub}
                alt="GitHub profile"
                className={`menu__social-icon ${
                  delayedMenuOpen ? "menu__social-icon--visible" : ""
                }`}
              />
            </a>

            <button
              type="button"
              className="menu__cv-button"
              onClick={() => {
                setCvModalOpen(true)
                setMenuOpened(false)
              }}
            >
              <img
                src={cvIcon}
                alt="View CV"
                className={`menu__social-icon menu__social-icon--cv ${
                  delayedMenuOpen ? "menu__social-icon--visible" : ""
                }`}
              />
            </button>
          </div>

          <div
            className={`menu__contacts ${
              delayedMenuOpen ? "menu__contacts--visible" : ""
            }`}
          >
            <a href={`mailto:${PERSONAL_EMAIL}`}>{PERSONAL_EMAIL}</a>

            <a href={`tel:${PERSONAL_PHONE}`}>{PERSONAL_PHONE}</a>
          </div>
        </div>
      </div>
    </>
  )
}
