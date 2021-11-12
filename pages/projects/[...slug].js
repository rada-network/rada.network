import { Layout } from "@components/page-layouts/Global";
import { observer } from "mobx-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {utils} from "ethers"

import { getProject } from "@data/query/projects"
import { usePageStore } from "@lib/usePageStore"
import ProjectItem from "@components/project/Item/Index";
import { WalletProfile } from "../../components/Wallet";
import useActiveWeb3React from "../../utils/hooks/useActiveWeb3React";
import useStore from "@lib/useStore"
import { useLaunchpadContract } from "../../utils/hooks/useContracts";

export default function ProjectPage({ slug, project, locale }) {
  const { dataStore } = usePageStore()
  dataStore.page = "project"
  dataStore.lang = locale
  const page = slug.length > 1 ? slug[1] : 'index'
  const {account} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(null)
  const store = useStore()
  const lauchpadContact = useLaunchpadContract(project.swap_contract)
  useEffect(() => {
    if (!account){
      store?.wallet.showConnect(true)
    }
  }, [account])
  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      try {
        let tokenAddress = await lauchpadContact.tokenAddress()
        let bUSDAddress = await lauchpadContact.bUSDAddress()
        let rirAddress = await lauchpadContact.rirAddress()
        let startDate = await lauchpadContact.startDate()
        let endDate = await lauchpadContact.endDate()
        let tokensForSale = await lauchpadContact.tokensForSale()
        let tokenPrice = await lauchpadContact.tokenPrice()
        let tokensAllocated = await lauchpadContact.tokensAllocated()
        let individualMinimumAmount = await lauchpadContact.individualMinimumAmount()
        let individualMaximumAmount = await lauchpadContact.individualMaximumAmount()
        let updateInfo = {
          startDate : utils.formatEther(startDate),
          endDate : utils.formatEther(endDate),
          tokensForSale : utils.formatEther(tokensForSale),
          tokenPrice : utils.formatEther(tokenPrice),
          tokensAllocated : utils.formatEther(tokensAllocated),
          individualMinimumAmount : utils.formatEther(individualMinimumAmount),
          individualMaximumAmount : utils.formatEther(individualMaximumAmount),
          tokenAddress : utils.getAddress(tokenAddress),
          bUSDAddress : utils.getAddress(bUSDAddress),
          rirAddress : utils.getAddress(rirAddress),
        }
        setLaunchpadInfo(updateInfo)
        console.log(updateInfo)
      } catch (error) {
        console.log("error to fetch launchpad info",error)
      }
    }
    if (account && !!lauchpadContact){
      fetchLaunchpadInfo()
    }
  }, [account,lauchpadContact])
  let meta = {
    title : project?.content?.title + "",
    description : project?.content?.description + "",
    "og:description" : project?.content?.description + "",
    "og:image" : project?.thumbnail_uri + ""
  }
  /* Dragger to resize main col */  
  const containerRef = useRef()
  let wProject = {launchpadInfo,...project}
  return (
    <Layout extraClass="page-home" meta={meta}>

      <div className={`pane-content`} ref={containerRef} >
        <WalletProfile />
        {launchpadInfo && <ProjectItem project={wProject} slug={slug} page={page} />}
      </div>
    </Layout>
  )
}


export async function getStaticPaths() {
  return {
    paths: [
    ],
    fallback: 'blocking',
  }
}


export async function getStaticProps(context) {
  let project = await getProject({ slug: context.params.slug[0], lang: context.locale })
  if (Object.keys(project).length === 0) {
    return {
      notFound: true
    }
  }
  let props = {
    locale: context.locale,
    slug: context.params.slug,
    project: await getProject({ slug: context.params.slug[0], lang: context.locale })
  }
  props = Object.assign(props, {
    ...await serverSideTranslations(context.locale, ['common', 'navbar', 'invest']),
  })
  return {
    props,
    revalidate: 60
  }
}