import Link from 'next/link'
import { useRouter } from 'next/router'

import Profile from "./Profile"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"
import {LanguageSwitch} from "./LanguageSwitch";
import Usermenu from "./Usermenu";
import { usePageStore } from '../lib/usePageStore'

export const Topbar = ({}) => {
  const {dataStore} = usePageStore()
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

      <div className="flex items-center">
        <div className="logo">

          {/* Logo */}
          <Link href={`/`}>
            <a className="flex justify-center items-center">
              <img className="logo--img" src={process.env.NEXT_PUBLIC_CDN +"/images/rada-animate.svg"} alt="RADA NETWORK" />
              <strong className="logo--text ml-2">
                <span>RADA</span>
              </strong>
              <span className="logo--badge">BETA</span>
            </a>
          </Link>

        </div>
      </div>

      <div className="flex items-center space-x-2">

        <ThemeSwitch />

        {/*<a className="btn btn-default btn-open-widgets">*/}
        {/*  <span className="icon">*/}
        {/*    <i className="fa-duotone fa-th-large" />*/}
        {/*  </span>*/}
        {/*</a>*/}

        {/* Edition / Lang switch */}
        <LanguageSwitch dataStore={dataStore} />

        {/* Profile dropdown */}
        <div className="relative">
          <Profile />
        </div>

      </div>

    </div>
    </>
  );
}