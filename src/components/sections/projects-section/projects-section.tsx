import clsx from "clsx"
import { Section } from "components/sections/section"
import { ProjectModalPayload } from "types/projects"
import { TabComponent } from "./parts/tab-component/tab-component"

interface ProjectsSectionProps {
  openProjectModal: (payload: ProjectModalPayload) => void
  currentSection: number
}

export const ProjectsSection = ({
  openProjectModal,
  currentSection,
}: ProjectsSectionProps) => {
  const isVisible = currentSection === 3

  return (
    <Section id="projects-section">
      <div
        className={clsx(
          "projects-section",
          isVisible ? "projects-section--visible" : "projects-section--hidden",
        )}
      >
        <TabComponent openProjectModal={openProjectModal} />
      </div>
    </Section>
  )
}
