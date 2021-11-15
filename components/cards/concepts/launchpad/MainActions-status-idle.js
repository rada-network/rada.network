import ProjectTimeline from "../../../concepts/steps/projectTimeline";
import SwapTokens from "../../../concepts/modules/swapTokens";
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

            <div className="global-padding-lg !px-6 min-h-full w-full mx-auto">
              <div className="max-w-2xl mx-auto text-center">
              
              <div className="flex items-center">
                <div className="s2e-illustration flex-shrink-0"></div>
                <div className="text-left ml-2">
                <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">We've already prefunded your investment!</h3>
                  <p>Your application is being proceeded by our system. </p>
                  <p>Please join our &ldquo;Share to earn program&rdquo; to maximize your chances to be selected as an investor.</p>
                  <a href="" className="btn btn-primary mt-4 px-4 py-2">Share to earn</a>
                </div>
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