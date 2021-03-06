import ProjectTimeline from "../../steps/projectTimeline";
import CountDownLg from "../../timers/countdownLg-whitelist";

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">
        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline step="1" />
            </div>
            <div className="global-padding-lg min-h-full bg-white dark:bg-gray-800 relative z-10">
              <div className="">
                <h3 className="text-2xl text-center mb-8 font-normal">
                  <span className="text-color-title">The whitelist will open in</span>
                </h3>
                <CountDownLg />
                <div><p className="text-sm text-center mt-4 leading-7"><span className="text-color-desc">Mở lúc: </span> <strong>Wednesday, December 1, 2021</strong></p></div>
              </div>

              <div className="flex flex-col md:flex-row mt-8 max-w-2xl justify-evenly mx-auto">
                <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-primary-700 dark:bg-primary-700 text-white rounded-lg flex items-center cursor-pointer">
                  <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4 shadow">
                    <i className="fa-duotone fa-hand-holding-heart"></i>
                  </span>
                  <div>
                    <p className="mb-1 opacity-80">Get more RIR with Share2Earn</p>
                    <a href="/launchverse/parallel/share2earn" className="group text-white">
                      <span className="text-sm">Joint now</span>
                      <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-gray-100 dark:bg-gray-700 items-center rounded-lg flex cursor-pointer">
                  <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow">
                    <i className="fad fa-info"></i>
                  </span>
                  <div>
                    <p className="mb-1 opacity-80">Joint the launchverse is really simple</p>
                    <a href="/launchverse/parallel/share2earn" className="group">
                      <span className="text-sm">Learn more</span>
                      <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default MainActions