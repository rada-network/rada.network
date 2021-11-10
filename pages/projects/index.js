import { Layout } from "../../components/page-layouts/Global";
import React, { useRef } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProjectsList } from "@components/project/List/Index";

import { getProjects } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";

export default function ProjectsIndex({ projects, locale }) {
    let meta = {}
    const { dataStore } = usePageStore()
    dataStore.page = "project"
    dataStore.lang = locale
    /* Dragger to resize main col */
    const mainRef = useRef()
    const containerRef = useRef()
    meta.title = "Launchpad Projects"
    return (
        <Layout extraClass="page-home" meta={meta}>
            <div className={`pane-content`} ref={containerRef} >
                <ProjectsList projects={projects} />
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const projects = await getProjects({ lang: context.locale })
    let props = { projects, locale: context.locale }
    props = Object.assign(props, {
        ...await serverSideTranslations(context.locale, ['common', 'navbar', 'invest']),
    })
    return {
        props,
        revalidate: 60
    }
}