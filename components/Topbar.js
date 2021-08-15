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

      <div className="flex items-center">
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
      </div>

      <div className="flex items-center space-x-2">

        <ThemeSwitch />

        <a className="btn nav-btn btn-open-widgets">
          <span className="icon">
            <i className="fad fa-th-large" />
          </span>
        </a>

        {/* Edition / Lang switch */}
        <div className="btn nav-btn btn-switch-lang" data-tip="Change Language / Edition">
          <div>
            <span className="icon"><i class="fal fa-globe" /></span>
            <span className="btn--text">EN / VI</span>
          </div>
          <span className="dropdown-arrow ml-2 text-xs"><i class="fa fa-caret-down" /></span>
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <Wallet />
        </div>

      </div>

    </div>
    </>
  );
}