import { memo } from "react"
import clsx from "clsx"
import GithubIcon from "assets/socialIcons/github.svg"
import InternetIcon from "assets/socialIcons/internet-icon.svg"
import "./project-card.scss"
import {
  ProjectData,
  ProjectModalPayload,
  ProjectsModalTheme,
} from "types/projects"

interface ProjectCardProps {
  activeTab: string
  project: ProjectData
  openProjectModal: (payload: ProjectModalPayload) => void
}

export const ProjectCard = memo(function ProjectCard({
  activeTab,
  project,
  openProjectModal,
}: ProjectCardProps) {
  const isTab1 = activeTab === "Tab1"
  const cardTheme: ProjectsModalTheme = isTab1 ? "pink" : "blue"
  const headerClass = clsx(
    "projects-section__card-title",
    isTab1
      ? "projects-section__card-title--pink"
      : "projects-section__card-title--blue",
  )

  const internetLinkClass = clsx(
    "projects-section__link",
    "projects-section__link--internet",
    isTab1 ? "projects-section__link--pink" : "projects-section__link--blue",
  )

  const githubLinkClass = clsx(
    "projects-section__link",
    "projects-section__link--github",
    isTab1 ? "projects-section__link--pink" : "projects-section__link--blue",
  )

  return (
    <div
      className={clsx(
        "projects-section__card",
        `projects-section__card--${cardTheme}`,
      )}
    >
      <div className="projects-section__card-media">
        <div className="projects-section__card-media-inner">
          <img
            src={project.thumbnail}
            alt={project.title}
            width={800}
            height={600}
            className="projects-section__card-image"
            onClick={() => openProjectModal({ project, theme: cardTheme })}
            loading="lazy"
          />
        </div>
      </div>

      <div className="projects-section__card-body">
        <div className="projects-section__card-header">
          <h3 className={headerClass}>{project.title}</h3>

          <div className="projects-section__links">
            {project.link && (
              <a
                className={internetLinkClass}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={InternetIcon} alt="Live site" />
              </a>
            )}
            <a
              className={githubLinkClass}
              href={project.linkGitHub}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubIcon} alt="GitHub" />
            </a>
          </div>
        </div>

        <p className="fz-text">{project.description}</p>

        <div className="projects-section__hashtags">
          {project.hashtags.map((hashtag, index) => (
            <div className={`hashtag_${index}`} key={hashtag + index}>
              {hashtag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
