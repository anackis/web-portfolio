import { HomeSection } from "components/sections/home-section/home-section"
import { AboutSection } from "components/sections/about-section/about-section"
import { SkillsSection } from "components/sections/skills-section/skills-section"
import { ProjectsSection } from "components/sections/projects-section/projects-section"
import { ContactSection } from "components/sections/contact-section/contact-section"
import { ProjectModalPayload } from "types/projects"

interface InterfaceProps {
  currentSection: number
  isReady: boolean
  openProjectModal: (payload: ProjectModalPayload) => void
  openCvModal: () => void
}

export function Interface({
  currentSection,
  isReady,
  openProjectModal,
  openCvModal,
}: InterfaceProps) {
  return (
    <div className="interface-container">
      <HomeSection currentSection={currentSection} isReady={isReady} />

      <AboutSection currentSection={currentSection} />

      <SkillsSection currentSection={currentSection} />

      <ProjectsSection
        currentSection={currentSection}
        openProjectModal={openProjectModal}
      />

      <ContactSection
        currentSection={currentSection}
        openCvModal={openCvModal}
      />
    </div>
  )
}
