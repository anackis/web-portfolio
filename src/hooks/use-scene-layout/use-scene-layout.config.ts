import { BREAKPOINTS } from "constants/constants"
import {
  EarthLayout,
  IconsLayout,
  PositionScale,
  ResponsiveRule,
  SectionVariant,
  SingleVariantRule,
} from "../../types/use-scene-layout.types"

export const pickVariant = (section: number): SectionVariant =>
  section === 0 ? "home" : "other"

export const applyVariantRules = <T extends Record<string, unknown>>(
  base: Record<SectionVariant, T>,
  rules: ResponsiveRule<T>[],
  screenWidth: number,
  variant: SectionVariant,
) => {
  const result: T = { ...base[variant] }

  for (const rule of rules) {
    if (
      (rule.minWidth !== undefined && screenWidth < rule.minWidth) ||
      (rule.maxWidth !== undefined && screenWidth >= rule.maxWidth)
    )
      continue

    const override = rule.overrides[variant]
    if (override) Object.assign(result, override)
  }

  return result
}

export const applySingleRules = <T extends Record<string, unknown>>(
  base: T,
  rules: SingleVariantRule<T>[],
  screenWidth: number,
) => {
  const result: T = { ...base }

  for (const rule of rules) {
    if (
      (rule.minWidth !== undefined && screenWidth < rule.minWidth) ||
      (rule.maxWidth !== undefined && screenWidth >= rule.maxWidth)
    )
      continue

    Object.assign(result, rule.overrides)
  }

  return result
}

export const AVATAR_BASE: Record<SectionVariant, PositionScale> = {
  home: { posX: 0.2, posY: -0.1, posZ: -0.5, scale: 1 },
  other: { posX: 0.2, posY: 0.3, posZ: -0.5, scale: 0.55 },
}

export const AVATAR_RULES: ResponsiveRule<PositionScale>[] = [
  { maxWidth: BREAKPOINTS.MD, overrides: { home: { posX: -0.5 } } },
  {
    maxWidth: BREAKPOINTS.MOBILE,
    overrides: { home: { posX: -0.5 }, other: { posX: -0.2 } },
  },
  {
    maxWidth: BREAKPOINTS.SMALL_MOBILE,
    overrides: {
      home: { posX: -1.1, posY: -0.8, posZ: -0.2, scale: 0.8 },
      other: { posX: -1, posY: -1.7, posZ: -0.2, scale: 0.8 },
    },
  },
  {
    maxWidth: BREAKPOINTS.TINY,
    overrides: { home: { posY: -0.6 }, other: { posY: -1.5 } },
  },
  { minWidth: 1500, overrides: { home: { posX: 0 }, other: { posX: 0 } } },
]

const ROOM_SHARED = { posX: 0.2, posY: 0.3, posZ: -0.5, scale: 1.2 }

export const ROOM_BASE: Record<SectionVariant, PositionScale> = {
  home: ROOM_SHARED,
  other: ROOM_SHARED,
}

export const ROOM_RULES: ResponsiveRule<PositionScale>[] = [
  { maxWidth: BREAKPOINTS.MOBILE, overrides: { other: { posX: 0 } } },
  {
    maxWidth: BREAKPOINTS.SMALL_MOBILE,
    overrides: { other: { posX: -1, posY: -1.7, posZ: -0.5, scale: 2.1 } },
  },
]

export const ICONS_BASE_POSITIONS: [number, number, number][] = [
  [0.1, 0.8, 0],
  [1, 0.8, 0],
  [1.9, 0.8, 0],
  [0.1, -0.1, 0.1],
  [1, -0.1, 0.1],
  [1.92, -0.1, 0.1],
  [0.1, -0.95, 0.3],
  [1.02, -0.95, 0.3],
  [1.95, -0.95, 0.3],
]

export const ICONS_MOBILE_POSITIONS: [number, number, number][] = [
  [-0.5, 1.2, 0],
  [0.5, 1.2, 0],
  [1.5, 1.2, 0],
  [2.5, 1.2, 0],
  [-1, 2.1, 0],
  [0, 2.1, 0],
  [1, 2.1, 0],
  [2, 2.1, 0],
  [3, 2.1, 0],
]

export const ICONS_SMALL_MOBILE_POSITIONS: [number, number, number][] = [
  [-1, 2.4, 0],
  [0, 2.4, 0],
  [1, 2.4, 0],
  [2, 2.4, 0],
  [-0.5, 3.35, 0],
  [0.5, 3.35, 0],
  [1.5, 3.35, 0],
  [2.5, 3.35, 0],
  [3, 2.4, 0],
]

export const ICONS_TINY_POSITIONS: [number, number, number][] = [
  [-0.5, 2.3, 0],
  [0.3, 2.3, 0],
  [1.1, 2.3, 0],
  [1.9, 2.3, 0],
  [-0.3, 3.25, 0],
  [0.5, 3.25, 0],
  [1.3, 3.25, 0],
  [2.1, 3.25, 0],
  [2.7, 2.3, 0],
]

const ICONS_SHARED = { posX: 0.4, scale: 0.9, positions: ICONS_BASE_POSITIONS }

export const ICONS_BASE: Record<SectionVariant, IconsLayout> = {
  home: ICONS_SHARED,
  other: ICONS_SHARED,
}

const ICONS_SHARED_OVERRIDE = { scale: 0.8 }
const ICONS_TABLET_OVERRIDE = { posX: 0.7, scale: 0.55 }
const ICONS_MOBILE_OVERRIDE = {
  posX: -0.5,
  scale: 0.5,
  positions: ICONS_MOBILE_POSITIONS,
}
const ICONS_TINY_OVERRIDE = { positions: ICONS_TINY_POSITIONS }

export const ICONS_RULES: ResponsiveRule<IconsLayout>[] = [
  {
    maxWidth: BREAKPOINTS.LG,
    overrides: { home: ICONS_SHARED_OVERRIDE, other: ICONS_SHARED_OVERRIDE },
  },
  {
    maxWidth: BREAKPOINTS.TABLET,
    overrides: {
      home: ICONS_TABLET_OVERRIDE,
      other: ICONS_TABLET_OVERRIDE,
    },
  },
  {
    maxWidth: BREAKPOINTS.MOBILE,
    overrides: {
      home: ICONS_MOBILE_OVERRIDE,
      other: ICONS_MOBILE_OVERRIDE,
    },
  },
  {
    maxWidth: BREAKPOINTS.SMALL_MOBILE,
    overrides: {
      other: {
        posX: -0.4,
        scale: 0.35,
        positions: ICONS_SMALL_MOBILE_POSITIONS,
      },
    },
  },
  {
    maxWidth: BREAKPOINTS.TINY,
    overrides: {
      home: ICONS_TINY_OVERRIDE,
      other: ICONS_TINY_OVERRIDE,
    },
  },
]

export const EARTH_RULES: SingleVariantRule<EarthLayout>[] = [
  {
    maxWidth: BREAKPOINTS.MOBILE,
    overrides: { posX: -2.8, posY: 1.5, scale: 0.6 },
  },
  {
    maxWidth: BREAKPOINTS.SMALL_MOBILE,
    overrides: { posX: -3.55, posY: 2.1, scale: 0.5 },
  },
]
