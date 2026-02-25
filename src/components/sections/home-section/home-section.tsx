import clsx from "clsx"
import { useEffect, useState } from "react"
import { Section } from "components/sections/section"

interface HomeSectionProps {
  currentSection: number
  isReady: boolean
}

export const HomeSection = ({ currentSection, isReady }: HomeSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isReady && currentSection === 0) {
      timer = setTimeout(() => {
        setIsVisible(true)
      }, 1200)
    } else {
      setIsVisible(false)
      setIsLoaded(false)
    }
    return () => clearTimeout(timer)
  }, [currentSection, isReady])

  useEffect(() => {
    if (!isReady) {
      setIsLoaded(false)
      return
    }
    const timeout = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [isReady])

  return (
    <Section id="home-section">
      <div
        className={clsx(
          "home-section",
          isLoaded && "home-section--loaded",
          isVisible && "home-section--visible"
        )}
      >
        <div className="home-main-text">HI I AM_</div>

        <div className="home-submain-text-wrapper">
          <div className="glitch" data-text="ALEX ANACKIS">
            ALEX ANACKIS
          </div>
        </div>

        <div className="home-main-text">I AM_</div>

        <div className="home-submain-text-wrapper">
          <div className="glitch" data-text="WEB DEVELOPER">
            WEB DEVELOPER
          </div>
        </div>
      </div>
    </Section>
  )
}
