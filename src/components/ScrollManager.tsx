import { useRef, useEffect } from "react"
import { useSection } from "contexts/section-context"
import { useScroll } from "@react-three/drei"
import { animateScroll } from "utils/animate-scroll"
import { useUI } from "contexts/ui-context"
import { BREAKPOINTS } from "constants/constants"

const MIN_SWIPE_DISTANCE = 10

export const ScrollManager = () => {
  const { screenWidth } = useUI()
  const { section, setSection } = useSection()
  const data = useScroll()
  const isAnimating = useRef(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartScrollTop = useRef(0)
  const isTrackingTouch = useRef(false)
  const scrollCooldownRef = useRef(false)
  const sectionRef = useRef(section)
  const dataPagesRef = useRef(data.pages)
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const isMobile = screenWidth < BREAKPOINTS.MOBILE
  const isMobileTouch = isMobile && isTouchDevice

  useEffect(() => {
    sectionRef.current = section
  }, [section])

  useEffect(() => {
    dataPagesRef.current = data.pages
  }, [data.pages])

  if (data.fill) {
    data.fill.classList.add("scroll-fix")
  }

  const isTouchOnScrollSurface = (target: EventTarget | null) => {
    if (!(target instanceof Node)) {
      return false
    }

    const navElement = document.querySelector(".nav")

    return (
      (data.el?.contains(target) ?? false) ||
      (navElement?.contains(target) ?? false)
    )
  }

  useEffect(() => {
    const cancel = animateScroll({
      element: data.el,
      to: section * window.innerHeight,
      duration: 1400,
      onStart: () => {
        isAnimating.current = true
        data.el.style.overflow = "hidden"
      },
      onComplete: () => {
        isAnimating.current = false
        data.el.style.overflow = "auto"
      },
    })

    return cancel
  }, [section, data.el])

  useEffect(() => {
    if (!data.el) {
      return undefined
    }

    const handleScroll = () => {
      if (isAnimating.current || scrollCooldownRef.current) {
        return
      }

      const scrollPosition = data.el.scrollTop
      const viewportHeight = window.innerHeight
      const calculatedSection = Math.round(scrollPosition / viewportHeight)
      const clampedSection = Math.max(
        0,
        Math.min(dataPagesRef.current - 1, calculatedSection),
      )

      if (clampedSection !== sectionRef.current) {
        setSection(clampedSection)
      }
    }

    data.el.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      data.el.removeEventListener("scroll", handleScroll)
    }
  }, [data.el])

  useEffect(() => {
    if (!data.el) {
      return undefined
    }

    let cooldownTimeout: ReturnType<typeof setTimeout> | null = null

    const startCooldown = (duration: number) => {
      scrollCooldownRef.current = true
      if (cooldownTimeout) {
        clearTimeout(cooldownTimeout)
      }
      cooldownTimeout = setTimeout(() => {
        scrollCooldownRef.current = false
      }, duration)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isTouchOnScrollSurface(e.target)) {
        return
      }

      const scrollableElement =
        e.target instanceof Element
          ? e.target.closest(".scrollable-text")
          : null

      isTrackingTouch.current = true
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      touchStartScrollTop.current =
        scrollableElement instanceof HTMLElement
          ? scrollableElement.scrollTop
          : 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTrackingTouch.current) {
        isTrackingTouch.current = false
        return
      }

      isTrackingTouch.current = false

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = Math.abs(touchEndX - touchStartX.current)
      const deltaY = Math.abs(touchEndY - touchStartY.current)
      const touchDifference = touchStartY.current - touchEndY
      const scrollableElement =
        e.target instanceof Element
          ? e.target.closest(".scrollable-text")
          : null

      if (deltaX < MIN_SWIPE_DISTANCE && deltaY < MIN_SWIPE_DISTANCE) {
        return
      }

      if (deltaX > deltaY) {
        return
      }

      if (
        !isAnimating.current &&
        !scrollCooldownRef.current &&
        Math.abs(touchDifference) > MIN_SWIPE_DISTANCE
      ) {
        let shouldChangeSection = false

        if (scrollableElement instanceof HTMLElement) {
          const scrollTop = scrollableElement.scrollTop
          const scrollHeight = scrollableElement.scrollHeight
          const clientHeight = scrollableElement.clientHeight
          const threshold = 2
          const isAtTop = scrollTop <= threshold
          const isAtBottom =
            scrollTop + clientHeight >= scrollHeight - threshold
          const scrolledUp = scrollTop < touchStartScrollTop.current - threshold
          const scrolledDown =
            scrollTop > touchStartScrollTop.current + threshold

          if (touchDifference > 0 && isAtBottom && !scrolledUp) {
            shouldChangeSection = sectionRef.current < dataPagesRef.current - 1
          } else if (touchDifference < 0 && isAtTop && !scrolledDown) {
            shouldChangeSection = sectionRef.current > 0
          }
        } else {
          shouldChangeSection = true
        }

        if (shouldChangeSection) {
          if (
            touchDifference > 0 &&
            sectionRef.current < dataPagesRef.current - 1
          ) {
            startCooldown(200)
            setSection((prev) => Math.min(dataPagesRef.current - 1, prev + 1))
          } else if (touchDifference < 0 && sectionRef.current > 0) {
            startCooldown(200)
            setSection((prev) => Math.max(0, prev - 1))
          }
        }
      }
    }

    const handleWheelScroll = (e: WheelEvent) => {
      const scrollableElement =
        e.target instanceof Element
          ? e.target.closest(".scrollable-text")
          : null

      if (scrollableElement instanceof HTMLElement) {
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight
        const threshold = 2
        const isAtTop = scrollTop <= threshold
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold
        const scrollingUp = e.deltaY < 0
        const scrollingDown = e.deltaY > 0

        if (scrollHeight > clientHeight) {
          if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
            e.preventDefault()
            if (!isAnimating.current && !scrollCooldownRef.current) {
              if (scrollingUp && sectionRef.current > 0) {
                startCooldown(2100)
                setSection((prev) => Math.max(0, prev - 1))
              } else if (
                scrollingDown &&
                sectionRef.current < dataPagesRef.current - 1
              ) {
                startCooldown(2100)
                setSection((prev) =>
                  Math.min(dataPagesRef.current - 1, prev + 1),
                )
              }
            }
          }
          return
        }
      }

      e.preventDefault()
      if (!isAnimating.current && !scrollCooldownRef.current) {
        if (e.deltaY < 0 && sectionRef.current > 0) {
          startCooldown(2100)
          setSection((prev) => Math.max(0, prev - 1))
        } else if (
          e.deltaY > 0 &&
          sectionRef.current < dataPagesRef.current - 1
        ) {
          startCooldown(2100)
          setSection((prev) => Math.min(dataPagesRef.current - 1, prev + 1))
        }
      }
    }

    if (isMobileTouch) {
      window.addEventListener("touchstart", handleTouchStart)
      window.addEventListener("touchend", handleTouchEnd)
    } else {
      data.el.addEventListener("wheel", handleWheelScroll, { passive: false })
    }

    return () => {
      if (isMobileTouch) {
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchend", handleTouchEnd)
      } else {
        data.el.removeEventListener("wheel", handleWheelScroll)
      }
      if (cooldownTimeout) {
        clearTimeout(cooldownTimeout)
      }
    }
  }, [data.el, isMobileTouch])

  return null
}
