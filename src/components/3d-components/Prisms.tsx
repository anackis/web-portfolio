import { useState, useRef, useMemo } from "react"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { MathUtils } from "three"
import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"
import { setBodyCursor, setTextSelection } from "utils/dom-utils"
import { PrismGLTF } from "types/3d-types"

const DRAG_SENSITIVITY = 0.03
const ROTATION_SPEED = Math.PI * 0.25
const LERP_FACTOR = 0.05
const MIN_SCREEN_WIDTH = 1000

interface JsIconCubeProps {
  img: string
  modelPath: string
  position: [number, number, number]
}

export function JsIconCube({ img, modelPath, position }: JsIconCubeProps) {
  const gltf = useGLTF(modelPath) as PrismGLTF
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene])
  const texture = useTexture(img)
  const groupRef = useRef<THREE.Group>(null!)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const rotationXRef = useRef(0)
  const rotationYRef = useRef(0)
  const defaultRotationYRef = useRef(0)
  const { section } = useSection()
  const { screenWidth } = useUI()

  const isInteractive = screenWidth >= MIN_SCREEN_WIDTH

  const onPointerOver = () => {
    if (isInteractive) {
      setBodyCursor("grab")
    }
  }

  const onPointerOut = () => {
    if (!isDown) {
      setBodyCursor("auto")
    }
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (isInteractive) {
      setIsDown(true)
      setStartX(event.clientX)
      setStartY(event.clientY)
      setTextSelection(false)
      setBodyCursor("grabbing")
    }
  }

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDown || !isInteractive || event.buttons !== 1) return

    const dx = (event.clientX - startX) * DRAG_SENSITIVITY
    const dy = (event.clientY - startY) * DRAG_SENSITIVITY
    rotationXRef.current += dx
    rotationYRef.current += dy
    groupRef.current.rotation.y = rotationXRef.current
    groupRef.current.rotation.x = rotationYRef.current
    setStartX(event.clientX)
    setStartY(event.clientY)
  }

  const onPointerUp = () => {
    if (isInteractive) {
      setIsDown(false)
      setTextSelection(true)
      setBodyCursor("grab")
    }
  }

  const onPointerLeave = () => {
    if (isDown) {
      setIsDown(false)
      setTextSelection(true)
    }
    setBodyCursor("auto")
  }

  useFrame((_, delta) => {
    if (!groupRef.current || section !== 2) return

    if (!isDown) {
      defaultRotationYRef.current += ROTATION_SPEED * delta
      groupRef.current.rotation.y = defaultRotationYRef.current
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        0,
        LERP_FACTOR,
      )
    } else {
      groupRef.current.rotation.x = rotationYRef.current
      groupRef.current.rotation.y = rotationXRef.current
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <mesh visible={false}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <primitive
        object={scene}
        position={[0, -0.35, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.4, 0.4, 0.4]}
      />

      <mesh position={[0, 0, 0]} scale={[0.4, 0.4, 0.4]}>
        <planeGeometry args={[0.7, 0.7]} />

        <meshBasicMaterial map={texture} />
      </mesh>

      <mesh
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        scale={[0.4, 0.4, 0.4]}
      >
        <planeGeometry args={[0.7, 0.7]} />

        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  )
}
