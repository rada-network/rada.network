import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@components/Image";

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
  useEffect(() => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const endPool = Date.parse(pool.end_date);
    setEndDate(new Date(endPool).toLocaleDateString("en-US", options));
    if (pool.type == "private"){
      setShowInfo(false)
    }
  }, []);
  if (pool.is_hidden) return null;
  
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
              <div className="flex items-baseline">
                <div className="project-title--token-name">{title}</div>
              </div>
            </div>

            <ul className="project-fields">
              <li className="list-pair">
                <span className="list-key">{t("Raise")}</span>
                <span className="list-value font-semibold">
                  {showInfo ? pool.raise.toLocaleString() + " BUSD"  : "NA"}
                </span>
              </li>
              <li className="list-pair">
                <span className="list-key">{t("Participians")}</span>
                <span className="list-value">
                  <span className="font-semibold">{participian}</span>
                </span>
              </li>
              <li className="list-pair">
                <span className="list-key">{t("Progress")}</span>
                <span className="list-value">
                  <span className="font-semibold">{showInfo ? progressToken : "NA"}</span>
                  <span className="opacity-70">/{showInfo ? target : "NA"}</span> {token}
                </span>
              </li>
              <li className="list-pair">
                <span className="list-key">{t("Ended in")}</span>
                <span className="list-value">
                  <span className="font-semibold">{endDate}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="project-status">
            <span className={`label label-${status}`}>{status}</span>
          </div>
        </div>
        {/* End of project--content */}
      </div>
    </Link>
  );
};

export default CardProject;
