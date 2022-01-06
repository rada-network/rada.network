import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"
import MiniCountdown from "./Countdown";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useAuctionSwapContract, useFixedSwapContract, useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { ethers, utils } from "ethers";
import fetcher from "@lib/fetchJson";
import numberFormatter from "@components/utils/numberFormatter";


export const CardProjectProgress = ({project,pool}) => {
  const {t,i18n} = useTranslation("launchpad");
  const {library} = useActiveWeb3React()
  const [poolStat, setPoolStat] = useState({progress : 0});
  let lauchpadContact;
  if (pool.token_sale == "ido"){
    lauchpadContact = useLaunchpadContractV2(pool);
  }
  else if (pool.token_sale == "fixed-swap"){
    lauchpadContact = useFixedSwapContract(pool);
  }
  else if(pool.token_sale == "auction-swap"){
    lauchpadContact = useAuctionSwapContract(pool)
  }
  
  const [showInfo, setShowInfo] = useState(true);
  useEffect(() => {
    if (pool.type == "private"){
      setShowInfo(false)
    }
  }, [])
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let _poolStats = {
          progress : 0,
        }
        if (pool.token_sale == "ido"){
          let stat = await lauchpadContact.poolsStat(pool.pool_id);
          _poolStats = {
            progress : ethers.utils.formatEther(stat.amountBusd),
          }
        }
        else if (pool.token_sale == "fixed-swap"){
          let stat = await lauchpadContact.poolStats(pool.pool_id);
          _poolStats = {
            progress : ethers.utils.formatUnits(stat.totalBidItem,0),
          }
        }
        else if(pool.token_sale == "auction-swap"){
          let stat = await lauchpadContact.poolStats(pool.pool_id);
          _poolStats = {
            progress : ethers.utils.formatUnits(stat.totalBidItem,0),
          }
        }
        
        setPoolStat(_poolStats)
      } catch (error) {
        //console.log(account)
        //console.log("error to fetch launchpad info", error);
      }
    };
    if (!!lauchpadContact && !!library) {
      fetchLaunchpadInfo();
    }
  }, [lauchpadContact,library,pool]);
  const raise = pool.raise;
  const target = !!raise ? raise : 0;
  let progressPercentage
  if (target == 0){
    progressPercentage = 0
  }
  else{
    progressPercentage = ((poolStat.progress / target) * 100).toFixed(1);
  }
  let raise_token = "BUSD"
  let sale_token = project.token.symbol
  if (pool.token_sale == "fixed-swap" || pool.token_sale == "auction-swap"){
    raise_token = pool.token_name
    sale_token = pool.token_name
  }
  return (
    <>
      <ul className="project-fields">
        <li className="list-pair">
          <span className="list-key">
            {t("Progress")}
          </span>
          <span className="list-value ml-auto">
            <span className="font-semibold">{showInfo ? numberFormatter(poolStat?.progress) : "TBA"}</span>
            <span className="opacity-70">/{pool.raise == 0 || !showInfo ? "TBA" : pool.raise.toLocaleString() + ` ${raise_token}`}</span>
          </span>
        </li>
      </ul>

      {showInfo && 
      <div className="progress-bar mt-2 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
        <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full" title={progressPercentage} style={{width: `${(progressPercentage > 100 ? 100 : progressPercentage)+ "%"}`}}>{progressPercentage + "%"}</div>
      </div>
      }
    </>
  )
}

export default CardProjectProgress