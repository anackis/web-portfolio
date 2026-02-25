import { MouseEvent, useMemo } from "react"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./img-full-screen-slider.scss"
import { CloseButton } from "components/reusable-parts/buttons/close-button/close-button"
import { SliderArrowButton } from "components/reusable-parts/buttons/slider-arrow-button/slider-arrow-button"
import { SliderDotButton } from "components/reusable-parts/buttons/slider-dot-button/slider-dot-button"
import { ProjectsModalTheme } from "types/projects"

interface ImgFullScreenSliderProps {
  images: string[]
  theme: ProjectsModalTheme
  onClose: () => void
  initialIndex?: number
}

export const ImgFullScreenSlider = ({
  images,
  theme,
  onClose,
  initialIndex = 0,
}: ImgFullScreenSliderProps) => {
  const sliderAccentColorVar = "var(--img-fullscreen-slider-accent-color)"

  const normalizedInitialSlide = Math.min(
    Math.max(initialIndex, 0),
    Math.max(images.length - 1, 0),
  )

  const settings: Settings = useMemo(
    () => ({
      centerMode: true,
      dots: true,
      infinite: true,
      centerPadding: "0px",
      initialSlide: normalizedInitialSlide,
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
            centerPadding: "40px",
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    }),
    [normalizedInitialSlide],
  )

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`img-fullscreen-slider img-fullscreen-slider--${theme}`}
      onClick={handleBackdropClick}
    >
      <div className="img-fullscreen-slider__container">
        <CloseButton
          onClick={onClose}
          accentColorVar="var(--img-fullscreen-slider-accent-color)"
        />

        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index}`} loading="lazy" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
