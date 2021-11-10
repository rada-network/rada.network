import Link from "next/dist/client/link"
import { usePageStore } from "../../../lib/usePageStore"

export default function ProjectNavbar({ symbol, project, slug }) {
    const {dataStore} = usePageStore()

    const NavItem = ({ uri, children }) => {
        const cls = ['tab-item']
        if (uri == slug) cls.push('tab-item--active')
        return (
            <Link href={`/${dataStore.lang}/projects/${uri}`}>
                <a class={cls.join(' ')}>
                    { children }
                </a>
            </Link>
        )
    }
    return (
        <>
            <div className="flex h-full w-limiter-lg relative lg:px-3">
                <div className="page-back flex-shrink-0 lg:!right-14">
                    <Link href={`/${dataStore.lang}/projects`}>
                    <a title="Back" className="btn">
                        <span className="icon">
                            <i className="fa-solid fa-chevron-left md:hidden"></i>
                            <i className="fa-solid fa-times hidden md:!block"></i>
                        </span>
                        <span className="btn--text sr-only">Quay lại</span></a>
                    </Link>
                </div>
                <div className="tabbar page-tabs">
                    <div className="tabbar--main">
                        <NavItem uri={symbol}>Launchpad</NavItem>
                        <span className="tab-item--divider"></span>
                        <NavItem uri={`${symbol}/research`}>
                            <span className="token-symbol mr-2">
                                <img src={project?.token?.logo} className="h-px-20 w-px-20" alt={project?.token?.name} />
                            </span>
                            <span className="tab-item--text !block">Research</span>
                        </NavItem>
                    </div>
                </div>
            </div>
        </>
    )
}
