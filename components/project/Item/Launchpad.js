import { useEffect,useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Screen from "../../utils/Responsive";

import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";

import fetcher from "@lib/fetchJson";
import ProjectFaq from "./Faq";
import Subscriber from "./Launchpad/Ido/Subscriber";
import { getProjectPoolWinnerBySlug } from "@data/query/projects";
import dynamic from "next/dynamic";
import HowToUse from "./HowToUse";
import TutorialWidget from "./Launchpad/TutorialWidget"
import NftPreview from "./NftPreview";
import NftInfo from "./NftInfo";
import { observer } from "mobx-react";
import useStore from "@lib/useStore";
import Timeline from "./Launchpad/AuctionSwap/Timeline";
import BoxPreview from "./BoxPreview";


const LaunchpadIdo = dynamic(import(`./Launchpad/Ido/Index`));
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
    {title: t("Prepare"), des: t("Prepare for purchase"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Purchase"), des: t("Purchase your NFT"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Status"), des: t("Status of your order"), step: "3", from: formatTime(new Date(pool.end_date)), to: "TBA"}
  ]

  const fixedSwapOpenBoxSteps = [
    {title: t("Prepare"), des: t("Prepare for purchase"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Purchase"), des: t("Purchase your box"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Open"), des: t("Open your box"), step: "3", from: formatTime(new Date(pool.open_date)), to: "TBA"},
  ]

  const auctionSwapOpenBoxSteps = [
    {title: t("Prepare"), des: t("Prepare for purchase"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Auction"), des: t("Place your bid"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Open"), des: t("Open your box"), step: "3", from: formatTime(new Date(pool.end_date)), to: formatTime(new Date(pool.whitelist_date))},
  ]

  const auctionSwapOpenBoxRewardSteps = [
    {title: t("Prepare"), des: t("Prepare for purchase"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Auction"), des: t("Place your bid"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Open"), des: t("Open your box"), step: "3", from: formatTime(new Date(pool.end_date)), to: formatTime(new Date(pool.whitelist_date))},
    {title: t("Claim"), des: t("Claim your reward"), step: "4", from: formatTime(new Date(pool.whitelist_date)), to: "TBA"}
  ]

  const auctionSwapNonOpenBox = [
    {title: t("Prepare"), des: t("Prepare for purchase"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Auction"), des: t("Place your bid"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Status"), des: t("Status of your bid"), step: "3", from: formatTime(new Date(pool.end_date)), to: "TBA"}
  ]

  const idoSwapSteps = [
    {title: t("Whitelist"), des: t("Apply for whitelist"), step: "1", from: formatTime(new Date()), to: formatTime(new Date(pool.open_date))},
    {title: t("Prefunding"), des: t("Deposit your fund"), step: "2", from: formatTime(new Date(pool.open_date)), to: formatTime(new Date(pool.end_date))},
    {title: t("Status"), des: t("Status of your application"), step: "3", from: formatTime(new Date(pool.end_date)), to: formatTime(new Date(pool.whitelist_date))},
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
        setPoolContract({...pool,id : res.pool_id,contract : res.contract,openbox_contract:res?.openbox_contract,box_contract : res?.box_contract,nft_contract : res?.nft_contract })
      }
      else{
        setPoolContract({...pool,id : null,contract : "",openbox_contract: "",box_contract : "",nft_contract : "" })
      }
      setLoadingPool(false)
    })    
  }, [pool]);
  useEffect(() => {
    if (pool.token_sale === "ido"){
      if (pool.whitelist_date !== null && whitelistTime < currentTime && winners.length > 0){
        setActive("winner")
      }
      else{
        setActive("faq")
      }
    }

    if (pool.token_sale === "fixed-swap"){
      if (currentTime > endTime){
        setActive("faq")
      }
      else{
        setActive("faq")
      }
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

        <div class="flex flex-col lg:flex-row items-start">

          <Screen upto="md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            </div>
          </Screen>
          
          {/* Main Col */}
          <div class="flex flex-col w-full lg:order-2 lg:w-4/6 lg:ml-4 space-y-4">
            <BoxPreview project={project} pool={poolContract}/> 
            {/* NFT Info Card */}
            <NftPreview project={project} pool={poolContract}/>
            {/* END: NFT Info Card */}

            {/* Timeline */}
            <div className="card card-default">
              <div className="card-body">
                <h3 className="sr-only">Pool's Timeline</h3>
                {pool.token_sale == "ido" && 
                  <Timeline step={currentStep} steps={idoSwapSteps} />
                }
                {pool.token_sale == "fixed-swap" && !pool.is_openbox &&
                  <Timeline step={currentStep} steps={fixedSwapSteps} />
                }
                {pool.token_sale == "fixed-swap" && pool.is_openbox &&
                  <Timeline step={currentStep} steps={fixedSwapOpenBoxSteps} />
                }
                {pool.token_sale == "auction-swap" && pool.is_openbox && !pool.is_nft_reward && 
                  <Timeline step={currentStep} steps={auctionSwapOpenBoxSteps} />
                }
                {pool.token_sale == "auction-swap" && pool.is_openbox && pool.is_nft_reward && 
                  <Timeline step={currentStep} steps={auctionSwapOpenBoxRewardSteps} />
                }
                {pool.token_sale == "auction-swap" && !pool.is_openbox && 
                  <Timeline step={currentStep} steps={auctionSwapNonOpenBox} />
                }
                
              </div>
            </div>
            {/* END: Timeline */}

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
                        {/* {pool.token_sale !== "ido" && (
                          <li style={style} className={`tab-item ` + (active == "howto" ?  "tab-item--active" : "")} onClick={(e) => {setActive("howto")}}>
                            <span className="tab-item--text !block">
                              How to
                            </span>
                          </li>
                        )} */}
                        {pool.whitelist_date !== null && whitelistTime < currentTime && winners.length > 0 && 
                        <li style={style} className={`tab-item ` + (active == "winner" ?  "tab-item--active" : "")} onClick={(e) => {setActive("winner")}}>
                          <span className="tab-item--text !block">
                            Winners
                          </span>
                        </li>
                        }
                        
                      </ol>
                    </nav>
                  </div>

                  <div className={"project-card--container" + (active == "faq" ? "" : " hidden")}>
                    <ProjectFaq project={project} pool={pool}/> 
                  </div>
                  {pool.whitelist_date !== null && whitelistTime < currentTime && winners.length > 0 && 
                  <div className={"project-card--container"+ (active == "winner" ? "" : " hidden")}>
                    <Subscriber project={project} pool={poolContract} winners={winners}/>
                  </div>
                  }
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
          <div class="flex flex-col w-full mt-4 lg:mt-0 lg:order-1 lg:w-2/6 space-y-4">

            <Screen from="lg">
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
            </Screen>

            <NftInfo project={project} pool={poolContract}/>
            <TutorialWidget project={project}></TutorialWidget>

          </div>

          {/* Pool info     */}

          {/* END: Sidebar */}

        </div>
      </div>

    </>
  );
});

export default ProjectLaunchpad;
