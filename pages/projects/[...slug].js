import utils from "../../lib/util";
import { Layout } from "../../components/page-layouts/Global";
import { observer } from "mobx-react";
import { HOME_ITEM_TAKE } from "../../config/paging";
import Link from "next/link";
//import {getItemById, getItems} from "../../data/query/getItem";
//import { getPage } from "../../data/query/page";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash"
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import store from "store"
import { usePageStore } from "../../lib/usePageStore";
import { getTokenById } from "../../data/query/getTokenById";
import TokenMeta from "../../components/cards/concepts/launchpad/TokenMeta";
import MainActions from "../../components/cards/concepts/launchpad/MainActions";

import ProjectLaunchpad from "../../components/project/Launchpad"
import { getProject } from "../../data/query/projects"
import ProjectDetails from "../../components/project/Details";
import ProjectNavbar from "../../components/project/Navbar";

export default function ProjectPage({ symbol, page, project }) {
  console.log('page: ', symbol)

  let meta
  /* Dragger to resize main col */
  const mainRef = useRef()
  const containerRef = useRef()
  return (
    <Layout extraClass="page-home" meta={meta}>

      <div className={`pane-content`} ref={containerRef} >
        <div className="pane-center--main">
          <div className="pane-content">
            <ProjectNavbar symbol={symbol} page={page} project={project} />
            {page == 'index' && <ProjectLaunchpad />}
            {page == 'research' && <ProjectDetails />}
          </div>
        </div>
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

  const props = {
    symbol: context.params.slug[0],
    page: context.params.slug.length > 1 ? context.params.slug[1] : 'index',
    project: await getProject({ symbol: context.params.slug[0] })
  }
  return {
    props,
    revalidate: 60
  }
}