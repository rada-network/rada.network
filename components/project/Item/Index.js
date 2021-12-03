import ProjectNavbar from "./Navbar";
import ProjectLaunchpad from "./Launchpad";
import ProjectDetails from "./Details";
import ProjectShare2Earn from "./Share2Earn";
import { useEffect, useRef } from "react";
import TocSideBar from "pages/launchverse/toc/TocSidebar";
import FloatButton from "pages/launchverse/toc/FloatingButton";
import Screen from "../../utils/Responsive";

export default function ProjectItem({ project, page, slug }) {
  const symbol = project.slug;
  const ref = useRef()
  return (
    <>
      <div
        className="pane-content--sec pane-content-active !w-full"
        itemScope
        itemType="https://schema.org/Project"
      >
        <div className="pane-content--sec--top">
          <ProjectNavbar
            symbol={symbol}
            page={page}
            project={project}
            slug={slug.join("/")}
          />
        </div>

        <div className="pane-content--sec--main grid scrollbar" ref={ref}>
          <div 
            className={`page page-full page-project-details !p-0` 
            + (page == "research" ? " page-research-details" : "") 
            + (page == "share2earn" ? " page-project-share2earn" : "")} 
            
          >
            <div className="w-limiter-lg">
              {page == "index" && <ProjectLaunchpad project={project} />}
              {page == "research" && <ProjectDetails project={project} />}
              {page == "share2earn" && project.share_campaign?.length ? (
                <ProjectShare2Earn project={project} />
              ) : null}
              <Screen from="lg">
                <div className="toc-side-bar-div">
                  {page == "research" && (<TocSideBar/>)}  
                </div>
              </Screen>
              <Screen upto="md">
                <div className="float-btn--container">
                  {page == "research" && process.env.NODE_ENV != "production" && <FloatButton mainScroll={ref}/>}
                </div>
              </Screen>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
