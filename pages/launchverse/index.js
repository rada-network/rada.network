import React, { useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProjects } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import utils from "@lib/util";
import { useRouter } from "next/router";
import  ProjectsList  from "@components/project/List/ProjectsList";
import  ProjectsListClosed  from "@components/project/List/ProjectsListClosed";
import dynamic from "next/dynamic";
const Layout = dynamic(import("@components/page-layouts/Global"));

export default function ProjectsIndex ({ projects, locale }){
  const { dataStore } = usePageStore();
  const { locales, asPath } = useRouter();

  dataStore.page = "project";
  dataStore.lang = locale;
  /* Dragger to resize main col */
  const mainRef = useRef();
  const containerRef = useRef();
  const meta = utils.createSiteMetadata(
    {
      page: "launchverse",
      dataStore: dataStore,
    },
    locales,
    asPath
  );
  const activeProjects = projects.filter(function(item){
    return item.status === "active"
  })
  const upcomingProjects = projects.filter(function(item){
    return item.status === "upcomming"
  })
  const closedProjects = projects.filter(function(item){
    return item.status === "closed"
  })
  return (
  <>
    <Layout extraClass="page-launchverse glassmorphism" meta={meta}>
      <div className="pane-content">
        <div className="pane-content--sec pane-content-active !w-full">

          <div className="pane-content--sec--main grid scrollbar">
            <div className="w-limiter-xl py-8 lg:py-16 px-2 md:px-4 lg:px-8 xl:px-16">

              {/* LOGO */}
              <div className="flex justify-center">
                <span className="logo-launchverse"></span>
                <strong className="sr-only">
                  <span className="">LaunchVerse</span>
                </strong>
              </div>
              {/* END: LOGO */}

              {/* HEADER */}
              <header className="hero flex flex-col md:flex-row mt-8">
                <div className="text-center max-w-screen-lg mx-auto">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                  DAO-based Launchpad for GameFi and MetaVerse
                  </h1>

                  <p className="text-base md:text-lg leading-relaxed text-black dark:text-white text-opacity-50 dark:text-opacity-50 mt-4 max-w-screen-md mx-auto">
                    Simplify and popularize crowdfunding in Blockchain, at the same time make initial Token sales equally accessible for the masses — newbies and veterans alike.
                  </p>

                </div>
              </header>
              {/* END: HEADER */}

              {/* PROJECTS LIST */}
              <div className="mt-16">

                <ProjectsList title={`Current Project`} projects={activeProjects} />

                <ProjectsList title={`Upcoming project`} projects={upcomingProjects} />

                <ProjectsListClosed projects={closedProjects} />

              </div>
              {/* END: PROJECTS LIST */}

            </div>
          </div>

        </div>
      </div>
    </Layout>
  </>
  )
};


export async function getStaticProps(context) {
  const projects = await getProjects({ lang: context.locale });
  let props = { projects, locale: context.locale };
  props = Object.assign(props, {
    ...(await serverSideTranslations(context.locale, [
      "common",
      "navbar",
      "invest",
      "launchpad",
    ])),
  });
  return {
    props,
    revalidate: 60,
  };
}