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
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Moniwar's Whitelist</span>
                </h3>
              </div>

              <div className="mt-8 box box--fail global-padding-sm text-center">
                <span className="inline-block icon text-4xl text-red-500">
                  <i class="fad fa-times-circle"></i>
                </span>
                <p className="font-normal text-base mt-2">
                  Ngã ở đâu, gấp đôi ở đó! Chúc bạn may mắn lần sau nhé!
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