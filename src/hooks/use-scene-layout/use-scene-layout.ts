import { ROTATION, BREAKPOINTS } from "constants/constants"
import {
  applySingleRules,
  applyVariantRules,
  AVATAR_BASE,
  AVATAR_RULES,
  EARTH_RULES,
  ICONS_BASE,
  ICONS_RULES,
  ROOM_BASE,
  ROOM_RULES,
  pickVariant,
} from "./use-scene-layout.config"
import { EarthLayout } from "../../types/use-scene-layout.types"

const getAvatarProps = (screenWidth: number, section: number) => {
  const variant = pickVariant(section)
  const layout = applyVariantRules(
    AVATAR_BASE,
    AVATAR_RULES,
    screenWidth,
    variant,
  )

  return {
    avatarPosX: layout.posX,
    avatarPosY: layout.posY,
    avatarPosZ: layout.posZ,
    avatarScale: layout.scale,
  }
}

const getRoomProps = (screenWidth: number, section: number) => {
  const variant = pickVariant(section)
  const layout = applyVariantRules(ROOM_BASE, ROOM_RULES, screenWidth, variant)

  return {
    roomPosX: layout.posX,
    roomPosY: layout.posY,
    roomPosZ: layout.posZ,
    roomScale: layout.scale,
  }
}

const getIconsProps = (screenWidth: number, section: number) => {
  const variant = pickVariant(section)
  const layout = applyVariantRules(
    ICONS_BASE,
    ICONS_RULES,
    screenWidth,
    variant,
  )

  return {
    jsIconsPosX: layout.posX,
    jsIconsScale: layout.scale,
    jsIconsPositions: layout.positions,
  }
}

const getEarthProps = (screenWidth: number) => {
  const base: EarthLayout = {
    posX: 0,
    posY: 0,
    scale: 0.8,
    positionX: screenWidth < BREAKPOINTS.XL ? 1.8 : 1.5,
  }

  const layout = applySingleRules(base, EARTH_RULES, screenWidth)

  return {
    earthPosX: layout.posX,
    earthPosY: layout.posY,
    earthScale: layout.scale,
    earthPositionX: layout.positionX,
  }
}

export const useSceneLayout = (screenWidth: number, section: number) => {
  const motionGroupRotation =
    screenWidth < BREAKPOINTS.MOBILE ? ROTATION.MOBILE : ROTATION.DEFAULT

  const avatarLayout = getAvatarProps(screenWidth, section)
  const roomLayout = getRoomProps(screenWidth, section)
  const jsIconsLayout = getIconsProps(screenWidth, section)
  const earthLayout = getEarthProps(screenWidth)

  return {
    motionGroupRotation,
    ...avatarLayout,
    ...roomLayout,
    ...jsIconsLayout,
    ...earthLayout,
  }
}
