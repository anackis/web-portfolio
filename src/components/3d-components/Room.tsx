import { useGLTF } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { RoomGLTF } from "types/3d-types"

const ROTATION_X = -Math.PI / 2
const SCALE = 0.1

export function Room({ ...props }: GroupProps) {
  const { nodes, materials } = useGLTF("models/room.glb") as RoomGLTF

  return (
    <group {...props}>
      <group rotation={[ROTATION_X, 0, 0]} scale={SCALE}>
        <mesh
          geometry={nodes.Box010001_Color_0.geometry}
          material={materials.Color}
        />
        <mesh
          geometry={nodes.Box010001_mirror_0.geometry}
          material={materials.mirror}
        />
        <mesh
          geometry={nodes.Box010001_metal_0.geometry}
          material={materials.metal}
        />
        <mesh
          geometry={nodes.Box010001_metal001_0.geometry}
          material={materials["metal.001"]}
        />
        <mesh
          geometry={nodes.Box010001_emission_window_0.geometry}
          material={materials.emission_window}
        />
        <mesh
          geometry={nodes.Box010001_emission_lamp_0.geometry}
          material={materials.emission_lamp}
        />
        <mesh
          geometry={nodes.Box010001_glass_0.geometry}
          material={materials.glass}
        />
      </group>
    </group>
  )
}

useGLTF.preload("models/room.glb")
