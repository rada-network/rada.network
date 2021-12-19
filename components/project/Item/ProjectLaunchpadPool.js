import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import LaunchpadOverview from "./Launchpad/Overview";
import ProjectPool from "../List/ProjectPool"
import ProjectContent from "../Overview";

const ProjectLaunchpadPool = ({ project, pool }) => {


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
                <div className="pools-container--panel">
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