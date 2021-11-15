import ProjectTimeline from "../../../concepts/steps/projectTimeline";
import SwapTokens from "../../../concepts/modules/swapTokensDropdown";
import Winners from "./Winners";

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
              <ProjectTimeline step="2" />
            </div>

            <div className="global-padding-lg !px-6 min-h-full w-full mx-auto">
              <div className="mb-8 sr-only">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Swap tokens</span>
                </h3>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">

                <div className="box box--transparent">

                  <div className="box-header !px-0">Your allocation</div>

                  <ul class="mt-4 flex-shrink-0 flex-grow">
                    <li class="list-pair mb-2">
                      <span class="list-key">Your maximum allocation</span>
                      <span class="ml-auto list-value font-semibold tabular-nums">
                        500 BUSD (5 RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Your minimum allocation </span>
                      <span class="ml-auto list-value font-semibold tabular-nums">
                        100 BUSD (1 RIR)
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <p>
                      <span className="icon mr-2 text-base">
                        <i class="fas fa-info-circle text-yellow-500"></i>
                      </span>
                      <span>
                        If you already have RIR, it's recommended to use RIR instead of 
                        BUSD to quarantee your application.
                      </span>
                    </p>
                  </div>

                </div>

                <div className="box box--gray">
                  <div className="box-header relative">Prefund your investment
                    {/* <div className="absolute inset-y-0 right-4 flex items-center h-10 top-2 ">
                      <label for="currency" className="sr-only">Currency</label>
                      <select id="currency" name="currency" className="select-custom !border-transparent">
                        <option>BUSD</option>
                        <option>RIR</option>
                      </select>
                    </div> */}
                  </div>
                  <SwapTokens />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-4">
        <div className="card-header items-center">
          <ul className="whitelist-nav">
            <li><a>Whitelist</a></li>
            <li className="is-active"><a>Winners</a><span>550</span></li>
          </ul>
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