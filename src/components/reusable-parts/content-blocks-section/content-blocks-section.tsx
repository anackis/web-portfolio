import clsx from "clsx"
import { Section } from "components/sections/section"
import { SectionWrapper } from "components/reusable-parts/section-wrapper/section-wrapper"

export type ContentBlock = {
  title: string
  text: string
}

export type VisibilityClassNames = {
  visible: string
  hidden: string
}

export type ContentBlocksSectionProps = {
  sectionId: string
  title: string
  currentSection: number
  sectionIndex: number
  contentBlocks: ContentBlock[]
  wrapperClassName?: string
  visibilityClassNames?: VisibilityClassNames
  bubbleClassName?: string
  blockClassName?: string
}

export const ContentBlocksSection = ({
  sectionId,
  title,
  currentSection,
  sectionIndex,
  contentBlocks,
  wrapperClassName,
  visibilityClassNames,
  bubbleClassName,
  blockClassName,
}: ContentBlocksSectionProps) => {
  const isVisible = currentSection === sectionIndex
  const baseVisibilityClass = isVisible
    ? "content-blocks-section--visible"
    : "content-blocks-section--hidden"
  const visibilityClassName = visibilityClassNames
    ? isVisible
      ? visibilityClassNames.visible
      : visibilityClassNames.hidden
    : undefined

  return (
    <Section id={sectionId}>
      <SectionWrapper
        title={title}
        className={clsx(
          "content-blocks-section",
          baseVisibilityClass,
          wrapperClassName,
          visibilityClassName
        )}
      >
        <div
          className={clsx(
            "bubble_wrap",
            "content-blocks-section__bubble",
            bubbleClassName
          )}
        >
          <div className="fz-text scrollable-text">
            {contentBlocks.map((block) => (
              <div
                key={block.title}
                className={clsx(
                  "content-blocks-section__block",
                  blockClassName
                )}
              >
                <span className="content-blocks-section__block-title">
                  {block.title}
                </span>
                <span className="content-blocks-section__block-text">
                  {block.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </Section>
  )
}
