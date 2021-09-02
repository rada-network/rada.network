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
              <img className="logo--img" src="/images/dhunt.svg" alt="RADA.CO" />
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
          <NavItem dataStore={dataStore} detailStore={detailStore} href={"/" + dataStore.lang + "/apps/explore/all"} type={"all"}>
            <span className="icon"><i className="fad fa-rss" /></span>
            <span className="nav-item--text">{t("Explore")}</span>
          </NavItem>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/apps/explore/news"} type={"news"}>
            <span className="icon"><i className="fad fa-newspaper" /></span>
            <span className="nav-item--text">{t("News")}</span>
          </NavItem>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/apps/explore/video"}  type={"video"}>
            <span className="icon"><i className="fad fa-icons" /></span>
            <span className="nav-item--text">{t("Video")}</span>
          </NavItem>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/apps/explore/social"} type={"social"} className="disabled">
            <span className="icon"><i className="fad fa-fire-alt" /></span>
            <span className="nav-item--text">{t("Signals")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem>

          {/* Example of additional filters */}
          <span className="nav-item--divider"></span>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/apps/explore/games"}  type={"games"} className="disabled">
            <span className="icon"><i className="fad fa-chess-knight" /></span>
            <span className="nav-item--text">{t("Games")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem>
          <NavItem dataStore={dataStore} detailStore={detailStore}  href={"/" + dataStore.lang + "/apps/explore/defi"}  type={"defi"} className="disabled">
            <span className="icon"><i className="fad fa-coins" /></span>
            <span className="nav-item--text">{t("DeFi")}</span>
            <span className="nav-item--badge">{t("Soon")}</span>
          </NavItem>

          {/*<NavItem href="/explore/projects">*/}
          {/*  <span className="icon"><i className="fad fa-code-branch" /></span>*/}
          {/*  <span className="nav-item--text">Projects</span>*/}
          {/*</NavItem>*/}
          {/*<NavItem href="/explore/blog">*/}
          {/*  <span className="icon"><i className="fad fa-pen-nib" /></span>*/}
          {/*  <span className="nav-item--text">Blog</span>*/}
          {/*</NavItem>*/}
        </div>
      </nav>

    </>
  );
}

const NavItem = observer(({className, href, children,type,dataStore,detailStore}) => {
  const router = useRouter()
  const store = useStore()
  const cls = []
  cls.push(`nav-item`)
  cls.push(className)
  if (dataStore.type === type || (type === "all" && dataStore.type === "")) cls.push(`nav-item-active`)

  const handleClickNavBar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dataStore.loadingButton) return false
    dataStore.type = e.currentTarget.getAttribute("datatype")
    dataStore.tweets = []
    dataStore.loadingButton = true;
    dataStore.showDetail = false;
    detailStore.data = {}
    store.setShallowConnect(true);
    router.push(e.currentTarget.getAttribute("href"),e.currentTarget.getAttribute("href"),{shallow:true})
    const meta = utils.createSiteMetadata({page:"Explore",data : {query : dataStore.type}})
    document.title = meta.title
    getItems({
      take : HOME_ITEM_TAKE,
      skip : dataStore.tweets.length,
      orderBy : dataStore.currentTab === "latest" ? {createdAt : "desc"} : {totalVote : "desc"},
      query : dataStore.query,
      type : dataStore.type,
      lang : dataStore.lang
    }).then(function (res){
      dataStore.loadingButton = false;
      dataStore.addTweet(res.data.itemFeed)
    })
    return false
  }
  return (
    <a href={href} className={cls.join(' ')} datatype={type}  onClick={(e) => {handleClickNavBar(e)}}>
      <>
        {children}
      </>
    </a>
  )
})