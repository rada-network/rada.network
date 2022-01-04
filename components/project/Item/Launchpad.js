import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";
import Subscriber from "./Launchpad/Actions/Subscriber";
import { getProjectPoolWinnerBySlug } from "@data/query/projects"
import dynamic from "next/dynamic";

const LaunchpadIdo = dynamic(import(`./Launchpad/Actions/Index`));
const LaunchpadFixedSwap = dynamic(import(`./Launchpad/FixedSwap/Index`));
const LaunchpadAuctionSwap = dynamic(import(`./Launchpad/AuctionSwap/Index`));
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
        <div class="flex flex-col md:grid md:grid-cols-3 md:auto-rows-min md:gap-4">
          
          <div class="order-0 mb-4 md:mb-0 col-start-2 col-span-2 row-span-3 flex flex-col
          ">
            <div className="mb-4"> <img className="w-full col-start-2 col-span-2 row-span-1 rounded-lg object-cover" 
          src='https://i.postimg.cc/KvNk1fVp/nft.jpg' /></div>
            <div className="bg-white dark:bg-gray-800 relative z-10 card-default flex-shrink-0 flex-grow">
              {/* Main Action Card */}
          
              {pool.token_sale == "ido" && 
              <LaunchpadIdo project={project} pool={poolContract} />
              }
              {pool.token_sale == "fixed-swap" && 
              <LaunchpadFixedSwap project={project} pool={poolContract} />
              }
              {pool.token_sale == "auction-swap" && 
              <LaunchpadAuctionSwap project={project} pool={poolContract} />
              }
    
              {/* END: Main Action Card */}
            </div>
           
          </div>
          <div class="order-0 mb-4 md:mb-0 col-start-1 row-start-1">
            <LaunchpadContent project={project} pool={poolContract} />
          </div>
          <div class="order-3 mb-4 md:mb-0 col-start-1 row-start-2 ">
            <div className="card card-default card--project-info">
              <div className="card-header">
                <h3>{t("Info", { name: project?.token?.name })}</h3>       
              </div>
              <div className="card-body">
                <div
                  dangerouslySetInnerHTML={{ __html: project.content.description }}
                />
              
                <div className="flex">
                  {!!project.news && <p className="mt-auto pt-4">
                    <Link href="#">
                      <span className="flex">
                        <a className="link" href="#">{t("Read full research")}</a>
                      </span>
                    </Link>
                  </p>}
                  
                </div>
              </div>
            </div>
          </div>
          <div class="order-4 mb-4 md:mb-0 col-start-1 row-start-3 ">
            <div className="card card-default card--project-info">
              <div className="card-header">
                <h3>How to use the box</h3>       
              </div>
              <div className="card-body">
                <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 border-opacity-40">
                  <h4 className="font-semibold text-xs uppercase tracking-wider mb-2">Step 1</h4>
                  <p className="opacity-80">Buy the box </p>
                </div>
                  
                <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 border-opacity-40">
                  <h4 className="font-semibold  text-xs uppercase tracking-wider mb-2">Step 2</h4>
                  <p className="opacity-80">After purchase the box, the token will be sent to your wallet </p>
                </div>

                <div className="pb-4">
                  <h4 className="font-semibold  text-xs uppercase tracking-wider mb-2">Step 3</h4>
                  <p className="opacity-80">After purchase the box, the token will be sent to your wallet </p>
                </div>

              </div>
            </div>
          </div> 
          {/* Pool info     */}
        </div>
      </div>
      <div>

        {/* FAQ */}
        <div className="section-body p-4 md:p-4">
          <div className="card-body no-padding">
            <div className="flex flex-col">
              {whitelistTime < currentTime && pool.whitelist_date !== null && winners.length > 0 &&
              <div className="flex h-12 border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="tabbar card-tabs">
                  <ol role="list" className="tabbar--main h-full px-4">
                    <li style={style} className={`tab-item ` + (active == "faq" ?  "tab-item--active" : "")} onClick={(e) => {setActive("faq")}}>
                      <span className="tab-item--text !block">FAQS
                      </span>
                    </li>
                    <li style={style} className={`tab-item ` + (active == "winner" ?  "tab-item--active" : "")} onClick={(e) => {setActive("winner")}}>
                      <span className="tab-item--text !block">Winners
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
              }
              <div className={"project-card--container" + (active == "faq" ? "" : " hidden")}>
                <ProjectFaq project={project} /> 
              </div>
              <div className={"project-card--container"+ (active == "winner" ? "" : " hidden")}>
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
