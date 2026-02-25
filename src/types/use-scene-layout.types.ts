export type SectionVariant = "home" | "other"

export type ResponsiveRule<T> = {
  maxWidth?: number
  minWidth?: number
  overrides: Partial<Record<SectionVariant, Partial<T>>>
}

export type SingleVariantRule<T> = {
  maxWidth?: number
  minWidth?: number
  overrides: Partial<T>
}

export type PositionScale = {
  posX: number
  posY: number
  posZ: number
  scale: number
}

export type IconsLayout = {
  posX: number
  scale: number
  positions: [number, number, number][]
}

export type EarthLayout = {
  posX: number
  posY: number
  scale: number
  positionX: number
}
