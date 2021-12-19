import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"
import MiniCountdown from "./Countdown";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { ethers, utils } from "ethers";
import fetcher from "@lib/fetchJson";


export const CardProject = ({project,pool, status}) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolStatus, setPoolStatus] = useState("");
  const [poolContract, setPoolContract] = useState({"pool_id":'',"contract":null});
  const {library,account} = useActiveWeb3React()
  useEffect(() => {
    if (pool.open_date !== null && Date.parse(pool.open_date) < Date.parse(new Date()) && Date.parse(new Date()) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    } 

    if (Date.parse(new Date()) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
    if (Date.parse(new Date()) > Date.parse(pool.end_date)){
      setPoolStatus("closed")
    }
    if (pool.open_date == null) {
      setPoolStatus("tba")
    }
  }, [])
  
  useEffect(() => {
    if (pool !== null && !pool.is_hidden) {
      fetcher(`/api/pools/get-pools?slug=${project.slug}/${pool.slug}`).then(function(res){
        if (!!res.pool_id){
          setPoolContract(res)
        }
      })
    }
    
  }, [pool]);

  const [poolStat, setPoolStat] = useState({amountBusd : 0});
  const lauchpadContact = useLaunchpadContractV2({...pool,contract: poolContract.contract,pool_id : poolContract.pool_id});
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let stat = await lauchpadContact.poolsStat(poolContract.pool_id);
        setPoolStat({
          amountBusd : ethers.utils.formatEther(stat.amountBusd),
        })
      } catch (error) {
        //console.log(account)
        //console.log("error to fetch launchpad info", error);
      }
    };
    if (!!lauchpadContact && !!library) {
      fetchLaunchpadInfo();
    }
  }, [lauchpadContact,account,library]);
  const raise = pool.raise;
  const target = !!raise ? raise : 0;
  let progressPercentage
  if (target == 0){
    progressPercentage = 0
  }
  else{
    progressPercentage = ((poolStat.amountBusd / target) * 100).toFixed(1);
  }
  if (pool.is_hidden) return null
  return (
    <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`}>
    <div className={`card-project is-${project.status}`}>
      <div className="project-content relative">

        {!(project.status == "upcoming") && (
          <div className="block">
            <div className={`countdown-mini--wrapper top-0 !bottom-auto`}>
              {poolStatus == "open" && <div>{t("Pool close in")}</div>}
              {poolStatus == "coming" && <div>{t("Sale start in")}</div>}
              {poolStatus == "closed" && <div>{t("Pool closed")}</div>}
              {poolStatus == "tba" && <div>{t("Comming Soon")}</div>}
              {poolStatus == "coming" && <MiniCountdown project={pool} isEndDate={false} />}
              {poolStatus == "open" && <MiniCountdown project={pool} isEndDate={true} />}
              
            </div>
          </div>
        )}
        

        <div className="project-content--meta">
          <div className="project-title flex justify-between items-center">
            <div className="text-xl">
              <h5>{pool.title}</h5>
            </div>
            <div className="project-status -mt-1">
              <span className={`label label-${poolStatus}`}>{poolStatus}</span>
            </div>
          </div>

          <ul className="project-fields">
            <li className="list-pair mt-auto mb-0">
              <span className="list-key">
                {t("Raise")}
              </span>
              <span className="ml-auto list-value font-semibold">
                {pool.raise == 0 ? "TBA" : pool.raise.toLocaleString() + " BUSD"}  
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Token Price")}
              </span>
              <span className="list-value ml-auto"> {pool.price == 0 ? "TBA" : pool.price + " BUSD"}</span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Progress")}
              </span>
              <span className="list-value ml-auto">
                <span className="font-semibold">{poolStat.amountBusd}</span>
                <span className="opacity-70">/{pool.raise == 0 ? "TBA" : pool.raise.toLocaleString() + " BUSD"}</span>
              </span>
            </li>
          </ul>

          <div className="progress-bar mt-2 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full" title={progressPercentage} style={{width: `${(progressPercentage > 100 ? 100 : progressPercentage)+ "%"}`}}>{progressPercentage + "%"}</div>
          </div>

          <div className="project--cta">
            <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} > 
            <a href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
              <span>
               View Details
              </span>
            </a>
            </Link>
          </div>
          {/* End of project-cta */}
        </div>
      </div>
        {/* End of project--content */}
      {/* End of card--body */}
     
      {/* End of card--wrapper */}
    </div> 
    </Link>
  )
}

export default CardProject