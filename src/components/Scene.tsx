import { useState } from "react"
import { Avatar } from "components/3d-components/Avatar"
import { Room } from "components/3d-components/Room"
import { motion } from "framer-motion-3d"
import { Environment } from "@react-three/drei"
import { useMotionValue } from "framer-motion"

import { JsIconCube } from "components/3d-components/Prisms"
import { EarthModel } from "components/3d-components/EarthModel"

import ReactIcon from "assets/icons/react.webp"
import GitIcon from "assets/icons/git.webp"
import TsIcon from "assets/icons/ts.webp"
import AngularIcon from "assets/icons/angular.webp"
import NestJsIcon from "assets/icons/nestjs.webp"
import RxJsIcon from "assets/icons/rxjs.webp"
import MySqlIcon from "assets/icons/mysql.webp"
import ApiIcon from "assets/icons/api.webp"
import KuberIcon from "assets/icons/pytest.webp"

import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"

import { useCameraAnimation } from "hooks/use-camera-animation"
import { useSceneLayout } from "hooks/use-scene-layout/use-scene-layout"

interface SceneProps {
  menuOpened: boolean
  isReady: boolean
}

const IMAGES = [
  TsIcon,
  ReactIcon,
  AngularIcon,
  ApiIcon,
  NestJsIcon,
  RxJsIcon,
  GitIcon,
  MySqlIcon,
  KuberIcon,
]

export const Scene = ({ menuOpened, isReady }: SceneProps): JSX.Element => {
  const [isAnimating, setIsAnimating] = useState(false)
  const cameraPositionX = useMotionValue(0)
  const cameraLookAtX = useMotionValue(0)
  const { section } = useSection()
  const { screenWidth } = useUI()

  const showRoom = section === 1 || section === 2

  const handleAvatarClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  useCameraAnimation({ cameraPositionX, cameraLookAtX, menuOpened })

  const {
    avatarPosX,
    avatarPosY,
    avatarPosZ,
    avatarScale,
    roomPosX,
    roomPosY,
    roomPosZ,
    roomScale,
    jsIconsPosX,
    jsIconsScale,
    jsIconsPositions,
    earthPosX,
    earthPosY,
    earthScale,
    earthPositionX,
    motionGroupRotation,
  } = useSceneLayout(screenWidth, section)

  return (
    <>
      <motion.group
        frustumCulled={section !== 0}
        rotation={motionGroupRotation}
        initial={{ y: -3, x: 8, z: 0 }}
        animate={
          isReady
            ? {
                y: section === 0 ? -1.1 : -0.9,
                x: section >= 2 ? 18 : 1,
                z: isAnimating ? -0.7 : 0,
              }
            : { y: -3, x: 8, z: 0 }
        }
        transition={{
          y: { duration: 2, ease: "easeOut" },
          x: { duration: 2, ease: "easeOut" },
          z: {
            type: "spring",
            stiffness: 150,
            damping: 8,
            mass: 0.8,
            restDelta: 0.001,
          },
        }}
        position-y={-2}
        position-x={5}
      >
        <Avatar
          rotation={section === 0 ? [0, 0, 0] : [0.2, 0, 0]}
          animation={section === 0 ? "Falling" : "Hello"}
          position-x={avatarPosX}
          position-y={avatarPosY}
          position-z={avatarPosZ}
          scale={avatarScale}
          onAvatarClick={handleAvatarClick}
        />

        {showRoom && (
          <Room
            rotation={[0.1, 0.7, 0]}
            position-x={roomPosX}
            position-y={roomPosY}
            position-z={roomPosZ}
            scale={roomScale}
          />
        )}
      </motion.group>

      <motion.group
        frustumCulled
        animate={{
          y: section === 2 || section === 3 ? 0 : -10,
          x:
            section === 3
              ? 18
              : section === 1 || section === 2
                ? jsIconsPosX
                : 0,
        }}
        transition={{ x: { duration: 3 }, y: { duration: 2 } }}
        position-y={-10}
        scale={jsIconsScale}
      >
        {jsIconsPositions.map((position, index) => (
          <JsIconCube
            key={index}
            position={position}
            img={IMAGES[index]}
            modelPath="/models/prism.glb"
          />
        ))}
      </motion.group>

      <motion.group
        frustumCulled
        animate={{
          x: section === 4 ? earthPositionX : 18,
        }}
        transition={{ x: { duration: 2.5 } }}
        position-x={18}
        scale={earthScale}
      >
        <EarthModel position={[earthPosX, earthPosY, 0]} />
      </motion.group>

      <Environment preset="sunset" />
    </>
  )
}
