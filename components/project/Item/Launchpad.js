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
import NftPreview from "./NftPreview";
import NftInfo from "./NftInfo";
import { observer } from "mobx-react";
import useStore from "@lib/useStore";
import Timeline from "./Launchpad/AuctionSwap/Timeline";


const LaunchpadIdo = dynamic(import(`./Launchpad/Actions/Index`));
const LaunchpadFixedSwap = dynamic(import(`./Launchpad/FixedSwap/Index`));
const LaunchpadAuctionSwap = dynamic(import(`./Launchpad/AuctionSwap/Index`));
const style = {
  cursor : "pointer",
}

const ProjectLaunchpad = observer (({ project, pool }) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolContract,setPoolContract] = useState(pool)
  const [loadingPool,setLoadingPool] = useState(true)
  const [active,setActive] = useState("faq")
  const [winners,setWinners] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const currentTime = (new Date(pool.current_date)).getTime() / 1000
  const whitelistTime = (new Date(pool.whitelist_date)).getTime() / 1000
  const openTime = (new Date(pool.open_date)).getTime() / 1000
  const endTime = (new Date(pool.end_date)).getTime() / 1000

  const store = useStore()
  const storeStep = store.step.step

  useEffect(() => {
    setCurrentStep(storeStep);
  }, [storeStep])

  function formatTime(time) {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    const date = new Date(time)
    return date.toLocaleTimeString("en-US", options).toString();
  }

  const fixedSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.open_date))},
    {title: t("Purchase"), des: t("Deposit your fund"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Status"), des: t("Status of your application"), step: "3", from: formatTime(new Date(pool.end_date)), to: "TBA"}
  ]

  const auctionSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.open_date))},
    {title: t("Auction"), des: t("Place your bid"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Open"), des: t("Open box"), step: "3", from: formatTime(new Date(pool.end_date)), to: formatTime(new Date(pool.whitelist_date))},
    {title: t("Claim"), des: t("Claim your token"), step: "4", from: formatTime(new Date(pool.whitelist_date)), to: "TBA"}
  ]

  const idoSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.open_date))},
    {title: t("Prefunding"), des: t("Deposit your fund"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Status"), des: t("Status of your bid"), step: "3", from: formatTime(new Date(pool.end_date)), to: formatTime(new Date(pool.whitelist_date))},
    {title: t("Claim"), des: t("Claim your token"), step: "4", from: formatTime(new Date(pool.whitelist_date)), to: "TBA"}
  ]

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

  useEffect(() => {

    if (openTime < currentTime && currentTime < endTime) {
      setCurrentStep("2");
    } else if (currentTime < openTime) {
      setCurrentStep("1")
    } else if (currentTime > endTime) {
      setCurrentStep("3")
    }
  }, [])

  if (loadingPool) return null

  return (
    <>
      <div className="section">

        <LaunchpadOverview project={project} pool={poolContract} />

        <div class="flex items-start">
          
          {/* Main Col */}
          <div class="flex flex-col lg:order-2 w-4/6 ml-4 space-y-4">

            {/* Timeline */}
            <div className="card card-default">
              <div className="card-body">
                <h3 className="sr-only">Pool's Timeline</h3>
                {pool.token_sale == "ido" && 
                  <Timeline step={currentStep} steps={idoSwapSteps} />
                }
                {pool.token_sale == "fixed-swap" && 
                  <Timeline step={currentStep} steps={fixedSwapSteps} />
                }
                {pool.token_sale == "auction-swap" && 
                  <Timeline step={currentStep} steps={auctionSwapSteps} />
                }
                
              </div>
            </div>
            {/* END: Timeline */}

            {/* NFT Info Card */}
            <NftPreview project={project} pool={poolContract}/>
            {/* END: NFT Info Card */}

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

                 <div className="flex h-12 border-b border-gray-200 dark:border-gray-700">
                    <nav aria-label="tabbar card-tabs">
                      <ol role="list" className="tabbar--main h-full px-4">
                        <li style={style} className={`tab-item ` + (active == "faq" ?  "tab-item--active" : "")} onClick={(e) => {setActive("faq")}}>
                          <span className="tab-item--text !block">
                            FAQS
                          </span>
                        </li>
                        {pool.token_sale !== "ido" && (
                          <li style={style} className={`tab-item ` + (active == "howto" ?  "tab-item--active" : "")} onClick={(e) => {setActive("howto")}}>
                            <span className="tab-item--text !block">
                              How to
                            </span>
                          </li>
                        )}
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

                  
                    {pool.token_sale !== "ido" && (
                      <div className={"project-card--container"+ (active == "howto" ? "" : " hidden")}>
                        <HowToUse project={project} pool={pool}/>
                      </div>
                    )}
                  
                </div>
              </div>
            </div>

          </div>
          {/* END: Main Col */}

          {/* Sidebar */}
          <div class="flex flex-col lg:order-1 lg:w-2/6 space-y-4 flex-shrink-0">

            <LaunchpadContent project={project} pool={poolContract} />

            <div className="card card-default">
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

            <NftInfo project={project} pool={poolContract}/>

          </div>

          {/* Pool info     */}

          {/* END: Sidebar */}

        </div>
      </div>

    </>
  );
});

export default ProjectLaunchpad;
