export type ProjectsModalTheme = "pink" | "blue"

export interface ProjectData {
  title: string
  thumbnail: string
  description: string
  description_detailed: string
  imgs: string[]
  hashtags: string[]
  link?: string
  linkGitHub?: string
}

export interface ProjectModalPayload {
  project: ProjectData
  theme: ProjectsModalTheme
}

export interface ImgSliderPayload {
  images: string[]
  theme: ProjectsModalTheme
  initialIndex?: number
}
