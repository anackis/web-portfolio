import * as THREE from "three"
import { GLTF } from "three-stdlib"

export type AvatarGLTF = GLTF & {
  nodes: {
    Hips: THREE.Object3D
    Wolf3D_Body: THREE.SkinnedMesh
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
    Wolf3D_Outfit_Top: THREE.SkinnedMesh
    Wolf3D_Hair: THREE.SkinnedMesh
    EyeLeft: THREE.SkinnedMesh
    EyeRight: THREE.SkinnedMesh
    Wolf3D_Head: THREE.SkinnedMesh
    Wolf3D_Teeth: THREE.SkinnedMesh
  }
  materials: {
    Wolf3D_Body: THREE.Material
    Wolf3D_Outfit_Bottom: THREE.Material
    Wolf3D_Outfit_Footwear: THREE.Material
    Wolf3D_Outfit_Top: THREE.Material
    Wolf3D_Hair: THREE.Material
    Wolf3D_Eye: THREE.Material
    Wolf3D_Skin: THREE.Material
    Wolf3D_Teeth: THREE.Material
  }
}

export type RoomGLTF = GLTF & {
  nodes: {
    Box010001_Color_0: THREE.Mesh
    Box010001_mirror_0: THREE.Mesh
    Box010001_metal_0: THREE.Mesh
    Box010001_metal001_0: THREE.Mesh
    Box010001_emission_window_0: THREE.Mesh
    Box010001_emission_lamp_0: THREE.Mesh
    Box010001_glass_0: THREE.Mesh
  }
  materials: {
    Color: THREE.Material
    mirror: THREE.Material
    metal: THREE.Material
    "metal.001": THREE.Material
    emission_window: THREE.Material
    emission_lamp: THREE.Material
    glass: THREE.Material
  }
}

export type PrismGLTF = GLTF & {
  scene: THREE.Group
}
