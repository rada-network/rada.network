import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"
import MiniCountdown from "./Countdown";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { ethers, utils } from "ethers";
import fetcher from "@lib/fetchJson";
import numberFormatter from "@components/utils/numberFormatter";
import CardProjectProgress from "./CardProjectProgress";


export const CardProject = ({project,pool, status}) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolStatus, setPoolStatus] = useState("");
  const [poolContract, setPoolContract] = useState({"pool_id":'',"contract":null});
  const [showInfo, setShowInfo] = useState(true);
  useEffect(() => {
    if (pool.open_date !== null && Date.parse(pool.open_date) < Date.parse(pool.current_date) && Date.parse(pool.current_date) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    }

    if (Date.parse(pool.current_date) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
    if (Date.parse(pool.current_date) > Date.parse(pool.end_date)){
      setPoolStatus("closed")
    }
    if (pool.open_date == null) {
      setPoolStatus("tba")
    }
    if (pool.type == "private"){
      setShowInfo(false)
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
  }, []);

  const raise = pool.raise;
  let raise_token = "BUSD"
  let sale_token = project.token.symbol
  if (pool.token_sale == "fixed-swap" || pool.token_sale == "auction-swap"){
    raise_token = pool.token_name
    sale_token = pool.token_name
  }
  if (pool.is_hidden) return null
  return (
    <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`}>
    <div className={`card-project is-${project.status}`}>
      <div className="project-content relative">

        {!(project.status == "upcoming") && (
          <div className="block">
            <div className={`countdown-mini--wrapper top-0 !bottom-auto`}>
              {poolStatus == "open" && <div>{t("Pool closes in")}</div>}
              {poolStatus == "coming" && <div>{t("Sale start in")}</div>}
              {poolStatus == "closed" && <div>{t("pool closed")}</div>}
              {poolStatus == "tba" && <div>{t("Comming Soon")}</div>}
              {poolStatus == "coming" && <MiniCountdown pool={pool} isEndDate={false} />}
              {poolStatus == "open" && <MiniCountdown pool={pool} isEndDate={true} />}

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
                {pool.raise == 0 || !showInfo ? "TBA" : pool.raise.toLocaleString() + ` ${raise_token}`}
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Token Price")}
              </span>
              {pool.price ? 
              <span className="ml-auto list-value">
              1 {sale_token} = {pool.price} BUSD
              </span>
              :
              <span className="ml-auto list-value">
              TBA
              </span>
              }
              {/* <span className="list-value ml-auto"> {pool.price == 0 ? "TBA" : pool.price + " BUSD"}</span> */}
            </li>
          </ul>
          {poolContract.contract && <CardProjectProgress project={project} pool={{...pool,contract: poolContract.contract,pool_id : poolContract.pool_id}} />
          }
          <div className="project--cta">
            <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} >
            <a href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
              <span>
               {t("View Details")}
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