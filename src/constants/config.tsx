import { ValueAnimationTransition } from "framer-motion"

export const framerMotionConfig: ValueAnimationTransition<number> = {
  type: "spring" as "spring",
  mass: 10,
  stiffness: 500,
  damping: 50,
  restDelta: 0.0001,
}
