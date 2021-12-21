import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import LaunchpadOverview from "./Launchpad/Overview";
import ProjectPool from "./ProjectPool";

const ProjectLaunchpadPool = ({project,pool}) => {
  return (
    <>
      <div className="section">
          <LaunchpadOverview project={project} pool={pool} />
          <div className="section-body pools-container">
            <ProjectPool project={project} />
          </div>
      </div>

    </>
  )
}

export default ProjectLaunchpadPool