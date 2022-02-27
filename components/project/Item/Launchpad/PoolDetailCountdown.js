import ProjectCountdown from "./AuctionSwap/Countdown";
import OpenDate from "./OpenDate";
import { useTranslation } from "react-i18next";

const PoolDetailCountdown = ({ project, pool, isEndDate, open_date, end_date, title, whitelist_date }) => {
  const { t, i18n } = useTranslation("launchpad")

  return (
    <div className="card-header flex-col md:flex-row items-start md:items-end !w-auto rounded-t-md">
      <div className="flex flex-col">
        <strong className="flex items-center mb-2 font-medium">
          <span className="icon mr-2">
            <i class="fa-duotone fa-clock"></i>
          </span>
          <span className="text-color-title">{title}</span>
        </strong>
        <ProjectCountdown project={project} pool={pool} isEndDate={isEndDate} />
      </div>

      <div className="flex flex-col">
      
        {open_date && (
          <div className="flex mt-1 opacity-60 text-sm justify-between">
            <span className="w-16">{t("Openat")}</span>
            <OpenDate time={open_date} />
          </div>
        )}
        
        {end_date && (
          <div className="flex mt-1 opacity-60 text-sm justify-between">
            <span className="w-16">{t("Closeat")}</span>
            <OpenDate time={end_date} />
          </div>
        )}

        {whitelist_date && (
          <div className="flex mt-1 opacity-60 text-sm justify-between">
            <span className="w-20">{t("Announce at")}</span>
            <OpenDate time={whitelist_date} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PoolDetailCountdown;