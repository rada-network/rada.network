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
              <div className="max-w-2xl mx-auto text-center p-4 md:p-6 rounded-lg ">
              
                <div className="flex items-center flex-col lg:flex-row ">
                  <div className="s2e-illustration flex-shrink-0"></div>
                  <div className="text-left ml-2">
                    <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">We've already prefunded your investment!</h3>
                    <p className="mb-2 pb-4 border-b border-b-gray-200 dark:border-b-gray-700">We're processing your application. Meanwhile, you can join our Share2Earn program to increase your chance to win
                      the investment</p>
                    <div>
                      <div className="mb-2">
                        <div className="mb-2 text-gray-500">Your current chance to win: <span>1%</span></div>
                        <div className="h-2 w-4 rounded-full bg-red-500"></div>
                      </div>
                      <div>
                        <div  className="mb-2 text-gray-500">Chance to win for Share2Earn participation: <span className="text-white">99%</span></div>
                        <div className="h-2 w-full rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <a href="" className="btn btn-primary mt-4 px-4 py-2">Share to Earn</a>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default MainActions