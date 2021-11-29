import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";
import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import numberFormatter from "@components/utils/numberFormatter";

import { utils } from "ethers";
import { useTranslation } from "next-i18next";

export default function LaunchpadContent({ project }) {
  const { dataStore } = usePageStore();
  const { t } = useTranslation("launchpad");
  const { account, library } = useActiveWeb3React();
  const [launchpadInfo, setLaunchpadInfo] = useState(null);
  const lauchpadContact = useLaunchpadContractV2(project.swap_contract);
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let totalSubBUSD = await lauchpadContact.totalSubBUSD();
        let updateInfo = {
          totalSubBUSD: utils.formatEther(totalSubBUSD),
        };
        setLaunchpadInfo(updateInfo);
      } catch (error) {
        //console.log(account)
        console.log("error to fetch launchpad info", error);
      }
    };
    if (!!library && !!lauchpadContact && account !== "") {
      fetchLaunchpadInfo();
    }
  }, [account, lauchpadContact, library]);
  const raise = project.raise;
  const tokenPrice = project.price;
  const progressToken = parseInt(launchpadInfo?.totalSubBUSD) || 0;
  const target = raise;
  const progressPercentage = ((progressToken / target) * 100).toFixed(1);
  const curentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(project.open_date)).getTime() / 1000
  const endTime = (new Date(project.end_date)).getTime() / 1000
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      itemProp="description"
    >
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>{t("Launchverse Overview")}</h3>
        </div>
        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
          <li className="list-pair mb-2">
              <span className="list-key">{t("Investment round")}</span>
              <span className="ml-auto list-value font-semibold">
                <div className={`label ${project.type}`}>{project.type.toUpperCase()}</div>
              </span>
            </li>
            
            <li className="list-pair mb-2">
              <span className="list-key">{t("Raise")}</span>
              {raise ? 
              <span className="ml-auto list-value font-semibold">
                {numberFormatter(raise)} BUSD
              </span>
              :
              <span className="ml-auto list-value font-semibold">
                TBA
              </span>
              }
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">{t("Token Price")}</span>
              {tokenPrice ? 
              <span className="ml-auto font-semibold">
              {tokenPrice} BUSD
              </span>
              :
              <span className="ml-auto font-semibold">
              TBA
              </span>
              }
            </li>
            {!!project.open_date && openTime < curentTime && 
            <li className="list-pair mb-2">
            <span className="list-key">{t("Progress")}</span>
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
          {!!project.open_date && openTime < curentTime && 
          <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-5 rounded-full">
            <div
              className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-5 bg-green-600 rounded-full"
              style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
            >
              {progressPercentage}%
            </div>
          </div>
          }
        </div>
      </div>
      {/* end of project-brief */}

      <div className="card card-default project-process">
        <div className="card-header">
          <h3>{t("Info", { name: project?.token?.name })}</h3>
        </div>
        <div className="card-body">
          <div
            dangerouslySetInnerHTML={{ __html: project.content?.description }}
          ></div>

          <div className="flex">
            {!!project.news && <p className="mt-auto pt-4">
              <Link href={`/${dataStore.lang}/launchverse/${project.slug}/research`}>
                <span className="flex">
                  <i class="mr-1 text-xs opacity-60 fas fa-arrow-right"></i>
                  <a className="link" href={`/${dataStore.lang}/launchverse/${project.slug}/research`}>{t("Read full research")}</a>
                  {/* <span className="icon text-2xs ml-0.5"><i className="fa-duotone fa-external-link"></i></span> */}
                </span>
              </Link>
            </p>}
            <p className="mt-auto ml-4 pt-4">
              <Link href="">
                <span className="flex">
                  <i class="mr-1 text-xs opacity-60 fas fa-external-link-alt"></i>
                  <a href="" className="link">PRL&rsquo;s Tokenomics</a>
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
