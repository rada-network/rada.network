import Link from "next/dist/client/link"
import { usePageStore } from "../../../lib/usePageStore"
import { WalletProfile } from "@components/Wallet";
import { useTranslation } from "next-i18next";

export default function ProjectNavbar({ symbol, project, slug }) {
    const {dataStore} = usePageStore()
    const {t} = useTranslation('launchpad')
    const NavItem = ({ uri, children }) => {
        const cls = ['tab-item']
        if (uri == slug) cls.push('tab-item--active')
        return (
            <Link href={`/${dataStore.lang}/launchverse/${uri}`}>
                <a class={cls.join(' ')}>
                    { children }
                </a>
            </Link>
        )
    }
    return (
        <>
            <div className="flex h-full w-limiter-lg relative lg:px-3">
                <div className="page-back flex-shrink-0 ml-0 relative -left-0.5">
                <div className="btn">
                    <Link href={`/${dataStore.lang}/launchverse`}> 
                        <a href={`/${dataStore.lang}/launchverse`}>
                            <span className="icon">
                            <i className="fa-solid fa-chevron-left"></i>
                            </span>
                            <span className="btn--text sr-only">{t("back")}</span>
                        </a>
                    
                    </Link>
                </div>
                </div>
                <div className="tabbar page-tabs">
                    <div className="tabbar--main">
                        <NavItem uri={symbol}>{t("LaunchVerse")}</NavItem>
                        <span className="tab-item--divider"></span>
                        <NavItem uri={`${symbol}/research`}>
                            <span className="token-symbol mr-2">
                                <img src={project?.token?.logo} className="h-px-20 w-px-20" alt={project?.token?.name} />
                            </span>
                            <span className="tab-item--text !block">{t("Research",{name : project?.token?.symbol})}</span>
                        </NavItem>
                        {(project.share_campaign?.length !== 0) && 
                            <NavItem uri={`${symbol}/share2earn`}>
                                <span className="tab-item--text">{t("Share2Earn")}</span>
                            </NavItem>
                        }
                    </div>
                </div>
                <WalletProfile type={`simple`} />
            </div>
        </>
    )
}
