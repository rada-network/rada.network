import Link from "next/dist/client/link";
import { usePageStore } from "../../../lib/usePageStore";

import { useTranslation } from "next-i18next";
import Image from "@components/Image";
import dynamic from "next/dynamic";

const WalletProfile = dynamic(import("@components/Wallet"));

export default function ProjectNavbar({ symbol, project, slug,pool }) {
  const { dataStore } = usePageStore();
  const { t } = useTranslation("launchpad");
  const NavItem = ({ uri, children }) => {
    const cls = ["tab-item"];
    if (uri == slug) cls.push("tab-item--active");
    return (
      <Link href={`/${dataStore.lang}/launchverse/${uri}`}>
        <a className={cls.join(" ")}>{children}</a>
      </Link>
    );
  };
  console.log(project)
  return (
    <>
      <div className="flex h-full w-limiter-lg relative xl:px-4">
        <div className="page-back flex-shrink-0 ml-0 relative lg:left-1 xl:left-2">
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
        <div className="tabbar page-tabs relative lg:left-8 xl:-left-1">
          <div className="tabbar--main">
          <NavItem uri={symbol+`/${pool !== null ? pool?.slug : ""}`}>
            {pool == null && project.token.name}
            {pool !== null && (<span className="hidden md:!block">{project.content.title + " - "+ pool.title}</span>)}
            {pool !== null && (<span className="block md:hidden">Pool</span>)}
          </NavItem>
            {(!!project.news || project.share_campaign?.length !== 0) && (
              <span className="tab-item--divider"></span>
            )}
            {!!project.news && (
              <NavItem uri={`${symbol}/research`}>
                <span className="token-symbol flex-shrink-0 lg:mr-2 h-px-20 w-px-20">
                  <Image
                    src={project?.token?.logo}
                    className="h-px-20 w-px-20"
                    alt={project?.token?.name}
                    width={20}
                    height={20}
                  />
                </span>
                <span className="tab-item--text">
                  {t("Research", { name: project?.token?.symbol })}
                </span>
              </NavItem>
            )}
            {project.share_campaign?.length !== 0 && (
              <NavItem uri={`${symbol}/share2earn`}>
                <span className="icon">
                  <i className="fa-duotone fa-hand-holding-heart"></i>
                </span>
                <span className="tab-item--text">{t("Share2Earn")}</span>
              </NavItem>
            )}
          </div>
        </div>
        <WalletProfile type={`simple`} />
      </div>
    </>
  );
}
