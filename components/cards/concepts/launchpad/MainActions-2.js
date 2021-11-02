import ProjectTimeline from "../../../concepts/steps/projectTimeline-1";
import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline />
            </div>

            <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">

              <div className="mb-8">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Moniwar's Whitelist</span>
                </h3>
                <p className="text-center mt-2 font-normal">
                  Complete all the requirements below to joint the pool.
                </p>
              </div>

              <div className="list-group">
                <div className="list-group--item md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/4">
                    <div className="list-group--item--media">
                      <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                    </div>
                    <label for="blockchain-wallet" className="text-color-desc">Wallet</label>
                  </div>
                  <div className="flex-1 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full flex items-center">
                      <span>Chưa kết nối tài khoản ví</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/5">
                    <button className="btn btn-default w-full">Kết nối</button>
                  </div>
                </div>

                <div className="list-group--item md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/4">
                    <div className="list-group--item--media">
                      <span className="icon"><i className="fas fa-user-check"></i></span>
                    </div>
                    <label for="blockchain-wallet" className="text-color-desc">KYC</label>
                  </div>
                  <div className="flex-1 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full flex items-center">
                      <span>Chưa hoàn thành KYC</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/5">
                    <button className="btn btn-default w-full">KYC</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
            
        </div>

      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-8">

        <div className="card-header items-center">
          <h3>Winners (1000)</h3>
          <div className="search-wrapper">
            <div className="form-search rounded-full">
              <span className="icon form-search--icon">
                <i className="fa fa-search"></i>
              </span>
              <input type="text" value="" className="form-search--input" placeholder="Search for winner" />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="global-padding-lg min-h-full">

              <div className="">

                <h3 className="text-3xl text-center mb-8 font-normal"><span className="text-color-title">List of Winners Here</span></h3>

              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default MainActions