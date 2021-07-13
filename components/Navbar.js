import Link from 'next/link'
import { useRouter } from 'next/router'

import {Wallet} from "./Wallet"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"

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

      <div className={`navbar-main`}>

        {/* Main Nav */}
        <div className="md:flex lg:flex flex-col">
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
        </div>

      </div>

    </nav>

    {/* Mobile Nav */}
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

    </div>
    </>
  );
}