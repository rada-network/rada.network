import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/modules/Navbar.module.css'


import {Wallet} from "./Wallet"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"

export const Navbar = () => {
  const router = useRouter()

  const NavItem = ({className, href, children}) => {

    const cls = []
    cls.push(`${styles.nav_item}`)
    cls.push(className)
    if (router.asPath === href) cls.push(`${styles.nav_item__active}`)

    return (
    <a href={href} className={cls.join(' ')}>
      <Link href={href}>
        <span>{children}</span>
      </Link>

    </a>
    )
  }

  return (
    <nav className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        
        <div className={`${styles.main}`}>

          <div className="flex items-center justify-center flex-1">

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
            <div className="flex-1 hidden sm:block flex-shrink-0 ml-8 space-x-6">
              <NavItem href="/explore/news">News</NavItem>
              <NavItem href="/explore/social">Social Signals</NavItem>
              <NavItem href="/explore/projects">Projects</NavItem>
              <NavItem href="/explore/blog">Blog</NavItem>
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
  );
}