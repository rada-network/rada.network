import Link from 'next/link'
import { useRouter } from 'next/router'

import {Wallet} from "./Wallet"
import SearchInput from "./search"
import ThemeSwitch from "./ThemeSwitch"

export const Tabbar = () => {
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
    <div className={`tabbar`}>

      <div className={`tabbar-main`}>

        <a className="tab-item">
          <span className="icon tab-item--icon">
            <i className="cf cf-btc widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            Bitcoin
          </span>
        </a>

        <a className="tab-item tab-item--active">
          <span className="icon tab-item--icon">
            <i className="cf cf-ada widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            Cardano
          </span>
        </a>

        <a className="tab-item">
          <span className="icon tab-item--icon">
            <i className="cf cf-eth widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            Ethereum
          </span>
        </a>

        <a className="tab-item">
          <span className="icon tab-item--icon">
            <i className="cf cf-dot widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            Polkadot
          </span>
        </a>

        <a className="tab-item">
          <span className="icon tab-item--icon">
            <i className="cf cf-bsc widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            BSC
          </span>
        </a>

        <a className="tab-item">
          <span className="icon tab-item--icon">
            <i className="cf cf-sol widget-icon-cf" />
          </span>
          <span className="tab-item--text">
            Solana
          </span>
        </a>

      </div>

    </div>
    </>
  );
}