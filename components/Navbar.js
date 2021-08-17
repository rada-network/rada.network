import Link from 'next/link'
import {useRouter} from 'next/router'
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {observer} from "mobx-react";
import {useStore} from "../lib/useStore";

export const Navbar = ({dataStore}) => {
  return (
    <>
      <nav className={`navbar`}>

        <div className="logo">
          {/* Logo */}
          <Link href={`/`}>
            <a className="flex flex-col w-full justify-center items-center">
              <img className="logo--img" src="/images/dhunt.svg" alt="dhunt.io" />
              <strong className="logo--text mt-1">
                <span>RADA</span>
              </strong>
            </a>
          </Link>
        </div>

        {/* Main Nav */}
        <div className={`navbar-main`} >
          <NavItem dataStore={dataStore} href={"/" + dataStore.lang + "/apps/explore/all"} type={"all"}>
            <span className="icon"><i className="fad fa-rss" /></span>
            <span className="nav-item--text">Explore</span>
          </NavItem>
          <NavItem dataStore={dataStore}  href={"/" + dataStore.lang + "/apps/explore/news"} type={"news"}>
            <span className="icon"><i className="fad fa-newspaper" /></span>
            <span className="nav-item--text">News</span>
          </NavItem>
          <NavItem dataStore={dataStore}  href={"/" + dataStore.lang + "/apps/explore/social"} type={"social"} className="disabled">
            <span className="icon"><i className="fad fa-fire-alt" /></span>
            <span className="nav-item--text">Signals</span>
            <span className="nav-item--badge">Soon</span>
          </NavItem>
          <NavItem dataStore={dataStore}  href={"/" + dataStore.lang + "/apps/explore/media"}  type={"media"}>
            <span className="icon"><i className="fad fa-icons" /></span>
            <span className="nav-item--text">Media</span>
          </NavItem>

          {/* Example of additional filters */}
          <span className="nav-item--divider"></span>
          <NavItem dataStore={dataStore}  href={"/" + dataStore.lang + "/apps/explore/games"}  type={"games"} className="disabled">
            <span className="icon"><i className="fad fa-chess-knight" /></span>
            <span className="nav-item--text">Games</span>
          </NavItem>
          <NavItem dataStore={dataStore}  href={"/" + dataStore.lang + "/apps/explore/defi"}  type={"defi"} className="disabled">
            <span className="icon"><i className="fad fa-coins" /></span>
            <span className="nav-item--text">DeFi</span>
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

const NavItem = observer(({className, href, children,type,dataStore}) => {
  const router = useRouter()
  const store = useStore()
  const cls = []
  cls.push(`nav-item`)
  cls.push(className)
  if (dataStore.type === type || (type === "all" && dataStore.type === "")) cls.push(`nav-item-active`)

  const handleClickNavBar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dataStore.type = e.currentTarget.getAttribute("datatype")
    dataStore.tweets = []
    dataStore.loadingButton = true;
    dataStore.showDetail = false;
    store.setShallowConnect(true);
    router.push(e.currentTarget.getAttribute("href"),undefined,{shallow:true})
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