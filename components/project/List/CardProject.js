import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"
import MiniCountdown from "./Countdown";
import { useState, useEffect } from "react";

export const CardProject = ({project,pool,title, link, img, status, statusName, raise, tokenLogo, tokenPrice, countdown, token, progressToken, target, progressPercentage, type, network, desc, isComing}) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolStatus, setPoolStatus] = useState("coming");

  useEffect(() => {
    console.log(project)
    if (Date.parse(pool.open_date) < Date.parse(new Date()) && Date.parse(new Date()) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    } 

    if (Date.parse(new Date()) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
  }, [])

  return (
    <div className={`card-project is-${project.status}`}>
      <div className="project-content relative">

        {!(project.status == "upcoming") && (
          <div className="block">
            <div className={`countdown-mini--wrapper top-0 !bottom-auto`}>
              <div>{poolStatus == "open" ? "Prefunding" : "Sale start in"}</div>
              <MiniCountdown project={pool} isEndDate={true}/>
            </div>
          </div>
        )}
        

        <div class="project-content--meta">
          <div className="project-title flex justify-between items-center">
            <div className="text-xl">
              <h5>{pool.title}</h5>
            </div>
            <div className="project-status -mt-1">
              <span className={`label label-${isComing ? "coming" : poolStatus}`}>{ isComing ? "Upcoming" : (poolStatus == "open" ? "Open" : "Coming")}</span>
            </div>
          </div>

          <ul className="project-fields">
            <li className="list-pair mt-auto mb-0">
              <span className="list-key">
                {t("Raise")}
              </span>
              <span className="ml-auto list-value font-semibold">
                {raise == 0 ? "TBA" : raise.toLocaleString() + " BUSD"}  
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Token Price")}
              </span>
              <span className="list-value ml-auto"> {tokenPrice == 0 ? "TBA" : tokenPrice + " BUSD"}</span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Progress")}
              </span>
              <span className="list-value ml-auto">
                <span className="font-semibold">0</span>
                <span className="opacity-70">/{raise == 0 ? "TBA" : raise.toLocaleString() + " BUSD"}</span>
              </span>
            </li>
          </ul>

          <div className="progress-bar mt-2 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full" title={progressPercentage} style={{width: `${progressPercentage}`}}>{progressPercentage}</div>
          </div>

          <div className="project--cta">
            <Link href={`/${i18n.language}/launchverse/${project.slug}#${pool.slug}`} > 
            <a href={`/${i18n.language}/launchverse/${project.slug}#${pool.slug}`} className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
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
  )
}

export default CardProject