import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
const TokenNav = function(){
  return (
    <div className="pane-content--sec--top !block">
      <div className="flex h-full w-limiter-lg relative lg:px-3">
        <div className="page-back flex-shrink-0 ml-0 relative -left-0.5">
          <div className="btn">
            <span className="icon">
              <i className="fa-solid fa-chevron-left"></i>
            </span>
            <span className="btn--text sr-only">Quay lại</span>
          </div>
        </div>
        <div className="tabbar page-tabs">
          <div className="tabbar--main">
            <a href="#" className="tab-item tab-item--active">LaunchVerse</a>
            <span className="tab-item--divider"></span>
            <a href="#overview" className="tab-item ">
              <span className="token-symbol mr-2">
                <img src="/placeholders/parallel-token.png" className="h-px-20 w-px-20" alt="Moniwar" />
              </span>
              <span className="tab-item--text !block">PRL&rsquo;s Research</span>
            </a>
            <a href="#team" className="tab-item ">
              <span className="icon"><i className="fa-duotone fa-users"></i></span>
              <span className="tab-item--text">Team</span>
            </a>
          </div>
        </div>
        <button className="btn btn-primary my-2 px-2 ml-auto xl:mr-12 text-sm flex">
          <span class="icon opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Wallet</title><path fill="currentColor" d="M18.874,18a3.757,3.757,0,0,1-3.669-4.538A3.819,3.819,0,0,1,18.982,10.5h2.393a.5.5,0,0,0,.5-.5c0-.793,0-2.254,0-2.254a2.5,2.5,0,0,0-2.5-2.5c-4.476,0,8.862-.01-14-.01a.75.75,0,0,1,0-1.5h13.25a.25.25,0,0,0,.25-.249V3.25c0-1.379-1.57-2.5-3.5-2.5h-11a3.5,3.5,0,0,0-3.5,3.5v15.5a3.5,3.5,0,0,0,3.5,3.5h15a2.5,2.5,0,0,0,2.5-2.5v-2.5a.25.25,0,0,0-.25-.25Z"/><path fill="currentColor"  d="M21.874,12h-3a2.25,2.25,0,1,0,0,4.5h3a1.506,1.506,0,0,0,1.25-1.5V13.5A1.506,1.506,0,0,0,21.874,12Z"/></svg>
          </span>
          <span className="mr-0 hidden md:inline">Connect Wallet</span></button>
      </div>
    </div>
  )
}

export default TokenNav;