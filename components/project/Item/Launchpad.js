import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";
import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";
import Subscriber from "./Launchpad/Actions/Subscriber";
import { getProjectPoolWinnerBySlug } from "@data/query/projects"


const style = {
  cursor : "pointer",
}

const ProjectLaunchpad = ({ project, pool }) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolContract,setPoolContract] = useState(pool)
  const [loadingPool,setLoadingPool] = useState(true)
  const [active,setActive] = useState("faq")
  const [winners,setWinners] = useState([])
  const currentTime = (new Date(pool.current_date)).getTime() / 1000
  const whitelistTime = (new Date(pool.whitelist_date)).getTime() / 1000
  useEffect(() => {
    getProjectPoolWinnerBySlug({slug : project.slug,pool : pool.slug}).then(function(res){
      setWinners(res)
    })
  },[])
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
  }, [pool]);
  useEffect(() => {
    if (pool.whitelist_date !== null && whitelistTime < currentTime && winners.length > 0){
      setActive("winner")
    }
    else{
      setActive("faq")
    }
  },[winners])
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
              {whitelistTime < currentTime && pool.whitelist_date !== null && winners.length > 0 &&
              <div className="flex h-12 border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="tabbar card-tabs">
                  <ol role="list" className="tabbar--main h-full px-4">
                    <li style={style} className={`tab-item ` + (active == "faq" ?  "tab-item--active" : "")} onClick={(e) => {setActive("faq")}}>
                      <div className="step-compact-body" aria-current="step">
                        <div className="step-compact-body--content">
                          <span className="step-compact-body--title">FAQS
                          </span>
                        </div>
                      </div>
                    </li>
                    <li style={style} className={`tab-item ` + (active == "winner" ?  "tab-item--active" : "")} onClick={(e) => {setActive("winner")}}>
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
              }
              <div class={"project-card--container" + (active == "faq" ? "" : " hidden")}>
                <ProjectFaq project={project} /> 
              </div>
              <div class={"project-card--container"+ (active == "winner" ? "" : " hidden")}>
                <Subscriber project={project} pool={poolContract} winners={winners}/>
              </div>
            </div>
          </div>
        </div>
        

      </div>


    </>
  );
};

export default ProjectLaunchpad;
