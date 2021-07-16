import Link from 'next/link'
import { useRouter } from 'next/router'

import {Wallet} from "./Wallet"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"


// import { loadAnimation } from "lottie-web";
// import { defineLordIconElement } from "lord-icon-element";

// // register lottie and define custom element
// defineLordIconElement(loadAnimation);

export const Navbar = () => {



  const router = useRouter()

  const NavItem = ({className, href, children}) => {

    const cls = []
    cls.push(`nav-item`)
    cls.push(className)
    if (router.asPath === href) cls.push(`nav-item-active`)

    return (
      <Link href={href}>
        <a href={href} className={cls.join(' ')}>
          <>
            {children}
          </>
        </a>
      </Link>
    )
  }

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
      <div className={`navbar-main`}>
        <NavItem href="/">
        <span className="icon"><i class="fad fa-rss" /></span>
          <span className="nav-item--text">Explore</span>
        </NavItem>
        <NavItem href="/explore/news">
          <span className="icon"><i className="fad fa-newspaper" /></span>
          <span className="nav-item--text">News</span>
        </NavItem>
        <NavItem href="/explore/social">
          <span className="icon"><i className="fad fa-fire-alt" /></span>
          <span className="nav-item--text">Signals</span>
        </NavItem>
        <NavItem href="/explore/projects">
          <span className="icon"><i className="fad fa-code-branch" /></span>
          <span className="nav-item--text">Projects</span>
        </NavItem>
        <NavItem href="/explore/blog">
          <span className="icon"><i className="fad fa-pen-nib" /></span>
          <span className="nav-item--text">Blog</span>
        </NavItem>
      </div>
    </nav>

    {/* Mobile Nav
    <div className="navbar-app">

      <NavItem href="/">
        <span className="icon"><i className="fad fa-home"></i></span>
        <span className="nav-item--text">Explore</span>
      </NavItem>
      <NavItem href="/explore/news">
        <span className="icon"><i className="fad fa-newspaper"></i></span>
        <span className="nav-item--text">News</span>
      </NavItem>
      <NavItem href="/explore/social">
        <span className="icon"><i className="fad fa-fire-alt"></i></span>
        <span className="nav-item--text">Signals</span>
      </NavItem>
      <NavItem href="/explore/projects">
        <span className="icon"><i className="fad fa-code-branch"></i></span>
        <span className="nav-item--text">Projects</span>
      </NavItem>
      <NavItem href="/explore/blog">
        <span className="icon"><i className="fad fa-pen-nib"></i></span>
        <span className="nav-item--text">Blog</span>
      </NavItem>

    </div> */}
    </>
  );
}