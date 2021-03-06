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
              <ProjectTimeline step="2" />
            </div>

            <div className="project-card--container">
              <div className="mb-8 sr-only">
                <h3 className="text-2xl text-center font-normal">
                  <span className="text-color-title">Chuyển đổi Token</span>
                </h3>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">

                <div className="box box--transparent">

                  <div className="box-header !px-0">Your allocation</div>

                  <ul className="mt-4 flex-shrink-0 flex-grow">
                    <li className="list-pair mb-2">
                      <span className="list-key">Your maximum allocation</span>
                      <span className="ml-auto list-value font-semibold">
                        1000 USDT (3 RIR)
                      </span>
                    </li>
                    <li className="list-pair mb-2">
                      <span className="list-key">Your minimum allocation </span>
                      <span className="ml-auto list-value font-semibold">
                        100 USDT (1 RIR)
                      </span>
                    </li>
                    <li className="list-pair mb-2">
                      <span className="list-key">Your available allocation</span>
                      <span className="ml-auto font-semibold">
                        200 USDT (2 RIR)
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <p>
                      <span className="icon mr-2 text-base">
                        <i className="fas fa-info-circle text-yellow-500"></i>
                      </span>
                      <span>
                        Some notices about rights or terms here.
                      </span>
                    </p>
                  </div>

                </div>

                <div className="box box--gray">
                  <div className="box-header">Swap Token</div>
                  <SwapTokens />
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
              
              <Winners />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainActions