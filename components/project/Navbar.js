import Link from "next/dist/client/link"

export default function ProjectNavbar({symbol, project}) {
    return (
        <>
            <div className="pane-content--sec--top !block">
                <div className="flex h-full w-limiter-lg relative lg:px-3">
                    <div className="page-back flex-shrink-0 lg:!right-14">
                        <a title="Back" className="btn">
                            <span className="icon">
                                <i className="fa-solid fa-chevron-left md:hidden"></i>
                                <i className="fa-solid fa-times hidden md:!block"></i>
                            </span>
                            <span className="btn--text sr-only">Quay lại</span></a>
                    </div>
                    <div className="tabbar page-tabs">
                        <div className="tabbar--main">
                            <Link href={`/projects/${symbol}`}>
                                <a className="tab-item tab-item--active">Launchpad</a>
                            </Link>
                            <span className="tab-item--divider"></span>
                            <Link href={`/projects/${symbol}/research`}>
                                <a className="tab-item ">
                                    <span className="token-symbol mr-2">
                                        <img src="https://media.rada.network/assets/514649e2-bf3c-4836-afbd-2c3ccd50293a?format=webp&amp;width=128" className="h-px-20 w-px-20" alt="Moniwar" />
                                    </span>
                                    <span className="tab-item--text !block">Research</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
