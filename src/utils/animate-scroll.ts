interface ScrollAnimationOptions {
  element: HTMLElement
  to: number
  duration: number
  onStart?: () => void
  onComplete?: () => void
}

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

export const animateScroll = ({
  element,
  to,
  duration,
  onStart,
  onComplete,
}: ScrollAnimationOptions): (() => void) => {
  const start = element.scrollTop
  const change = to - start
  const startTime = performance.now()
  let animationFrameId: number

  onStart?.()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutCubic(progress)

    element.scrollTop = start + change * easedProgress

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      onComplete?.()
    }
  }

  animationFrameId = requestAnimationFrame(animate)

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}
