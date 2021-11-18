import ProjectNavbar from "./Navbar"
import ProjectLaunchpad from "./Launchpad"
import ProjectDetails from "./Details"
import { useEffect } from "react"

export default function ProjectItem({ project, page, slug }) {
    const symbol = project.slug
    return (
        <>
            <div className="pane-content--sec pane-content-active !w-full" itemScope itemType="https://schema.org/Project">
                <div className="pane-content--sec--top !block">
                    <ProjectNavbar symbol={symbol} page={page} project={project} slug={slug.join('/')} />
                </div>

                <div className="pane-content--sec--main grid scrollbar">
                    <div className="page page-full page-project-details !pt-0">
                        <div className="w-limiter-lg">
                            {page == 'index' && <ProjectLaunchpad project={project} />}
                            {page == 'research' && <ProjectDetails project={project} />}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}