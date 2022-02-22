import React, { useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProjects } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import utils from "@lib/util";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Image from "@components/Image";
import { useTheme } from "next-themes";
import useStore from "@lib/useStore";
import ProjectsListSecret from "@components/project/List/ProjectListSecret";

const Layout = dynamic(import("@components/page-layouts/Global"));
const ProjectsList = dynamic(() => import("@components/project/List/ProjectsList"));
const ProjectsListClosed = dynamic(() => import("@components/project/List/ProjectsListClosed"));

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

  const secretProjects = projects.filter(function (item) {
    return item.status === "secret";
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
                      {t("DAO-based Launchpad for GameFi and MetaVerse")}
                    </h1>

                    <p className="text-base md:text-lg leading-relaxed text-black dark:text-white text-opacity-50 dark:text-opacity-50 mt-4 max-w-screen-md mx-auto">
                      {t("Hero Desc")}
                    </p>
                  </div>
                </header>
                {/* END: HEADER */}

                {/* BANNER */}
                {/* <div className="mt-8 md:mt-16">
                  {secretProjects.length > 0 && (
                    <ProjectsListSecret
                      key={`active`}
                      title={`Secret Project`}
                      projects={secretProjects}
                      isComing={false}
                    />
                  )}
                </div> */}
                {/* END: BANNER */}

                {/* BANNER */}
                <div className="mt-8 md:mt-16">
                  <div className="projects-section">
                    <div className="projects-section--subheader">
                      <h3 className="">Current Project</h3>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                      <div className="">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/banners/dfh-ino.png"
                          }
                          alt="DefiHorse INO"
                          width={1600}
                          height={947}
                          className="rounded-t-lg"
                        />
                      </div>
                      <div className="p-8 bg-gradient-to-r from-green-700 to-green-800 text-white flex justify-center">
                        <div className="w-32 h-32 mr-8">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_CDN +
                              "project-logos/defihorse.png"
                            }
                            alt="DefiHorse"
                            width={147}
                            height={115}
                            className="rounded-t-lg"
                          />
                        </div>

                        <div>
                          <p className="opacity-80 uppercase font-medium">Exclusive on RADA</p>
                          <h4 className="text-2xl font-medium flex items-center">
                            The first-ever NFT Sale of DefiHorse
                          </h4>
                          <p className="opacity-80 mt-2">The super-project attracting millions of event participants from Racers around the world officially opens the first round of NFT sale (INO). Ready to become the proud owner of the remarkable steeds?</p>
                        </div>

                        <div className="flex flex-col flex-shrink-0 ml-8">

                          <div className="mb-6">
                            {/* COUNTDOWN */}
                            <div className="legend text-2xs uppercase tracking-widest opacity-60 mb-2">
                              <h5 className="bg-green-800">Time until sale</h5>
                            </div>

                            <div className="countdown--mini text-lg">
                              <div className="countdown--mini--body !py-0 countdown--mini--body--day">
                                <time>7</time>
                                <span className="">d</span>
                              </div>
                              <div className="countdown--mini--body !py-0 countdown--mini--body--hour">
                                <time>12</time>
                                <span className="">h</span>
                              </div>
                              <div className="countdown--mini--body !py-0 countdown--mini--body--minute">
                                <time>34</time>
                                <span className="">m</span>
                              </div>
                              <div className="countdown--mini--body !py-0 countdown--mini--second">
                                <time>52</time>
                                <span className="">s</span>
                              </div>
                            </div>
                          </div>

                          <a href="#" className="border-0 rounded-md bg-white bg-opacity-90 px-4 py-2">
                            <span className="text-base text-gray-700 font-medium w-full justify-center flex">View Details</span>
                          </a>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
                {/* END: BANNER */}


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

                {/* SECTION 3 */}
                <div className="mt-16">
                  <div className="text-center">
                    <h2 className="text-3xl md:text-3xl lg:text-4xl leading-tight text-black dark:text-white font-medium font-altsans">
                      The LaunchVerse&nbsp;
                      <strong className="block text-yellow-400">
                        where everyone is welcome
                      </strong>
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/shield-hexa-dark.svg"
                          }
                          alt="Revolution"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        We revolutionize blockchain fundraising with our
                        DAO-based AngelList modelled Launchpad.
                      </p>
                    </div>

                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/bolt-hexa-dark.svg"
                          }
                          alt="LaunchVerse"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        The LaunchVerse creates high value for both startup
                        projects and the investor community.
                      </p>
                    </div>

                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/net-hexa-dark.svg"
                          }
                          alt="MetaVerse"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        Different, diverse but united in the MetaVerse, projects
                        across all blockchains are welcome on the LaunchVerse.
                      </p>
                    </div>

                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/scale-hexa-dark.svg"
                          }
                          alt="Fair and transparent "
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        We provide fair and transparent initial token and nft
                        launches for projects with carefully structured
                        allocation models.
                      </p>
                    </div>

                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/incubate-hexa-dark.svg"
                          }
                          alt="#MetaVerse and #GameFi industries"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        We help incubate early stage projects across the
                        #MetaVerse and #GameFi industries.
                      </p>
                    </div>

                    <div
                      className="
                                flex flex-col items-stretch justify-center p-4 md:p-8
                                shadow-sm
                                rounded-lg h-full bg-white dark:bg-gray-700
                              "
                    >
                      <div className="flex-shrink-0 text-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_CDN +
                            "/images/icons/dao-hexa-dark.svg"
                          }
                          alt="Share2Earn and Contribute2Earn"
                          width={60}
                          height={60}
                        />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4 text-center">
                        We help connect projects to the world through our
                        community and innovative Share2Earn and Contribute2Earn
                        models.
                      </p>
                    </div>
                  </div>
                </div>
                {/* END: SECTION 3 */}

                {/* FOOTER */}
                <div className="hero flex flex-col md:flex-row justify-center items-center mt-16 max-w-screen-md mx-auto">
                  <div className="text-center md:text-left px-8 md:px-0">
                    <p className="text-2xl md:text-4xl font-altsans mb-4 leading-relaxed md:leading-normal font-medium">
                      {t("Want to launch your project on RADA?")}
                    </p>
                    <a
                      href="https://form.jotform.com/213272840844456"
                      rel="nofollow"
                      target="_blank"
                      className="btn btn-lg btn-default btn-primary"
                    >
                      <span className="btn--text">{t("Apply for Launch")}</span>
                      <span class="icon"><i class="fa-duotone fa-square-arrow-up-right"></i></span>
                    </a>
                  </div>
                  <div className="hero-deco mx-auto mt-4">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_CDN +
                        (theme === "light"
                          ? "/images/launchverse-hero.png"
                          : "/images/launchverse-hero-dark.png")
                      }
                      alt="RADA LaunchVerse"
                      width={300}
                      height={300}
                      layout="responsive"
                    />
                  </div>
                </div>

                <div className="mt-4 lg:mt-16 flex flex-col md:flex-row justify-center items-center">
                  <small className="text-sm leading-relaxed font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70 max-w-md">
                    © Copyright RADA Network 2021. All rights reserved.
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
