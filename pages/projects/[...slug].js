import utils from "../../lib/util";
import { Layout } from "../../components/page-layouts/Global";
import { observer } from "mobx-react";
import { HOME_ITEM_TAKE } from "../../config/paging";
import Link from "next/link";
//import {getItemById, getItems} from "../../data/query/getItem";
//import { getPage } from "../../data/query/page";
import React, { useEffect, useRef, useState } from "react";
 import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



import ProjectLaunchpad from "../../components/project/Launchpad"
import { getProject } from "../../data/query/projects"
import ProjectDetails from "../../components/project/Details";
import ProjectNavbar from "../../components/project/Navbar";
import {usePageStore} from "../../lib/usePageStore"

export default function ProjectPage({ symbol, slug, project,locale }) {
  const {dataStore} = usePageStore()
  dataStore.page = "project"
  dataStore.lang = locale
  const page = slug.length > 1 ? slug[1] : 'index'

  let meta
  /* Dragger to resize main col */
  const mainRef = useRef()
  const containerRef = useRef()
  return (
    <Layout extraClass="page-home" meta={meta}>

      <div className={`pane-content`} ref={containerRef} >
        
        <div className="pane-content--sec pane-content-active !w-full">
          <div className="pane-content--sec--top !block">
            <ProjectNavbar symbol={symbol} page={page} project={project} slug={slug.join('/')} />
          </div>

          <div className="pane-content--sec--main grid scrollbar">
            <div className="page page-full page-project-details !pt-0">
              <div className="w-limiter-lg">
                {page == 'index' && <ProjectLaunchpad project={project} />}
                {page == 'research' && <ProjectDetails project={project} />}
              </div>
            </div>

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

  let props = {
    locale : context.locale,
    symbol: context.params.slug[0],
    slug: context.params.slug,
    project: await getProject({ slug: context.params.slug[0],lang : context.locale })
  }
  props = Object.assign(props,{
    ...await serverSideTranslations(context.locale, ['common', 'navbar','invest']),
  })
  return {
    props,
    revalidate: 60
  }
}