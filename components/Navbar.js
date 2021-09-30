import Link from 'next/link'
import {useRouter} from 'next/router'
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {observer} from "mobx-react";
import {useStore} from "../lib/useStore";
import { useTranslation } from 'next-i18next';
import utils from "../lib/util";

import Screen from "./utils/Responsive";

export const Navbar = ({dataStore,detailStore}) => {
  const { t } = useTranslation("navbar")
  return (
    <>
      <nav className={`navbar`}>

        <Screen from="lg">
        <div className="logo">
          {/* Logo */}
          <Link href={`/`}>
            <a className="flex flex-col w-full justify-center items-center">
              <img className="logo--img" src={process.env.NEXT_PUBLIC_CDN + "/images/rada-animate.svg"} alt="RADA NETWORK" />
              <strong className="logo--text mt-1">
                <span>RADA</span>
              </strong>
              <span className="logo--badge">BETA</span>
            </a>
          </Link>
        </div>
        </Screen>

        {/* Main Nav */}
        <div className={`navbar-main`} >

          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/"} type={"news"}>
            <span className="icon"><i className="fad fa-newspaper" /></span>
            <span className="nav-item--text">{t("News")}</span>
          </NavItem>

          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/video"}  type={"video"}>
            <span className="icon"><i className="fad fa-icons" /></span>
            <span className="nav-item--text">{t("Video")}</span>
          </NavItem>

        </div>
      </nav>

    </>
  );
}

const NavItem = ({className, href, children,type}) => {
  const cls = []
  cls.push(`nav-item`)
  cls.push(className)

  return (
    <a href={href} className={cls.join(' ')}>
      <>
        {children}
      </>
    </a>
  )
}