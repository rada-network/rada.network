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

              <div className="mt-8 box box--success global-padding-sm">
                <p class="text-center font-normal text-lg">
                  Xin chúc mừng! Bạn đã là người chiến thắng trong vòng whitelist.
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