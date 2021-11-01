import ProjectTimeline from "../../../concepts/steps/projectTimeline-2";
import SwapTokens from "../../../concepts/modules/swapTokens";

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

            <div className="global-padding-lg !px-4 min-h-full w-full mx-auto">
              <div className="mb-8">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Swap Tokens</span>
                </h3>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">

                <div className="global-padding">

                  <ul class="mb-4 mt-auto flex-shrink-0 flex-grow">
                    <li class="list-pair mb-2">
                      <span class="list-key">Max Allocation</span>
                      <span class="ml-auto list-value font-semibold">
                        300 USDT (3 RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Have bought</span>
                      <span class="ml-auto list-value font-semibold">
                        100 USDT (1 RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Remaining</span>
                      <span class="ml-auto font-semibold">
                        200 USDT (2 RIR)
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <p>
                      <span className="icon mr-2 text-base">
                        <i class="fas fa-info-circle text-yellow-500"></i>
                      </span>
                      <span>
                        Some notices about rights or terms here.
                      </span>
                    </p>
                  </div>

                </div>

                <div className="box box--gray global-padding">
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
              <div className="">
                <h3 className="text-3xl text-center mb-8 font-normal">
                  <span className="text-color-title">List of Winners Here</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainActions