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
import NFTRarity from "./NFTRarity";
import Timeline from "./Launchpad/AuctionSwap/Timeline";
import { observer } from "mobx-react";
import useStore from "@lib/useStore";

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

  const fixedSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1"},
    {title: t("Purchase"), des: t("Deposit your fund"), step: "2"},
    {title: t("Status"), des: t("Status of your application"), step: "3"}
  ]

  const auctionSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1"},
    {title: t("Auction"), des: t("Place your bid"), step: "2"},
    {title: t("Status"), des: t("Status of your bid"), step: "3"},
    {title: t("Claim"), des: t("Claim your token"), step: "4"}
  ]

  const idoSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1"},
    {title: t("Prefunding"), des: t("Deposit your fund"), step: "2"},
    {title: t("Status"), des: t("Status of your bid"), step: "3"},
    {title: t("Claim"), des: t("Claim your token"), step: "4"}
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
          <div class="flex flex-col lg:order-2 w-full ml-4 space-y-4">

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
            <div className="card card-default card--project-info">
              <div className="card-header items-end">
                <div>
                  <span class="text-2xs uppercase opacity-60 tracking-wide">PREVIEW </span>
                  <h3>MetaGear NFT Collection</h3>
                </div>
                <a className="btn btn-default">
                  <span className="btn--text">
                    View all
                  </span>
                  <span className="btn--caret-right"></span>
                </a>  
              </div>
              <div className="card-body">

                {/* NFT Cards Slideshow */}
                <div className="grid grid-cols-3 gap-4">
                  {/* NFT Card */}
                  <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
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
                  {/* NFT Card */}
                  <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
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
                  {/* NFT Card */}
                  <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
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
                </div>

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
            {pool.token_sale == "auction-swap" && (
              <NFTRarity />
            )}

          </div>

          {/* Pool info     */}

          {/* END: Sidebar */}

        </div>
      </div>

    </>
  );
});

export default ProjectLaunchpad;
