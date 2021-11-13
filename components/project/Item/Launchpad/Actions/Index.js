import {useState, useEffect} from "react"
import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import SubscribeSwapToken from "./SubscribeSwapToken"
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import ProjectOpening from "./Opening";
import useStore from "@lib/useStore";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContract } from "@utils/hooks/useContracts";
import {utils} from "ethers"

const LaunchpadActions = ({ project }) => {
  const store = useStore()

  const curentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(project.open_date)).getTime() / 1000
  const endTime = (new Date(project.end_date)).getTime() / 1000

  const {account} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(null)
  const lauchpadContact = useLaunchpadContract(project.swap_contract)
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let tokenAddress = await lauchpadContact.tokenAddress()
        let bUSDAddress = await lauchpadContact.bUSDAddress()
        let rirAddress = await lauchpadContact.rirAddress()
        let startDate = await lauchpadContact.startDate()
        let endDate = await lauchpadContact.endDate()
        let tokensForSale = await lauchpadContact.tokensForSale()
        let tokenPrice = await lauchpadContact.tokenPrice()
        let tokensAllocated = await lauchpadContact.tokensAllocated()
        let individualMinimumAmount = await lauchpadContact.individualMinimumAmount()
        let individualMaximumAmount = await lauchpadContact.individualMaximumAmount()
        let updateInfo = {
          startDate : utils.formatEther(startDate),
          endDate : utils.formatEther(endDate),
          tokensForSale : utils.formatEther(tokensForSale),
          tokenPrice : utils.formatEther(tokenPrice),
          tokensAllocated : utils.formatEther(tokensAllocated),
          individualMinimumAmount : utils.formatEther(individualMinimumAmount),
          individualMaximumAmount : utils.formatEther(individualMaximumAmount),
          tokenAddress : utils.getAddress(tokenAddress),
          bUSDAddress : utils.getAddress(bUSDAddress),
          rirAddress : utils.getAddress(rirAddress),
        }
        setLaunchpadInfo(updateInfo)
        console.log(updateInfo)
      } catch (error) {
        console.log("error to fetch launchpad info",error)
      }
    }
    if (!!account && !!lauchpadContact && account !== ""){
      fetchLaunchpadInfo()
    }
    else{
      setLaunchpadInfo(null)
    }
  }, [account,lauchpadContact])
  let wProject = {launchpadInfo,...project}
  if (openTime > curentTime) {
    return <WhitelistCountdown project={wProject} />
  }
  
  if (openTime < curentTime && curentTime < endTime) {
    return (
      <>
        {store.kyc.isKYC && launchpadInfo ?
          <SubscribeSwapToken project={wProject} />
          :
          <div className="card-default project-main-actions no-padding mb-10 overflow-hidden">
            <div className="card-body no-padding">
              <div className="flex flex-col">
                <div className="">
                  <Timeline step="2" />
                </div>

                <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">
                    <SubscribeLaunchpad project={wProject} />
                </div>

              </div>

            </div>

          </div>
        }
        
      </>
    )
    return <SubscribeLaunchpad project={project} />
  }
  return null;
}


export default LaunchpadActions