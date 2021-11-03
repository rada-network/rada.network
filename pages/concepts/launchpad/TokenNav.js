import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
const TokenNav = function(){
  return (
    <div className="pane-content--sec--top !block">
      <div className="flex h-full w-limiter-lg relative lg:px-3">
        <div className="page-back flex-shrink-0 lg:!right-14">
          <a title="Back" className="btn">
          <span className="icon">
            <i className="fa-solid fa-chevron-left md:hidden"></i>
            <i className="fa-solid fa-times hidden md:!block"></i>
          </span>
          <span className="btn--text sr-only">Quay lại</span></a>
        </div>
        <div className="tabbar page-tabs">
          <div className="tabbar--main">
            <a href="#" className="tab-item tab-item--active">Launchpad</a>
            <span className="tab-item--divider"></span>
            <a href="#overview" className="tab-item ">
              <span className="token-symbol mr-2">
                <img src="/placeholders/parallel-token.png" className="h-px-20 w-px-20" alt="Moniwar" />
              </span>
              <span className="tab-item--text !block">PRL</span>
            </a>
            <a href="#team" className="tab-item ">
              <span className="icon"><i className="fa-duotone fa-users"></i></span>
              <span className="tab-item--text">Team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenNav;