import ProjectTimeline from "../../steps/projectTimeline";
import SwapTokens from "../../modules/swapTokens-backup";
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
              
              <div className="flex items-center">
                <div className="s2e-illustration flex-shrink-0"></div>
                <div className="text-left ml-2">
                <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">Congratulations! You&rsquo;re selected as a Parallel's investor</h3>
                  <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
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