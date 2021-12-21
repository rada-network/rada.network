import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";
import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";

const ProjectLaunchpad = ({ project, pool }) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolContract,setPoolContract] = useState(pool)
  const [loadingPool,setLoadingPool] = useState(true)

  useEffect(() => {
    fetcher(`/api/pools/get-pools?slug=${project.slug}/${pool.slug}`).then(function(res){
      if (!!res.contract){
        setPoolContract({...pool,id : res.pool_id,contract : res.contract })
      }
      else{
        setPoolContract({...pool,id : null,contract : "" })
      }
      setLoadingPool(false)
    })    
  }, [pool.slug]);
  if (loadingPool) return null
  return (
    <>
      <div className="section">
        <LaunchpadOverview project={project} pool={poolContract} />

        <div className="section-body">
          <LaunchpadContent project={project} pool={poolContract} />

          {/* Main Action Card */}
          <div className="grid grid-cols-1 mt-4">
            <LaunchpadActions project={project} pool={poolContract} />
          </div>
          {/* END: Main Action Card */}
        </div>

        {/* FAQ */}
        <ProjectFaq project={project} /> 

      </div>


    </>
  );
};

export default ProjectLaunchpad;
