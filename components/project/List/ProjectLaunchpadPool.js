import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import LaunchpadOverview from "./Launchpad/Overview";
import CardProject from "../List/CardProject";

const ProjectLaunchpadPool = ({project,pool}) => {

  const ProjectPool = function({project}){
    let pools = project.project_pool.slice(0)
    pools.sort(function(a, b){
      return a.sort - b.sort
    })
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
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
              <div className="section-body pools-container">
                <ProjectPool project={project} />
              </div>
          </div>

      </>
  )
}

export default ProjectLaunchpadPool