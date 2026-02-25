import { memo } from "react"

interface MenuButtonProps {
  label: string
  onClick: (index: number) => void
  index: number
  isVisible: boolean
  isActive: boolean
}

export const MenuButton = memo(
  ({ label, onClick, index, isVisible, isActive }: MenuButtonProps) => {
    return (
      <button
        onClick={() => onClick(index)}
        className={`menu__link menu__neon-text ${
          isVisible ? "menu__link--visible" : ""
        } ${isActive ? "active" : ""}`}
      >
        {label}
      </button>
    )
  },
)
