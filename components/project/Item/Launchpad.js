import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons"
import MainActions from "../../cards/concepts/launchpad/MainActions"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { usePageStore } from "../../../lib/usePageStore"
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";

const ProjectLaunchpad = ({project}) => {
    const {dataStore} = usePageStore()
    const { t } = useTranslation("invest")
    useEffect(() => {
    },[])

    const {token} = project
    const step = 1

    return (
        <>
            <div className="section">

                <LaunchpadOverview project={project} />

                <div className="section-body">

                    <LaunchpadContent project={project} />

                    {/* Main Action Card */}
                    <div className="grid grid-cols-1 mt-4">
                        <LaunchpadActions project={project} />
                    </div>
                    {/* END: Main Action Card */}

                </div>
            </div>

        </>
    )
}

export default ProjectLaunchpad