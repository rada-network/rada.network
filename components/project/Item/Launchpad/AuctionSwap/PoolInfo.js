import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useAuctionSwapContract } from "@utils/hooks/useContracts";
import numberFormatter from "@components/utils/numberFormatter";

import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";
import useStore from "@lib/useStore"
import { observer } from "mobx-react";

const PoolInfo = observer(function({ project,pool }) {
  const { dataStore } = usePageStore();
  const store = useStore()
  const { t } = useTranslation("launchpad");
  const { account, library } = useActiveWeb3React();  
  const [poolStat, setPoolStat] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const lauchpadContact = useAuctionSwapContract(pool);
  console.log(lauchpadContact)
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let stat = await lauchpadContact.poolStats(pool.id);
        console.log(stat)
        setPoolStat({
          totalSold : parseInt(ethers.utils.formatUnits(stat.totalBidItem,0))
        })
      } catch (error) {
        //console.log(account)
        console.log("error to fetch launchpad info", error);
      }
    };
    if (!!lauchpadContact) {
      fetchLaunchpadInfo();
    }
    if (pool.type == "private"){
      setShowInfo(false)
    }
    else{
      setShowInfo(true)
    }
  }, [account, lauchpadContact, library,store.loadPoolContent]);
  const raise = pool.raise;
  const tokenPrice = pool.price;
  const progressToken = poolStat?.totalSold || 0;
  const target = raise;
  const progressPercentage = ((progressToken / target) * 100).toFixed(1);
  const curentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(pool.open_date)).getTime() / 1000
  let raise_token = "BUSD"
  let sale_token = project.token.symbol
  if (pool.token_sale == "fixed-swap" || pool.token_sale == "auction-swap"){
    raise_token = pool.token_name
    sale_token = pool.token_name
  }
  return (
    <div className="card card-default project-brief">
      <div className="card-header flex items-start">
        <h3>{project.content.title} - {pool.title}</h3>
        <a className="btn flex btn-default !text-xs flex-shrink-0" target="_blank" 
        href="https://rada.network/en/post/how-to-participate-in-an-ido-on-launchverse">
            <i className="fas fa-question-circle mr-2 opacity-50"></i> How to</a>
      </div>
      <div className="card-body flex flex-col">
        <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
          <li className="list-pair mb-2">
            <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Investment round")}</span>
            <span className="ml-auto list-value font-semibold text-right">
              {/* <div className={`label ${pool.type}`}>{pool.type.toUpperCase()}</div> */}
              <div className={``}>{pool.type.toUpperCase()}</div>
            </span>
          </li>
          
          <li className="list-pair mb-2">
            <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Raise")}</span>
            {raise && showInfo ?
            <span className="ml-auto list-value font-semibold text-right">
              {numberFormatter(raise)} {raise_token}
            </span>
            :
            <span className="ml-auto list-value font-semibold">
              {pool.type == "private" ? "PRIVATE" : "TBA"}
            </span>
            }
          </li>
          <li className="list-pair mb-2">
            <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Token Price")}</span>
            {tokenPrice ? 
            <span className="ml-auto font-semibold">
            1 {sale_token} = {tokenPrice} BUSD
            </span>
            :
            <span className="ml-auto font-semibold">
            TBA
            </span>
            }
          </li>
          {/* <li className="list-pair mb-2">
            <span className="list-key !w-1/2 text-xs md:text-sm capitalize">Method</span>
            
            <span className="ml-auto font-semibold">
              Overflow, FCFS
            </span>

          </li> */}
          {!!pool.open_date && openTime < curentTime && showInfo &&
          <li className="list-pair mb-2">
          <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Progress")}</span>
          <span className="list-value ml-auto">
            <span className="font-semibold">
              {numberFormatter(progressToken)}
            </span>
            <span className="opacity-70">/{numberFormatter(target)}</span>{" "}
            {raise_token}
          </span>
          </li>
          }
        </ul>
        {!!pool.open_date && openTime < curentTime && showInfo &&
        <>
          <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div
              className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full"
              style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
            >
              {progressPercentage}%
            </div>
          </div>
          
        </> 
        }
      </div>
    </div>
  );
})


export default PoolInfo