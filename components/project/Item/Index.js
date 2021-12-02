import ProjectNavbar from "./Navbar";
import ProjectLaunchpad from "./Launchpad";
import ProjectDetails from "./Details";
import ProjectShare2Earn from "./Share2Earn";
import { useEffect, useRef } from "react";
import TocSideBar from "pages/launchverse/toc/TocSidebar";
import {isMobile, isBrowser} from 'react-device-detect';
import FloatButton from "pages/launchverse/toc/FloatingButton";

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
              <div className="float-btn--container">
                {page == "research" && <FloatButton mainScroll={ref}/>}
              </div>
              <div className="toc-sidebar--container">
                {page == "research" && (<TocSideBar mainScroll={ref}/>)}  
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
