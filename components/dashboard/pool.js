import { useEffect, useState } from "react";
import { usePoolInfo } from "@utils/hooks/index";
import useStore from "@lib/useStore";
import { useTranslation } from "next-i18next";
import Link from "next/link"


function Pool({ pool, thumbnail_uri, project_slug,project }) {
  const { t, i18n } = useTranslation("common")
  const store = useStore();
  const { launchpadInfo, loading, fetchPoolInfo } = usePoolInfo({ pool, status: store.devStatus });
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [poolStatus, setPoolStatus] = useState("");
  const [investStatus, setInvestStatus] = useState("");

  useEffect(() => {
    if (pool !== null){
      const optionsDate = { year: "numeric", month: "long", day: "numeric" };
      const endPool = Date.parse(pool.end_date);
      const optionTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      setEndDate(new Date(endPool).toLocaleDateString("en-US", optionsDate));
      setEndTime(new Date(endPool).toLocaleTimeString("en-US", optionTime));
    }
  }, [pool]);


  useEffect(() => {
    if (!loading && !!launchpadInfo) {
      let currentApprovedBusd = launchpadInfo.investor.approved && launchpadInfo.investor.paid ? launchpadInfo.investor.allocationBusd : 0
      if (parseInt(currentApprovedBusd) > 0) {
        setInvestStatus("Success");
      } else {
        if (launchpadInfo.investor.paid && !launchpadInfo.investor.approved){
          setInvestStatus("Waiting")
        }
        else{
          setInvestStatus("Failed");
        }
        
      }
    }
  }, [launchpadInfo, loading])


  useEffect(() => {
    if (pool == null) return false;
    if (pool.open_date !== null && Date.parse(pool.open_date) < Date.parse(new Date()) && Date.parse(new Date()) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    }

    if (Date.parse(new Date()) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
    if (Date.parse(new Date()) > Date.parse(pool.end_date)) {
      setPoolStatus("closed")
    }
    if (pool.open_date == null) {
      setPoolStatus("tba")
    }
  }, [pool]);

  return (
    <>
      <Link href={`/${i18n.language}/launchverse/${project_slug}/${pool?.slug}`} >
        <a href={`/${i18n.language}/launchverse/${project_slug}/${pool?.slug}`} className="block md:flex px-4 py-4 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 hover:bg-gray-200 dark:hover:bg-gray-700">
        <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
          <div className="mr-4 flex items-center">
            <img src={thumbnail_uri} className="w-8 h-8 mr-2 rounded-full" />
            <label className="font-semibold">
              {project.project.content.title}- {pool?.title}
            </label>
          </div>

          <div className="ml-auto">
            <label className="label label--neutral">
              {pool?.type || "Loading"}
            </label>
          </div>
        </div>

        <div className="flex md:w-1/2 md:ml-2">
          <div className="">
            <label className="text-sm">
              <div>{endDate}</div>
              <span className="opacity-60 text-xs block md:mt-0"> {endTime} </span>
            </label>
          </div>

          {poolStatus == "open" ? (
            <div className="ml-auto">
              <label className="lg:ml-auto label label--success">
                Prefunding
              </label>
            </div>
          ) : (
            <>
              {launchpadInfo && investStatus == "Success" && (
                <div className="ml-auto">
                  <label className="lg:ml-auto label label--success">
                    Success
                  </label>
                </div>
              )}

              {launchpadInfo && investStatus == "Failed" && (
                <div className="ml-auto">
                  <label className="lg:ml-auto label label--warning">
                    Failed
                  </label>
                </div>
              )}
              {launchpadInfo && investStatus == "Waiting" && (
                <div className="ml-auto">
                  <label className="lg:ml-auto label label--info">
                    Waiting
                  </label>
                </div>
              )}
            </>
          )
        }
        </div>
        </a>
      </Link>
    </>
  );
}

export default Pool
