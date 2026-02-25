import clsx from "clsx"
import { useMemo, useState } from "react"
import Slider, { Settings } from "react-slick"
import { BREAKPOINTS } from "constants/constants"
import { ProjectCard } from "../project-card/project-card"
import { projects1, projects2 } from "constants/projects-data"
import { ProjectData, ProjectModalPayload } from "types/projects"
import { SliderArrowButton } from "components/reusable-parts/buttons/slider-arrow-button/slider-arrow-button"
import { SliderDotButton } from "components/reusable-parts/buttons/slider-dot-button/slider-dot-button"
import { useUI } from "contexts/ui-context"

interface TabComponentProps {
  openProjectModal: (payload: ProjectModalPayload) => void
}

export const TabComponent = ({ openProjectModal }: TabComponentProps) => {
  const [activeTab, setActiveTab] = useState("Tab1")
  const projects: ProjectData[] = activeTab === "Tab1" ? projects1 : projects2
  const { screenWidth } = useUI()
  const isLargeScreen = screenWidth > BREAKPOINTS.LG_MD

  const sliderAccentColorVar = useMemo(
    () =>
      activeTab === "Tab1"
        ? "var(--color-primary-pink)"
        : "var(--color-primary-blue)",
    [activeTab],
  )

  const sliderSettings: Settings = {
    centerPadding: "0px",
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: (
      <SliderArrowButton
        direction="prev"
        accentColorVar={sliderAccentColorVar}
      />
    ),
    nextArrow: (
      <SliderArrowButton
        direction="next"
        accentColorVar={sliderAccentColorVar}
      />
    ),
    customPaging: (index) => (
      <SliderDotButton index={index} accentColorVar={sliderAccentColorVar} />
    ),
    responsive: [
      {
        breakpoint: BREAKPOINTS.TABLET_SMALL,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: BREAKPOINTS.EXTRA_SMALL,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
    ],
  }

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
  }

  const renderProjects = () => {
    if (isLargeScreen) {
      // Full grid display logic for large screens //
      return (
        <div className="projects-section__cards-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              activeTab={activeTab}
              openProjectModal={openProjectModal}
            />
          ))}
        </div>
      )
    } else {
      // Carousel logic //
      return (
        <>
          <div className="projects-section__tab-content">
            <Slider {...sliderSettings}>
              {projects.map((project, index) => (
                <div className="projects-section__slider-card" key={index}>
                  <ProjectCard
                    project={project}
                    activeTab={activeTab}
                    openProjectModal={openProjectModal}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )
    }
  }

  return (
    <div className="projects-section__tabs">
      <div className="projects-section__tabs-header">
        <div className="projects-section__tabs-header-block projects-section__title-block">
          <div className="section__header">
            <div className="fz-header projects-section__title">Projects</div>
          </div>
        </div>
        <div className="projects-section__tabs-header-block">
          <button
            className={clsx(
              "projects-section__tab-button",
              "projects-section__tab-button--primary",
              activeTab === "Tab1" && "projects-section__tab-button--active",
            )}
            onClick={() => handleTabChange("Tab1")}
          >
            <span>With Links</span>
          </button>

          <button
            className={clsx(
              "projects-section__tab-button",
              "projects-section__tab-button--secondary",
              activeTab === "Tab2" && "projects-section__tab-button--active",
            )}
            onClick={() => handleTabChange("Tab2")}
          >
            <span>Only GitHub</span>
          </button>
        </div>
        <div className="projects-section__tabs-header-block"></div>
      </div>

      {renderProjects()}
    </div>
  )
}
