import { aboutContentBlocks } from "./text"
import { ContentBlocksSection } from "components/reusable-parts/content-blocks-section/content-blocks-section"

interface AboutSectionProps {
  currentSection: number
}

export const AboutSection = ({ currentSection }: AboutSectionProps) => {
  return (
    <ContentBlocksSection
      sectionId="about__section"
      title="About me"
      currentSection={currentSection}
      sectionIndex={1}
      contentBlocks={aboutContentBlocks}
      wrapperClassName="about-section"
      bubbleClassName="about-section__bubble"
      blockClassName="about-section__block"
    />
  )
}
