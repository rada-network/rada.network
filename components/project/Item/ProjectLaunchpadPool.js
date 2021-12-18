import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import LaunchpadOverview from "./Launchpad/Overview";
import CardProject from "../List/CardProject";
import ProjectContent from "../Overview";

const ProjectLaunchpadPool = ({ project, pool }) => {

  const ProjectPool = function ({ project }) {
    let pools = project.project_pool.slice(0)
    pools.sort(function (a, b) {
      return a.sort - b.sort
    })
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pools.map((pool) => (
          <CardProject
            key={pool.slug}
            project={project}
            pool={pool}
          />
        ))}
      </div>
    )
  }
  return (
    <>
      <div className="section">
        <LaunchpadOverview project={project} pool={pool} />

        <div className="section-body">
          <ProjectContent project={project} />
          <div className="projects-section--subheader">
            <h3 className="">{project.content.title}'s Pools</h3>
          </div>

          <div className="w-full">
            <div className="pools-container"
              style={{ backgroundImage: `url(${project.cover_uri})`, }}>
              <>
                <div className="pools-container--panel !p-6">
                  <ProjectPool project={project} />
                </div>
              </>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProjectLaunchpadPool