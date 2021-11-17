import { Layout } from "../../components/page-layouts/Global";
import React, { useRef } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ProjectsList } from "@components/project/List/Index";

import { getProjects } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import utils from "@lib/util";
import { useRouter } from "next/router";

export default function ProjectsIndex({ projects, locale }) {
    const { dataStore } = usePageStore()
    const { locales, asPath } = useRouter();

    dataStore.page = "project"
    dataStore.lang = locale
    /* Dragger to resize main col */
    const mainRef = useRef()
    const containerRef = useRef()
    const meta = utils.createSiteMetadata(
        {
            page: "Project",
            dataStore: dataStore,
        },
        locales,
        asPath
    );

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
        ...await serverSideTranslations(context.locale, ['common', 'navbar', 'invest','launchpad']),
      })
    return {
        props,
        revalidate: 60
    }
}