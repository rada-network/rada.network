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
                <h3 className="text-2xl text-center font-normal">
                  <span className="text-color-title">You failed to joint Whitelist</span>
                </h3>
              </div>

              <div className="mt-8 box box--fail global-padding-sm text-center">
                <span className="inline-block icon text-4xl">
                  <i className="fad fa-times-circle"></i>
                </span>
                <p className="font-normal mt-4">
                  Ngã ở đâu, gấp đôi ở đó! Chúc bạn may mắn lần sau!
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