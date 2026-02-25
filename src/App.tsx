import React, { Suspense, useCallback, useEffect, useState } from "react"

import { Canvas } from "@react-three/fiber"
import { Scroll, ScrollControls, useProgress } from "@react-three/drei"

import { MotionConfig } from "framer-motion"
import { framerMotionConfig } from "./constants/config"

import { Scene } from "./components/Scene"
import { ScrollManager } from "./components/ScrollManager"
import { Interface } from "./components/Interface"
import { ImgSliderPayload, ProjectModalPayload } from "./types/projects"

import { Menu } from "./components/components/menu/menu"
import { Navbar } from "./components/components/navbar/navbar"
import { LoadingScreen } from "./components/components/loading/loading"
import { SidePanel } from "./components/components/side-panel/side-panel"

import { useSection } from "./contexts/section-context"
import { ProjectModal } from "./components/sections/projects-section/parts/project-modal/project-modal"

const CV = React.lazy(() => import("./components/components/cv/cv"))
const Popup = React.lazy(() =>
  import("./components/components/popup/popup").then((m) => ({
    default: m.Popup,
  })),
)
const ConnectComponent = React.lazy(() =>
  import("./components/components/connect/connect").then((m) => ({
    default: m.ConnectComponent,
  })),
)
const ImgFullScreenSlider = React.lazy(() =>
  import("./components/components/img-full-screen-slider/img-full-screen-slider").then(
    (m) => ({ default: m.ImgFullScreenSlider }),
  ),
)

export function App() {
  const { section } = useSection()
  const [isConnectModalOpen, setConnectModalOpen] = useState(false)
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<"success" | "error">("success")
  const [projectsModalData, setProjectsModalData] =
    useState<ProjectModalPayload | null>(null)
  const [imgSliderData, setImgSliderData] = useState<ImgSliderPayload | null>(
    null,
  )

  const openProjectModal = useCallback((payload: ProjectModalPayload) => {
    setProjectsModalData(payload)
    setProjectModalOpen(true)
  }, [])

  const closeProjectModal = () => {
    setProjectModalOpen(false)
    setProjectsModalData(null)
  }

  const openImgSlider = (payload: ImgSliderPayload) => {
    setImgSliderData({
      ...payload,
      initialIndex: payload.initialIndex ?? 0,
    })
    setFullscreenOpen(true)
  }

  const closeImgSlider = () => {
    setFullscreenOpen(false)
    setImgSliderData(null)
  }

  const MIN_LOADER_TIME_MS = 3500
  const [loaderStart] = useState(() => Date.now())
  const { progress } = useProgress()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - loaderStart
      const remaining = Math.max(0, MIN_LOADER_TIME_MS - elapsed)
      const timeout = setTimeout(() => setShowLoader(false), remaining)
      return () => clearTimeout(timeout)
    }
  }, [progress, loaderStart])

  return (
    <div
      className={`main ${
        section === 0 ? "main-section0" : section === 1 ? "main-section1" : ""
      }`}
    >
      {showLoader && <LoadingScreen />}

      <Suspense fallback={null}>
        <MotionConfig transition={{ ...framerMotionConfig }}>
          <Canvas
            dpr={[0.7, 1.5]}
            // dpr={[0.3, 0.3]} // For testing on weak GPU. TODO REMOVE!
            shadows={false}
            camera={{ position: [0, 2, 5], fov: 30 }}
          >
            <Scene menuOpened={menuOpened} isReady={!showLoader} />

            <ScrollControls pages={5} damping={0.1}>
              <ScrollManager />

              <Scroll html>
                <Interface
                  currentSection={section}
                  isReady={!showLoader}
                  openProjectModal={openProjectModal}
                  openCvModal={() => setCvModalOpen(true)}
                />
              </Scroll>
            </ScrollControls>
          </Canvas>
        </MotionConfig>
      </Suspense>

      <Navbar
        menuOpened={menuOpened}
        setConnectModalOpen={setConnectModalOpen}
        setCvModalOpen={() => setCvModalOpen(true)}
        isReady={!showLoader}
      />

      <Menu
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        setCvModalOpen={() => setCvModalOpen(true)}
      />

      <SidePanel setCvModalOpen={() => setCvModalOpen(true)} />

      <React.Suspense fallback={<div>Loading...</div>}>
        {showPopup && (
          <Popup
            message={
              popupType === "success"
                ? "Message sent successfully!"
                : "Failed to send message. Please try again."
            }
            type={popupType}
            onClose={() => setShowPopup(false)}
          />
        )}

        {isConnectModalOpen && (
          <ConnectComponent
            closeModal={() => setConnectModalOpen(false)}
            openCvModal={() => setCvModalOpen(true)}
            onSubmitSuccess={() => {
              setPopupType("success")
              setShowPopup(true)
            }}
            onSubmitError={() => {
              setPopupType("error")
              setShowPopup(true)
            }}
          />
        )}

        {cvModalOpen && <CV setCvModalOpen={setCvModalOpen} />}

        {projectModalOpen && projectsModalData && (
          <ProjectModal
            project={projectsModalData.project}
            theme={projectsModalData.theme}
            onClose={closeProjectModal}
            openImgSlider={openImgSlider}
          />
        )}

        {fullscreenOpen && imgSliderData && (
          <ImgFullScreenSlider
            images={imgSliderData.images}
            theme={imgSliderData.theme}
            onClose={closeImgSlider}
            initialIndex={imgSliderData.initialIndex}
          />
        )}
      </React.Suspense>
    </div>
  )
}
