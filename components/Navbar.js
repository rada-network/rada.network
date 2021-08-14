import Link from 'next/link'
import {useRouter} from 'next/router'
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {observer} from "mobx-react";


// import { loadAnimation } from "lottie-web";
// import { defineLordIconElement } from "lord-icon-element";

// // register lottie and define custom element
// defineLordIconElement(loadAnimation);

export const Navbar = ({dataStore}) => {



  const router = useRouter()

  const handleClickNavBar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dataStore.type = e.currentTarget.getAttribute("datatype")
    console.log(dataStore.type)
    dataStore.tweets = []
    dataStore.loadingButton = true;
    dataStore.showDetail = false;
    window.history.pushState("", "", e.currentTarget.getAttribute("href"));
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
  }

  const NavItem = observer(({className, href, children,type}) => {

    const cls = []
    cls.push(`nav-item`)
    cls.push(className)
    if (dataStore.type === type) cls.push(`nav-item-active`)

    return (
      <a href={href} className={cls.join(' ')} datatype={type}  onClick={(e) => {handleClickNavBar(e)}}>
        <>
          {children}
        </>
      </a>
    )
  })

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
        <NavItem href={"/" + dataStore.lang} type={"all"}>
        <span className="icon"><i className="fad fa-rss" /></span>
          <span className="nav-item--text">Explore</span>
        </NavItem>
        <NavItem href={"/" + dataStore.lang + "/explore/news"} type={"news"}>
          <span className="icon"><i className="fad fa-newspaper" /></span>
          <span className="nav-item--text">News</span>
        </NavItem>
        <NavItem href={"/" + dataStore.lang + "/explore/social"} type={"social"} className="disabled">
          <span className="icon"><i className="fad fa-fire-alt" /></span>
          <span className="nav-item--text">Signals</span>
          <span className="nav-item--badge">Soon</span>
        </NavItem>
        <NavItem href={"/" + dataStore.lang + "/explore/media"}  type={"media"}>
          <span className="icon"><i className="fad fa-icons" /></span>
          <span className="nav-item--text">Media</span>
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

    {/* <div className="hidden lg:flex justify-center p-4">
      <ThemeSwitch />
    </div> */}

    </>
  );
}