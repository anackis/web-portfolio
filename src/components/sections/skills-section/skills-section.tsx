import { skillsContentBlocks } from "constants/skills-data"
import { ContentBlocksSection } from "components/reusable-parts/content-blocks-section/content-blocks-section"

interface SkillsSectionProps {
  currentSection: number
}

export const SkillsSection = ({ currentSection }: SkillsSectionProps) => {
  return (
    <ContentBlocksSection
      sectionId="skills__section"
      title="Skills"
      currentSection={currentSection}
      sectionIndex={2}
      contentBlocks={skillsContentBlocks}
      wrapperClassName="skills-section"
      bubbleClassName="skills-section__bubble"
      blockClassName="skills-section__block"
    />
  )
}
