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
      <div className={`container`}>
        
        <div className={`navbar-main`}>

          <div className="flex flex-1">

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href={`/`}>
                <a className="flex items-center justify-center align-center" title="dhunt.io">
                  <img className="block w-auto h-6" src="/images/dhunt.svg" alt="dhunt.io" />
                  <strong className="hidden md:inline-flex ml-2 text-gray-900 logo-text text-opacity-90">
                    <span>d</span><span>hunt</span><span>.io</span></strong>
                </a>
              </Link>
            </div>

            {/* Main Nav */}
            <div className="hidden lg:flex ml-8 space-x-6">
              <NavItem href="/explore/news">
                <span className="nav-item--text">News</span>
              </NavItem>
              <NavItem href="/explore/social">
                <span className="nav-item--text">Social Signals</span>
              </NavItem>
              <NavItem href="/explore/projects">
                <span className="nav-item--text">Projects</span>
              </NavItem>
              <NavItem href="/explore/blog">
                <span className="nav-item--text">Blog</span>
              </NavItem>
            </div>

          </div>

          <div className="flex items-center space-x-2">

            {/* Search */}
            <SearchInput />

            <ThemeSwitch />

            {/* Profile dropdown */}
            <div className="relative">
              <Wallet />
            </div>

          </div>

        </div>
      
      </div>
    </nav>

    {/* Mobile Nav */}
    <div className="navbar-app">

        <div className={`navbar-main`}>
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
    </>
  );
}