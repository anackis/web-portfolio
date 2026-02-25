import { MouseEvent } from "react"
import Slider, { Settings } from "react-slick"
import GithubIcon from "assets/socialIcons/github.svg"
import InternetIcon from "assets/socialIcons/internet-icon.svg"
import "./project-modal.scss"
import { BREAKPOINTS } from "constants/constants"
import { useUI } from "contexts/ui-context"
import { CloseButton } from "components/reusable-parts/buttons/close-button/close-button"
import { SliderArrowButton } from "components/reusable-parts/buttons/slider-arrow-button/slider-arrow-button"
import { SliderDotButton } from "components/reusable-parts/buttons/slider-dot-button/slider-dot-button"
import {
  ImgSliderPayload,
  ProjectData,
  ProjectsModalTheme,
} from "types/projects"

interface ProjectModalProps {
  project: ProjectData
  theme: ProjectsModalTheme
  onClose: () => void
  openImgSlider: (payload: ImgSliderPayload) => void
}

export const ProjectModal = ({
  project,
  theme,
  onClose,
  openImgSlider,
}: ProjectModalProps) => {
  const { screenWidth } = useUI()
  const isMobileViewport = screenWidth <= BREAKPOINTS.TABLET_SMALL

  if (!project) return null

  const handleImageClick = (index: number) => {
    if (isMobileViewport) return

    openImgSlider({ images: project.imgs, theme, initialIndex: index })
  }

  const sliderAccentColorVar = "var(--projects-modal-accent-color)"

  const sliderSettings: Settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
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
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`projects-modal projects-modal--${theme}`}
      onClick={handleBackdropClick}
    >
      <div className="projects-modal__container">
        <CloseButton
          onClick={onClose}
          accentColorVar="var(--projects-modal-accent-color)"
        />

        <div className="projects-modal__slider-wrapper">
          <Slider {...sliderSettings}>
            {project.imgs.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Project ${index}`}
                  onClick={
                    isMobileViewport ? undefined : () => handleImageClick(index)
                  }
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="projects-modal__bottom-wrapper">
          <h1>{project.title}</h1>

          <p className="projects-modal__description">
            {project.description_detailed}
          </p>

          <div className="projects-modal__footer">
            <div className="projects-modal__wrapper-for-links">
              {project.link && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-modal__link"
                  href={project.link}
                >
                  <img src={InternetIcon} alt="GitHub" />
                </a>
              )}

              {project.linkGitHub && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-modal__link"
                  href={project.linkGitHub}
                >
                  <img src={GithubIcon} alt="GitHub" />
                </a>
              )}
            </div>

            <div className="projects-modal__wrapper-for-hashtags">
              {project.hashtags.map((hashtag, index) => (
                <div className={`hashtag_${index}`} key={index}>
                  {hashtag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
