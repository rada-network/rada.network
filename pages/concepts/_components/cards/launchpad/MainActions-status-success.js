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
              <div className="max-w-xl mx-auto">
              
                <div className="flex">
                  <div className="w-full">
                    <h3 className="text-xl mb-4 text-green-400 dark:text-green-600">
                    ✨ Congratulations! You've successfully prefunded $800
                    </h3>
                    <ul className="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
                      <li className="relative pl-6 mb-2"> 
                        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center mr-2">
                          <i className="fas text-2xs opacity-60 fa-check mx-auto" /> 
                        </span>
                      The winner list will be announced before the IDO event</li>
                      <li className="relative pl-6  mb-2">
                        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center  mr-2">
                          <i className="fas text-2xs opacity-60 fa-check mx-auto" /> 
                        </span>
                        You can claim the token after TGE (Token Generated Events) on the <a href="" className="link">claim</a> page 
                      </li>
                      <li  className="relative pl-6  mb-2">
                        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center mr-2">
                          <i className="fas text-2xs opacity-60 fa-check mx-auto" /> 
                        </span>
                       Vesting schedule will follow The Parallel&rsquo;s <a  href="" className="link">tokenomics</a> 
                      </li>
                    </ul>
                    <div className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex cursor-pointer items-center group">
                      <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow transition-all">
                        <i className="fa fa-money-bill"></i>
                      </span>
                      <div>
                        <p className="mb-1 text-lg text-yellow-600 dark:text-yellow-400 font-medium">Adjust your prefunding</p>
                      
                        <a href="" className="group">
                          <span className="text-sm">Add more fund to increase your chance to win</span>
                          <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
                        </a>
                      </div>
                    </div>
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