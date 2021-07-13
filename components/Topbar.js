import Link from 'next/link'
import { useRouter } from 'next/router'

import {Wallet} from "./Wallet"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"

export const Topbar = () => {
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
    <div className={`topbar`}>

      <div className={`navbar-main`}>

        <div className="flex flex-1">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href={`/`}>
              <a className="flex items-center justify-center align-center" title="dhunt.io">
                <img className="block w-auto h-6" src="/images/dhunt.svg" alt="dhunt.io" />
                <strong className="hidden md:inline-flex ml-2 text-gray-900 logo-text text-opacity-90">
                  <span>RADA</span><span>.co</span></strong>
              </a>
            </Link>
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
    </>
  );
}