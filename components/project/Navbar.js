import Link from "next/dist/client/link"

export default function ProjectNavbar({ symbol, project, slug }) {
    const NavItem = ({ uri, children }) => {
        const cls = ['tab-item']
        if (uri == slug) cls.push('tab-item--active')
        return (
            <Link href={`/projects/${uri}`}>
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
                    <a title="Back" className="btn">
                        <span className="icon">
                            <i className="fa-solid fa-chevron-left md:hidden"></i>
                            <i className="fa-solid fa-times hidden md:!block"></i>
                        </span>
                        <span className="btn--text sr-only">Quay lại</span></a>
                </div>
                <div className="tabbar page-tabs">
                    <div className="tabbar--main">
                        <NavItem uri={symbol}>Launchpad</NavItem>
                        <span className="tab-item--divider"></span>
                        <NavItem uri={`${symbol}/research`}>
                            <span className="token-symbol mr-2">
                                <img src="https://media.rada.network/assets/514649e2-bf3c-4836-afbd-2c3ccd50293a?format=webp&amp;width=128" className="h-px-20 w-px-20" alt="Moniwar" />
                            </span>
                            <span className="tab-item--text !block">Research</span>
                        </NavItem>
                    </div>
                </div>
            </div>
        </>
    )
}
