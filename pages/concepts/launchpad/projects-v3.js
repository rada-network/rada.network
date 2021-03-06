import  ProjectsList  from "../_components/cards-layout/ProjectsList-v3";
import  ProjectsListFeatured  from "../_components/cards-layout/ProjectsListFeatured";
import  ProjectsListUpcoming  from "../_components/cards-layout/ProjectsListUpcoming-v3";
import  ProjectsListClosed  from "../_components/cards-layout/ProjectsListClosed";

import dynamic from "next/dynamic";
const Layout = dynamic(import("@components/page-layouts/Global"));

export default () => (
  <>
  <Layout extraClass="page-launchverse glassmorphism">
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

              <ProjectsList />

              <ProjectsListUpcoming />

              <ProjectsListClosed />

            </div>
            {/* END: PROJECTS LIST */}

          </div>
        </div>

      </div>
    </div>
  </Layout>
  </>
);

