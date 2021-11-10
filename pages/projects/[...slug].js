import utils from "../../lib/util";
import { Layout } from "../../components/page-layouts/Global";
import { observer } from "mobx-react";
import { HOME_ITEM_TAKE } from "../../config/paging";
import Link from "next/link";
//import {getItemById, getItems} from "../../data/query/getItem";
//import { getPage } from "../../data/query/page";
import React, { useEffect, useRef, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getProject } from "../../data/query/projects"
import { usePageStore } from "../../lib/usePageStore"
import ProjectItem from "../../components/project/Item/Index";

export default function ProjectPage({ slug, project, locale }) {
  const { dataStore } = usePageStore()
  dataStore.page = "project"
  dataStore.lang = locale
  const page = slug.length > 1 ? slug[1] : 'index'

  useEffect(() => {
    console.log('p:', project)
  }, [])

  let meta
  /* Dragger to resize main col */
  const mainRef = useRef()
  const containerRef = useRef()
  return (
    <Layout extraClass="page-home" meta={meta}>

      <div className={`pane-content`} ref={containerRef} >

        <ProjectItem project={project} slug={slug} page={page} />
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