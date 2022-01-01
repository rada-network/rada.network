import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";

import { useTranslation } from "next-i18next";
import { observer } from "mobx-react";
import PoolInfoIdo from "./Actions/PoolInfo"
import PoolInfoFixedSwap from "./FixedSwap/PoolInfo.js"

const LaunchpadContent = observer(function({ project,pool }) {
  const { dataStore } = usePageStore();
  const { t } = useTranslation("launchpad");
  let tokennomic = project.token.link.find(function(item){
    return item.group === 'tokenomic'
  })
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      itemProp="description"
    >
      {pool.token_sale == "ido" && <PoolInfoIdo project={project} pool={pool} /> }
      {pool.token_sale == "fixed-swap" && <PoolInfoFixedSwap project={project} pool={pool} /> }
      <div className="card card-default card--project-info">
        <div className="card-header">
          <h3>{t("Info", { name: project?.token?.name })}</h3>
        </div>
        <div className="card-body">
          <div className="h-full" 
            dangerouslySetInnerHTML={{ __html: project.content.description }}
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