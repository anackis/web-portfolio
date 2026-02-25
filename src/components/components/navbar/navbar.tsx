import { useEffect, useState } from "react"
import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"
import { BREAKPOINTS } from "constants/constants"
import { NavLinks } from "./parts/nav-links"
import { NavActions } from "./parts/nav-actions"
import logoImg from "assets/icons/logo.webp"

interface NavbarProps {
  menuOpened: boolean
  setConnectModalOpen: (isOpen: boolean) => void
  setCvModalOpen: (isOpen: boolean) => void
  isReady: boolean
}

export const Navbar = ({
  menuOpened,
  setConnectModalOpen,
  setCvModalOpen,
  isReady,
}: NavbarProps) => {
  const { section, setSection } = useSection()
  const { screenWidth } = useUI()
  const [initialAnim, setInitialAnim] = useState(true)
  const isMobile = screenWidth <= BREAKPOINTS.MOBILE

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnim(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const navStateClass = initialAnim
    ? "nav--initial"
    : menuOpened && !isMobile
      ? "nav--hidden"
      : "nav--shown"

  if (!isReady) {
    return null
  }

  return (
    <nav className={`nav ${navStateClass}`}>
      <div className="nav__container">
        <div className="nav__section nav__section--left">
          <div className="nav__logo" onClick={() => setSection(0)}>
            <img className="nav__logo-img" src={logoImg} alt="logo-img" />
          </div>

          <NavLinks activeSection={section} onSectionChange={setSection} />
        </div>

        <div className="nav__section nav__section--right">
          <NavActions
            setConnectModalOpen={setConnectModalOpen}
            setCvModalOpen={setCvModalOpen}
          />
        </div>
      </div>
    </nav>
  )
}
