import { useEffect, useRef } from "react"
import { RootState, useFrame } from "@react-three/fiber"
import { MotionValue, animate } from "framer-motion"
import { framerMotionConfig } from "constants/config"

interface UseCameraAnimationProps {
  cameraPositionX: MotionValue<number>
  cameraLookAtX: MotionValue<number>
  menuOpened: boolean
}

export function useCameraAnimation({
  cameraPositionX,
  cameraLookAtX,
  menuOpened,
}: UseCameraAnimationProps) {
  const lastPosX = useRef(0)
  const lastLookAtX = useRef(0)

  useEffect(() => {
    const controls = animate(cameraPositionX, menuOpened ? -3 : 0, {
      ...framerMotionConfig,
    })
    const controlsLookAt = animate(cameraLookAtX, 0, {
      ...framerMotionConfig,
    })

    return () => {
      controls.stop()
      controlsLookAt.stop()
    }
  }, [menuOpened, cameraPositionX, cameraLookAtX])

  useFrame((state: RootState) => {
    const posX = cameraPositionX.get()
    const lookAtX = cameraLookAtX.get()

    if (
      Math.abs(posX - lastPosX.current) > 0.001 ||
      Math.abs(lookAtX - lastLookAtX.current) > 0.001
    ) {
      state.camera.position.x = posX
      state.camera.lookAt(lookAtX, 0, 0)
      lastPosX.current = posX
      lastLookAtX.current = lookAtX
    }
  })
}
