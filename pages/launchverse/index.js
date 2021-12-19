import React, { useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProjects } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import utils from "@lib/util";
import { useRouter } from "next/router";
import ProjectsList from "@components/project/List/ProjectsList";
import ProjectsListClosed from "@components/project/List/ProjectsListClosed";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Image from "@components/Image";
import { useTheme } from "next-themes";
import useStore from "@lib/useStore"

const Layout = dynamic(import("@components/page-layouts/Global"));

export default function ProjectsIndex({ projects, locale }) {
  const { dataStore } = usePageStore();
  const { locales, asPath } = useRouter();
  const { t, i18n } = useTranslation("launchpad");
  const { theme } = useTheme();
  const store = useStore();
  dataStore.page = "launchverse";
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
  const activeProjects = projects.filter(function (item) {
    return item.status === "active";
  });
  const upcomingProjects = projects.filter(function (item) {
    return item.status === "upcoming";
  });

  const closedProjects = projects.filter(function (item) {
    return item.status === "closed";
  });
  store.updateNetwork("bsc");
  // console.log(projects)
  return (
    <>
      <Layout extraClass="page-launchverse--home glassmorphism" meta={meta}>
        <div className="pane-content">
          <div className="pane-content--sec pane-content-active !w-full">
            <div className="pane-content--sec--main grid scrollbar">
              <div className="w-limiter-xl py-8 lg:py-16 px-2 md:px-4 lg:px-8 xl:px-16">
                {/* LOGO */}
                <div className="flex justify-center">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_CDN +
                      (theme === "light"
                        ? "/images/logos/launchverse.svg"
                        : "/images/logos/launchverse-dark.svg")
                    }
                    alt="RADA LaunchVerse"
                    width={307}
                    height={54}
                    priority
                  />
                  <strong className="sr-only">
                    <span className="">LaunchVerse</span>
                  </strong>
                </div>
                {/* END: LOGO */}

                {/* HEADER */}
                <header className="hero flex flex-col md:flex-row mt-8">
                  <div className="text-center max-w-screen-lg mx-auto px-4 md:px-0">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-black dark:text-white font-semibold font-altsans">
                      DAO-based Launchpad for GameFi and MetaVerse
                    </h1>

                    <p className="text-base md:text-lg leading-relaxed text-black dark:text-white text-opacity-50 dark:text-opacity-50 mt-4 max-w-screen-md mx-auto">
                      {t("Hero Desc")}
                    </p>
                  </div>
                </header>
                {/* END: HEADER */}

                {/* PROJECTS LIST */}
                <div className="mt-8 md:mt-16">
                  {activeProjects.length > 0 && (
                    <ProjectsList
                      key={`active`}
                      title={`Current Project`}
                      projects={activeProjects}
                      isComing={false}
                    />
                  )}

                  {upcomingProjects.length > 0 && (
                    <ProjectsList
                      key={`upcoming`}
                      title={`Upcoming project`}
                      projects={upcomingProjects}
                      isComing={true}
                    />
                  )}

                  <ProjectsListClosed projects={closedProjects} />
                </div>
                {/* END: PROJECTS LIST */}

                {/* FOOTER */}
                <div className="hero flex flex-col md:flex-row justify-center items-center mt-16 max-w-screen-md mx-auto">
                  <div className="text-center md:text-left px-4 md:px-0">
                    <p className="text-2xl md:text-4xl font-altsans mb-4">
                      Want to launch your project on RADA?
                    </p>
                    <a
                      href="https://form.jotform.com/213272840844456"
                      rel="nofollow"
                      target="_blank"
                      className="btn btn-lg btn-default btn-primary"
                    >
                      Apply for Launch
                    </a>
                  </div>
                  <div className="hero-deco mx-auto mt-4">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_CDN +
                        (theme === "light"
                          ? "/images/launchverse-hero.svg"
                          : "/images/launchverse-hero-dark.svg")
                      }
                      alt="RADA LaunchVerse"
                      width={400}
                      height={400}
                      layout="responsive"
                    />
                  </div>
                </div>

                <div className="mt-4 lg:mt-16 flex flex-col md:flex-row justify-center items-center">
                  <small className="text-sm leading-relaxed font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70 max-w-md">
                    © Copyright Rada Network 2021. All rights reserved.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

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
