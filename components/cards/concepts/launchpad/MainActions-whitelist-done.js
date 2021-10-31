import ProjectTimeline from "../../../concepts/steps/projectTimeline-1";
import CountDownLg from "../../../concepts/timers/countdownLg";

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
                <h3 class="text-3xl text-center font-normal">
                  <span class="text-color-title">Moniwar's Whitelist</span>
                </h3>
                <p class="text-center mt-2 font-normal">
                  Complete all the requirements below to joint the pool.
                </p>
              </div>

              <div className="list-group">
                <div class="list-group--item md:!pb-4">
                  <div class="list-group--item--title w-full md:w-1/4">
                    <div class="list-group--item--media">
                      <span class="icon"><i class="fa-solid fa-wallet"></i></span>
                    </div>
                    <label for="blockchain-wallet" class="text-color-desc">Wallet</label>
                  </div>
                  <div class="flex-1 md:mt-0">
                    <div class="relative pl-8 md:pl-0 w-full flex items-center">
                      <strong>0xDB33...345f</strong>
                      <span className="badge badge-coin relative ml-2">ETHEREUM</span>
                    </div>
                  </div>
                  <div class="text-right -mt-2 md:mt-0 w-1/6">
                    <span class="flex label label--success w-full">Done</span>
                  </div>
                </div>

                <div class="list-group--item md:!pb-4">
                  <div class="list-group--item--title w-full md:w-1/4">
                    <div class="list-group--item--media">
                      <span class="icon"><i class="fas fa-user-check"></i></span>
                    </div>
                    <label for="blockchain-wallet" class="text-color-desc">KYC</label>
                  </div>
                  <div class="flex-1 md:mt-0">
                    <div class="relative pl-8 md:pl-0 w-full flex items-center">
                      <strong>Đã hoàn thành KYC</strong>
                    </div>
                  </div>
                  <div class="text-right -mt-2 md:mt-0 w-1/6">
                    <span class="flex label label--success w-full">Done</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 box box--info global-padding-sm">
                <p class="text-center font-normal">
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
          <div class="search-wrapper">
            <div class="form-search rounded-full">
              <span class="icon form-search--icon">
                <i class="fa fa-search"></i>
              </span>
              <input type="text" value="" class="form-search--input" placeholder="Search for winner" />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="global-padding-lg min-h-full">

              <div className="">

                <h3 class="text-3xl text-center mb-8 font-normal"><span class="text-color-title">List of Winners Here</span></h3>

              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default MainActions