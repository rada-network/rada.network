import ProjectTimeline from "../../../concepts/steps/projectTimeline";
import SwapTokens from "../../../concepts/modules/swapTokens-backup";
import Winners from "./Winners";
const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="">
              <ProjectTimeline step="3" />
            </div>

            <div className="project-card--container">
              <div className="max-w-2xl mx-auto text-center">
              
                <div className="mx-auto">
                  <h3 className="text-xl mb-4 text-yellow-600 dark:text-red-500">Your application was rejected</h3>
                  <p>Unfortunately your application has failed. Good luck next time! Meanwhile, you can <a>claim your refund</a>.</p>
                </div>
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
              <input
                type="text"
                value=""
                className="form-search--input"
                placeholder="Search for winner"
              />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="global-padding-lg min-h-full">
              <div className="">
                <Winners />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainActions