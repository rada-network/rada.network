import Link from "next/link";
import { usePageStore } from "@lib/usePageStore";

import { useTranslation } from "next-i18next";
import { observer } from "mobx-react";
import PoolInfoIdo from "./Ido/PoolInfo"
import PoolInfoFixedSwap from "./FixedSwap/PoolInfo.js"
import PoolInfoAuctionSwap from "./AuctionSwap/PoolInfo.js"

const LaunchpadContent = observer(function({ project,pool }) {
  const { dataStore } = usePageStore();
  const { t } = useTranslation("launchpad");
  let tokennomic = project.token.link.find(function(item){
    return item.group === 'tokenomic'
  })
  return (
    <>
      {pool.token_sale == "ido" && <PoolInfoIdo project={project} pool={pool} /> }
      {pool.token_sale == "fixed-swap" && <PoolInfoFixedSwap project={project} pool={pool} /> }
      {pool.token_sale == "auction-swap" && <PoolInfoAuctionSwap project={project} pool={pool} /> }
    </>

  );
})


export default LaunchpadContent