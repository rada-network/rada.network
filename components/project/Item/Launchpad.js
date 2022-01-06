import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Screen from "../../utils/Responsive";

import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";


import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";
import Subscriber from "./Launchpad/Actions/Subscriber";
import { getProjectPoolWinnerBySlug } from "@data/query/projects";
import dynamic from "next/dynamic";
import HowToUse from "./HowToUse";
import TutorialWidget from "./Launchpad/TutorialWidget"

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

        <div class="flex items-start">
          
          {/* Main Col */}
          <div class="flex flex-col lg:order-2 w-full ml-4 space-y-4">

            <div className="">
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


            {/* FAQ */}
            <div className="card card-default">
              <div className="card-body no-padding">
                <div className="flex flex-col">
                  {/* {whitelistTime < currentTime && pool.whitelist_date !== null && winners.length > 0 &&
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
                  } */}

                 <div className="flex h-12 border-b border-gray-200 dark:border-gray-700">
                    <nav aria-label="tabbar card-tabs">
                      <ol role="list" className="tabbar--main h-full px-4">
                        <li style={style} className={`tab-item ` + (active == "faq" ?  "tab-item--active" : "")} onClick={(e) => {setActive("faq")}}>
                          <span className="tab-item--text !block">
                            FAQS
                          </span>
                        </li>
                        <li style={style} className={`tab-item ` + (active == "howto" ?  "tab-item--active" : "")} onClick={(e) => {setActive("howto")}}>
                          <span className="tab-item--text !block">
                            How to
                          </span>
                        </li>
                        <li style={style} className={`tab-item ` + (active == "winner" ?  "tab-item--active" : "")} onClick={(e) => {setActive("winner")}}>
                          <span className="tab-item--text !block">
                            Winners
                          </span>
                        </li>
                      </ol>
                    </nav>
                  </div>

                  <div className={"project-card--container" + (active == "faq" ? "" : " hidden")}>
                    <ProjectFaq project={project} pool={pool}/> 
                  </div>
                  <div className={"project-card--container"+ (active == "winner" ? "" : " hidden")}>
                    <Subscriber project={project} pool={poolContract} winners={winners}/>
                  </div>
                  <div className={"project-card--container"+ (active == "howto" ? "" : " hidden")}>
                    <HowToUse project={project} pool={pool}/>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* END: Main Col */}

          {/* Sidebar */}
          <div class="flex flex-col lg:order-1 lg:w-2/5 space-y-4">

            <LaunchpadContent project={project} pool={poolContract} />

            <div className="card card-default card--project-info">
              <div className="card-header">
                <h3>NFT Preview</h3>
                <a className="btn btn-default">
                  <span className="btn--text text-xs">
                    View all
                  </span>
                </a>  
              </div>
              <div className="card-body">

                {/* NFT Cards Slideshow */}
                {/* NFT Card */}
                <div className="rounded-lg bg-primary-50">
                  <div>
                    <img className="w-full object-cover rounded-lg" src={pool.token_image_uri} />
                  </div>

                  <div className="flex justify-between items-center p-2">
                    <div>
                      <h5 className="font-medium">
                        MetaBox
                      </h5>
                      <span className="text-xs font-medium text-yellow-500">
                        LEGENDARY
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs opacity-60">
                        Highest bid
                      </span>
                      <span className="text-xs font-medium">
                        150 BUSD
                      </span>
                    </div>
                  </div>
                </div>
                {/* END: NFT Card */}

                <div className="flex space-x-2 mt-4 justify-center">
                  <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
                  <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
                  <span className="h-2 w-4 rounded-lg cursor-pointer bg-primary-500"></span>
                  <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
                  <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
                  <span className="h-2 w-2 rounded-lg cursor-pointer bg-gray-300"></span>
                </div>
                {/* NFT Cards Slideshow */}

              </div>
            </div>

            <div className="card card-default card--project-info">
              <div className="card-header">
                <h3>{t("Info", { name: project.content.title })}</h3>       
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

          {/* Pool info     */}

          {/* END: Sidebar */}

        </div>
      </div>

    </>
  );
};

export default ProjectLaunchpad;
