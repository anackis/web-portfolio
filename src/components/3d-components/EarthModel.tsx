import { useRef, useState } from "react"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"
import { BREAKPOINTS } from "constants/constants"
import { setBodyCursor, setTextSelection } from "utils/dom-utils"

interface EarthModelProps {
  position: [number, number, number]
}

const DRAG_SENSITIVITY = 0.015
const ROTATION_SPEED = Math.PI * 0.1

export function EarthModel({ position }: EarthModelProps) {
  const { scene } = useGLTF("models/earth.glb")
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const rotationXRef = useRef(0)
  const rotationYRef = useRef(0)
  const { section } = useSection()
  const { screenWidth } = useUI()

  const isInteractive = screenWidth >= BREAKPOINTS.LG

  const onPointerOver = () => {
    if (isInteractive) {
      setBodyCursor("grab")
    }
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (isInteractive) {
      setIsDragging(true)
      setStartX(event.clientX)
      setStartY(event.clientY)
      setTextSelection(false)
      setBodyCursor("grabbing")
    }
  }

  const onPointerUp = () => {
    if (isInteractive) {
      setIsDragging(false)
      setTextSelection(true)
      setBodyCursor("grab")
    }
  }

  const onPointerLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setTextSelection(true)
    }
    setBodyCursor("auto")
  }

  const onPointerOut = () => {
    if (!isDragging) {
      setBodyCursor("auto")
    }
  }

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !isInteractive || event.buttons !== 1) return

    const dx = (event.clientX - startX) * DRAG_SENSITIVITY
    const dy = (event.clientY - startY) * DRAG_SENSITIVITY

    rotationXRef.current += dy
    rotationYRef.current += dx

    setStartX(event.clientX)
    setStartY(event.clientY)
  }

  useFrame((_, delta) => {
    if (section !== 4 || !groupRef.current) return

    if (!isDragging) {
      groupRef.current.rotation.y += ROTATION_SPEED * delta
    } else {
      groupRef.current.rotation.x = rotationXRef.current
      groupRef.current.rotation.y = rotationYRef.current
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
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <primitive object={scene} />
    </group>
  )
}
