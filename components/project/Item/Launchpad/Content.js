import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import numberFormatter from "@components/utils/numberFormatter";

import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";
import useStore from "@lib/useStore"
import { observer } from "mobx-react";

const LaunchpadContent = observer(function({ project,pool }) {
  const { dataStore } = usePageStore();
  const store = useStore()
  const { t } = useTranslation("launchpad");
  const { account, library } = useActiveWeb3React();  
  const [poolStat, setPoolStat] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const lauchpadContact = useLaunchpadContractV2(pool);
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let stat = await lauchpadContact.poolsStat(pool.id);
        setPoolStat({
          amountBusd : ethers.utils.formatEther(stat.amountBusd),
          amountRir : ethers.utils.formatEther(stat.amountRir),
          approvedBusd : ethers.utils.formatEther(stat.approvedBusd),
          approvedRir : ethers.utils.formatEther(stat.approvedRir),
          depositedToken : ethers.utils.formatEther(stat.depositedToken),
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
  }, [account, lauchpadContact, library,store.loadPoolContent]);
  const raise = pool.raise;
  const tokenPrice = pool.price;
  const progressToken = parseInt(poolStat?.amountBusd) || 0;
  const target = raise;
  const progressPercentage = ((progressToken / target) * 100).toFixed(1);
  const curentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(pool.open_date)).getTime() / 1000
  const endTime = (new Date(pool.end_date)).getTime() / 1000
  let tokennomic = project.token.link.find(function(item){
    return item.group === 'tokenomic'
  })
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      itemProp="description"
    >
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>{project.content.title} - {pool.title}</h3>
        </div>
        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Investment round")}</span>
              <span className="ml-auto list-value font-semibold">
                {/* <div className={`label ${pool.type}`}>{pool.type.toUpperCase()}</div> */}
                <div className={``}>{pool.type.toUpperCase()}</div>
              </span>
            </li>
            
            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Raise")}</span>
              {raise && showInfo ? 
              <span className="ml-auto list-value font-semibold text-right">
                {numberFormatter(raise)} BUSD
              </span>
              :
              <span className="ml-auto list-value font-semibold">
                TBA
              </span>
              }
            </li>
            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Token Price")}</span>
              {tokenPrice ? 
              <span className="ml-auto font-semibold">
              1 {project?.token?.symbol} = {tokenPrice} BUSD
              </span>
              :
              <span className="ml-auto font-semibold">
              TBA
              </span>
              }
            </li>
            {!!pool.open_date && openTime < curentTime && showInfo && 
            <li className="list-pair mb-2">
            <span className="list-key !w-1/2 text-xs md:text-sm capitalize">{t("Progress")}</span>
            <span className="list-value ml-auto">
              <span className="font-semibold">
                {numberFormatter(progressToken)}
              </span>
              <span className="opacity-70">/{numberFormatter(target)}</span>{" "}
              BUSD
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
          <a target="_blank" className="link ml-auto mt-1" href="https://rada.network/en/post/how-to-participate-in-an-ido-on-launchverse">
            {t("How winner will be chosen")}
          </a>
        </div>
      </div>
      {/* end of project-brief */}

      <div className="card card-default card--project-info">
        <div className="card-header">
          <h3>{t("Info", { name: project?.token?.name })}</h3>
        </div>
        <div className="card-body">
          <div className="h-full" 
            dangerouslySetInnerHTML={{ __html: project.content?.description }}
          ></div>

          <div className="flex">
            {!!project.news && <p className="mt-auto pt-4">
              <Link href={`/${dataStore.lang}/launchverse/${project.slug}/research`}>
                <span className="flex">
                  <a className="link" href={`/${dataStore.lang}/launchverse/${project.slug}/research`}>{t("Read full research")}</a>
                  {/* <span className="icon text-2xs ml-0.5"><i className="fa-duotone fa-external-link"></i></span> */}
                </span>
              </Link>
            </p>}
            {!!tokennomic && <p className="mt-auto ml-4 pt-4">
              <span className="flex items-baseline">
                <a href={tokennomic.url} target="_blank" className="link">{project?.token.symbol}&rsquo;s Tokenomics</a>
                <span className="icon text-2xs ml-1 relative bottom-0.5"><i className="fa-duotone fa-external-link"></i></span>
              </span>
            </p>}
          </div>
        </div>
      </div>
    </div>
  );
})


export default LaunchpadContent