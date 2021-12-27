import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";
import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";
import Subscriber from "./Launchpad/Actions/Subscriber";

const style = {
  cursor : "pointer",
}

const ProjectLaunchpad = ({ project, pool }) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolContract,setPoolContract] = useState(pool)
  const [loadingPool,setLoadingPool] = useState(true)
  const [active,setActive] = useState("faq")
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
    const currentTime = (new Date(pool.current_date)).getTime() / 1000
    const whitelistTime = (new Date(pool.whitelist_date)).getTime() / 1000
    if (whitelistTime > currentTime){
      setActive("faq")
    }
    else{
      setActive("winner")
    }
  }, [pool]);
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
        <div className="card-default faqs launchverse-faqs mt-8">
          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <nav aria-label="Progress">
                  <ol role="list" className="steps-compact ">
                    <li style={style} className={`step-compact ` + (active == "faq" ?  "is-current" : "")} onClick={(e) => {setActive("faq")}}>
                      <div className="step-compact-body" aria-current="step">
                        <div className="step-compact-body--content">
                          <span className="step-compact-body--title">Frequently Asked Questions
                          </span>
                        </div>
                      </div>
                    </li>
                    <li style={style} className={`step-compact ` + (active == "winner" ?  "is-current" : "")} onClick={(e) => {setActive("winner")}}>
                      <div className="step-compact-body" aria-current="step">
                        <div className="step-compact-body--content">
                          <span className="step-compact-body--title">Winners
                          </span>
                        </div>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
              <div class={"project-card--container" + (active == "faq" ? "" : " hidden")}>
                <ProjectFaq project={project} /> 
              </div>
              <div class={"project-card--container"+ (active == "winner" ? "" : " hidden")}>
                <Subscriber project={project} pool={poolContract} />
              </div>
            </div>
          </div>
        </div>
        

      </div>


    </>
  );
};

export default ProjectLaunchpad;
