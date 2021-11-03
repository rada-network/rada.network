import utils from "../../lib/util";
import { Layout } from "../../components/page-layouts/Global";
import { observer } from "mobx-react";
import { HOME_ITEM_TAKE } from "../../config/paging";
//import {getItemById, getItems} from "../../data/query/getItem";
//import { getPage } from "../../data/query/page";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash"
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import store from "store"
import { usePageStore } from "../../lib/usePageStore";
import { getTokenById } from "../../data/query/getTokenById";
//import { ProjectsList } from "../../components/card-layouts/concepts/launchpad/ProjectsList";
import { ProjectsList } from "../../components/card-layouts/ProjectsList";

import { getProjects } from "../../data/query/projects";

export default function ProjectsIndex({ projects }) {
    let meta
    /* Dragger to resize main col */
    const mainRef = useRef()
    const containerRef = useRef()
    return (
        <Layout extraClass="page-home" meta={meta}>
            <div className={`pane-content`} ref={containerRef} >
                <div className="pane-content--sec pane-content-active !w-full">
                    <div className="pane-content--sec--top !block">

                    </div>

                    <div className="pane-content--sec--main grid scrollbar">
                        <div className="page page-full page-project-details !pt-0">
                            <ProjectsList projects={projects} />
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const projects = await getProjects()
    console.log('Projects: ', projects)

    const props = { projects }
    return {
        props,
        revalidate: 60
    }
}