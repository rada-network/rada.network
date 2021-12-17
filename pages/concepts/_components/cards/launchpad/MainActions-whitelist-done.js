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

            <div className="project-card--container">

              <div className="mb-4 md:mb-8">
                <h3 className="text-2xl md:text-3xl text-center font-normal">
                  <span className="text-color-title">Moniwar's Whitelist</span>
                </h3>
                <p className="text-center mt-2 font-normal text-base">
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
                      <strong>0xDB33...345f</strong>
                      <span className="badge badge-coin relative ml-2">ETHEREUM</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/6">
                    <span className="flex label label--success w-full">Done</span>
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
                      <strong>Đã hoàn thành KYC</strong>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/6">
                    <span className="flex label label--success w-full">Done</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 box box--info global-padding-sm">
                <p className="text-center font-normal">
                  Bạn đã hoàn thành việc đăng ký whitelist.<br />
                  Vui lòng chờ email thông báo kết quả từ RADA nhé!
                </p>
              </div>

            </div>

          </div>
            
        </div>

      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-4">

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

                <h3 className="text-2xl text-center mb-8 font-normal"><span className="text-color-title">List of Winners Here</span></h3>

              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default MainActions