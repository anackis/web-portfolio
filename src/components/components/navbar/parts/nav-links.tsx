interface NavLinksProps {
  activeSection: number
  onSectionChange: (section: number) => void
}

const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Contacts"] as const

export const NavLinks = ({ activeSection, onSectionChange }: NavLinksProps) => {
  return (
    <div className="nav__links">
      {NAV_ITEMS.map((label, index) => (
        <div
          key={index}
          className={
            activeSection === index
              ? "nav__link nav__link--active"
              : "nav__link"
          }
          onClick={() => onSectionChange(index)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
