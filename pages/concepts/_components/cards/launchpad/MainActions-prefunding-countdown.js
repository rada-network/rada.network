import ProjectTimeline from "../../steps/projectTimeline";
import CountDownLg from "../../timers/countdownLg-swap";

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">
        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline step="2" />
            </div>

            <div className="project-card--container">

              <div className="mb-8 box box--success global-padding-sm">
                <p className="text-center font-normal">
                  Xin chúc mừng! Bạn đã là người chiến thắng trong vòng whitelist.<br />
                  Hãy chờ tới ngày chuyển đổi token nhé!
                </p>
              </div>

              <div className="mb-4 md:mb-8">
                <h3 className="text-2xl md:text-3xl text-center font-normal">
                  <span className="text-color-title">Chuyển đổi Tokens</span>
                </h3>
              </div>

              <div className="">
                <CountDownLg />
              </div>

            </div>

          </div>
            
        </div>

      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-4">

        <div className="card-header items-center">
          <h3>Người được chọn (1000)</h3>
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