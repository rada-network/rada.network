import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@components/Image";
import fetcher from "@lib/fetchJson";
import CardProjectProgress from "./CardProjectProgress";

export const CardProject = ({
  project,
  pool,
  title,
  status,
  participian,
  tokenLogo,
  token,
  progressToken,
  target,
}) => {
  const { t, i18n } = useTranslation("launchpad");
  const [endDate, setEndDate] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [poolContract, setPoolContract] = useState({"pool_id":'',"contract":null});
  useEffect(() => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const endPool = Date.parse(pool.end_date);
    setEndDate(new Date(endPool).toLocaleDateString("en-US", options));
    if (pool.type == "private"){
      setShowInfo(false)
    }
  }, []);
  if (pool.is_hidden) return null;
  useEffect(() => {
    if (pool !== null && !pool.is_hidden) {
      fetcher(`/api/pools/get-pools?slug=${project.slug}/${pool.slug}`).then(function(res){
        if (!!res.pool_id){
          setPoolContract(res)
        }
      })
    }
  }, []);
  return (
    <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`}>
      <div className={`card-project card-project-sm`}>
        <div className="project-content">
          <div className="project-content--meta">
            <div className="project-title">
              <div className="project-title--token-logo">
                <Image
                  src={tokenLogo}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col items-baseline mb-2 lg:mb-0">
                <div className="project-title--token-name">{title}</div>
                <div className="project-badge">
                  {/* <span className={`label label-${status}`}>{status}</span> */}
                  {pool.type === "private" && <span className={`label label-${pool.type} label--primary-light`}>Private Investor Only</span>}
                  
                </div>
              </div>
            </div>

            <ul className="project-fields">
              <li className="list-pair">
                <span className="list-key">{t("Raise")}</span>
                <span className="list-value font-semibold">
                  {showInfo ? pool.raise.toLocaleString() + " BUSD"  : "N.A"}
                </span>
              </li>
              <li className="list-pair">
                <span className="list-key">{t("Participians")}</span>
                <span className="list-value">
                  <span className="font-semibold">{participian}</span>
                </span>
              </li>
              <li className="list-pair">
                {poolContract.contract && <CardProjectProgress type="short" project={project} pool={{...pool,contract: poolContract.contract,pool_id : poolContract.pool_id}} />}
                
              </li>
              <li className="list-pair">
                <span className="list-key">{t("Ended in")}</span>
                <span className="list-value">
                  <span className="font-semibold">{endDate}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* <div className="project-status">
            <span className={`label label-${status}`}>{status}</span>
          </div> */}
        </div>
        {/* End of project--content */}
      </div>
    </Link>
  );
};

export default CardProject;
