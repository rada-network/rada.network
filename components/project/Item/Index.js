import { useEffect, useRef, useState } from "react";

import Screen from "../../utils/Responsive";
import TocSideBar from "@components/toc/TocSidebar";
import FloatButton from "@components/toc/FloatingButton";
import dynamic from "next/dynamic";
import ProjectDetails from "./Details"
import ProjectLaunchpadPool from "./ProjectLaunchpadPool";
const ProjectNavbar = dynamic(import("./Navbar"));
const ProjectLaunchpad = dynamic(import("./Launchpad"));
const ProjectShare2Earn = dynamic(import("./Share2Earn"));

export default function ProjectItem({ project, page, slug,pool }) {
  const symbol = project.slug;
  const [headings, setHeadings] = useState([]);
  const ref = useRef();
  const awayCls = "details-top-away";
  const onScroll = (e) => {
    if (e.target.scrollTop > 100) {
      document.body.classList.add(awayCls);
    } else {
      document.body.classList.remove(awayCls);
    }
  };
  const onUnload = (e) => {
    document.body.classList.remove(awayCls);
  };

  useEffect(() => {
    ref.current.removeEventListener("scroll", onScroll);
    ref.current.addEventListener("scroll", onScroll);
    return onUnload;
  }, []);

  useEffect(() => {
    setHeadings(ref.current.querySelectorAll("h2, h3"));
  }, []);

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
            pool={pool}
          />
        </div>

        <div className="pane-content--sec--main grid scrollbar" ref={ref}>
          <div
            className={
              `page page-full page-project-details !p-0` +
              (page == "research" ? " page-research-details" : "") +
              (page == "share2earn" ? " page-project-share2earn" : "")
            }
          >
            <div className="w-limiter-xl">
              {page == "index" && pool !== null && <ProjectLaunchpad project={project} pool={pool} />}
              {page == "index" && pool === null && <ProjectLaunchpadPool project={project} pool={pool} />}
              {page == "research" && <ProjectDetails project={project} pool={pool} />}
              {page == "share2earn" && project.share_campaign?.length ? (
                <ProjectShare2Earn shareCampaign={project.share_campaign[0]} shareType={`project`} shareSlug={project.slug} pool={pool} />
              ) : null}
              <Screen from="lg">
                <div className="toc-side-bar-div">
                  {page == "research" && <TocSideBar mainScroll={ref} />}
                </div>
              </Screen>
              <Screen upto="md">
                <div className="float-btn--container">
                  {page == "research" && headings.length > 0 && (
                    <FloatButton mainScroll={ref} />
                  )}
                </div>
              </Screen>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
