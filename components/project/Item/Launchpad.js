import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import MainActions from "../../../pages/concepts/_components/cards/launchpad/MainActions"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { usePageStore } from "../../../lib/usePageStore"
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";

const ProjectLaunchpad = ({project,pool}) => {

    return (
        <>
            <div className="section">

                <LaunchpadOverview project={project} pool={pool} />

                <div className="section-body">
                            
                    <LaunchpadContent project={project} pool={pool} />

                    {/* Main Action Card */}
                    <div className="grid grid-cols-1 mt-4">
                        <LaunchpadActions project={project} pool={pool} />
                    </div>
                    {/* END: Main Action Card */}

                </div>
            </div>

        </>
    )
}

export default ProjectLaunchpad