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

      <div className="logo">

        {/* Logo */}
        <Link href={`/`}>
          <a className="flex justify-center items-center">
            <img className="logo--img" src="/images/dhunt.svg" alt="dhunt.io" />
            <strong className="logo--text ml-2">
              <span>RADA</span>
            </strong>
          </a>
        </Link>

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
    </>
  );
}