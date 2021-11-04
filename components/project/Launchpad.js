import { BscSvg, UsdtSvg, LaunchSvg } from "../svg/SvgIcons"
import MainActions from "../cards/concepts/launchpad/MainActions"
import { useEffect } from "react"
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { usePageStore } from "../../lib/usePageStore"

const ProjectLaunchpad = ({project}) => {
    const {dataStore} = usePageStore()
    const { t } = useTranslation("invest")
    useEffect(() => {
        console.log('d:', project)
    },[])

    const {token} = project

    return (
        <>
            <div className="section">

                <div className="section-header mb-4">

                    <div className="flex flex-wrap justify-between items-center w-full">
                        <div className="flex flex-0 flex-shrink-0 mb-4 items-center">
                            <span className="icon flex-shrink-0 mr-2">
                                <img src={token.logo} className="h-px-32 w-px-32" alt={token.name} />
                            </span>
                            <h1 className="flex items-center">
                                <strong className="text-color-title text-xl lg:text-2xl font-semibold">{token.name}</strong>
                                <span className="badge badge-coin badge-coin-lg ml-2 -mb-1">{token.symbol}</span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap space-x-4 mb-4">

                            <div className="flex items-center text-sm">
                                <span className="w-5 h-5">
                                    <UsdtSvg />
                                </span>
                                <span className="ml-1">USDT</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <span className="w-4 h-4">
                                    <BscSvg />
                                </span>
                                <span className="ml-1">{project.platform.name}</span>
                            </div>

                            <div className={`label ${project.type}`}>{project.type}</div>
                        </div>
                    </div>

                </div>


                {/* Video / Banner of Project */}
                <div className="page-media">
                    <div className="media-player">
                        <div className="w-full h-full">
                            <div className={`aspect-w-16 aspect-h-9`}>
                                {/* <iframe
                                    src="https://www.youtube.com/embed/_jX5T-JrEhI"
                                    title="Video Title"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen="allowFullScreen"
                                /> */}
                                <img src={project.cover_uri} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* END: Video / Banner of Project */}

                <div className="section-body">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="card card-default project-brief">
                            <div className="card-header">
                                <h3>{t("Launchverse Overview")}</h3>
                            </div>
                            <div className="card-body flex flex-col">
                                <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
                                    <li className="list-pair mb-2">
                                        <span className="list-key">
                                            {t("Raise")}
                                        </span>
                                        <span className="ml-auto list-value font-semibold">
                                            45,000 USDT
                                        </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                        <span className="list-key">
                                        {t("Participants")}
                                        </span>
                                        <span className="ml-auto list-value font-semibold">
                                            2,200
                                        </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                        <span className="list-key">
                                        {t("Token Price")}
                                        </span>
                                        <span className="ml-auto font-semibold">0.1 USDT </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                        <span className="list-key">
                                        {t("Progress")}
                                        </span>
                                        <span className="list-value ml-auto">
                                            <span className="font-semibold">72000</span>
                                            <span className="opacity-70">/100,0000</span> MOWA
                                        </span>
                                    </li>
                                </ul>
                                <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-5 rounded-full">
                                    <div className="text-2xs font-semibold  flex px-2 text-white items-center progress-bar--percentage h-5 bg-green-600 rounded-full" style={{ width: `72%` }}>72%</div>
                                </div>
                            </div>
                        </div>
                        {/* end of project-brief */}

                        <div className="card card-default project-process">
                            <div className="card-header">
                                <h3>Moniwar's Info</h3>
                            </div>
                            <div className="card-body">
                                <div className="" dangerouslySetInnerHTML={{__html: project.description}}>
                                </div>
                                <p className="mt-auto">
                                    <Link href={`/${dataStore.lang}/projects/${project.slug}/research`}>
                                    <a className="link">Read full research</a>
                                    </Link>
                                    {/* <span className="icon text-2xs ml-0.5"><i className="fa-duotone fa-external-link"></i></span> */}
                                </p>
                            </div>

                        </div>
                        {/* end of project-process */}
                    </div>

                    {/* Main Action Card */}
                    <div className="grid grid-cols-1 mt-4">
                        <MainActions />
                    </div>
                    {/* END: Main Action Card */}

                </div>
            </div>

        </>
    )
}

export default ProjectLaunchpad