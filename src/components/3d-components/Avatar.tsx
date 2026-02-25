import * as THREE from "three"
import { useEffect, useMemo, useRef } from "react"
import { useAnimations, useFBX, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useSection } from "contexts/section-context"
import { useUI } from "contexts/ui-context"
import { GroupProps } from "@react-three/fiber"
import { BREAKPOINTS } from "constants/constants"
import { setBodyCursor, setTextSelection } from "utils/dom-utils"
import { AvatarGLTF } from "types/3d-types"

interface AvatarProps extends GroupProps {
  animation: string
  onAvatarClick?: () => void
}

const clampToUnit = (value: number) => THREE.MathUtils.clamp(value, -1, 1)

export function Avatar({ animation, onAvatarClick, ...props }: AvatarProps) {
  const { section } = useSection()
  const { screenWidth } = useUI()
  const group = useRef<THREE.Group>(null!)
  const spineRef = useRef<THREE.Object3D | null>(null)
  const targetRef = useRef(new THREE.Vector3())
  const isHoveredRef = useRef(false)
  const { nodes, materials } = useGLTF("models/avatar.glb") as AvatarGLTF
  const { animations: fallingAnimation } = useFBX("animations/falling.fbx")
  const { animations: helloAnimation } = useFBX("animations/hello.fbx")

  const processedAnimations = useMemo(() => {
    fallingAnimation[0].name = "Falling"
    helloAnimation[0].name = "Hello"
    return [fallingAnimation[0], helloAnimation[0]]
  }, [fallingAnimation, helloAnimation])

  const { actions } = useAnimations(processedAnimations, group)

  useEffect(() => {
    if (group.current && !spineRef.current) {
      spineRef.current = group.current.getObjectByName("Spine2") ?? null
    }
  }, [])

  const shouldAnimate = section === 0 || section === 1

  useFrame((state) => {
    if (!shouldAnimate || !spineRef.current) return

    const target = targetRef.current
    let x = state.mouse.x
    let y = state.mouse.y

    if (screenWidth < BREAKPOINTS.SMALL_MOBILE) {
      if (section === 1) {
        x = -0.18
        y = -0.5
      } else {
        x = 0.3
        y = -0.2
      }
    } else if (screenWidth < BREAKPOINTS.TABLET) {
      x = 0.78
      y = 0.56
    }

    target.set(clampToUnit(x), clampToUnit(y), 1)
    spineRef.current.lookAt(target)
  })

  useEffect(() => {
    const action = actions[animation]
    if (!action) {
      console.warn(`Animation ${animation} is not available`)
      return
    }

    if (section >= 2) {
      action.stop()
      return
    }

    action.reset().fadeIn(0.6).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [actions, animation, section])

  useEffect(() => {
    if (isHoveredRef.current) {
      setBodyCursor(section === 0 ? "pointer" : "auto")
    }
  }, [section])

  const onPointerOver = () => {
    if (section >= 2) return
    isHoveredRef.current = true
    if (section === 0) {
      setBodyCursor("pointer")
    }
  }

  const onPointerOut = () => {
    if (section >= 2) return
    isHoveredRef.current = false
    setBodyCursor("auto")
  }

  const onPointerDown = () => {
    if (section >= 2) return
    setTextSelection(false)
    if (section === 0) {
      onAvatarClick?.()
    }
  }

  const onPointerUp = () => {
    if (section >= 2) return
    setTextSelection(true)
  }

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <mesh visible={false} position-x={0.2} position-y={1.2}>
        <boxGeometry args={[0.9, 1.5, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group name="Armature" rotation-x={-Math.PI / 1.8}>
        <primitive object={nodes.Hips} />

        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />

        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />

        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />

        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />

        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />

        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />

        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />

        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />

        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  )
}

useGLTF.preload("models/avatar.glb")
useFBX.preload("animations/falling.fbx")
useFBX.preload("animations/hello.fbx")
