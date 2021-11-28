import RadaSvg from "../../../../../components/svg/rada";

const TokenMeta = function ({ }) {
  return (
    <div className="flex w-full">
      <div className="text-sm w-full">
        <div className="flex flex-wrap items-end justify-between mb-2">
          <div className="w-auto">
            <div className="field-label">
              Your maximum allocation 
                <span
                  className="hasTooltip"
                  data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
          </div>
          <div className="flex items-center">
            1RIR
            <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
              <RadaSvg />
            </div>
          </div>
        </div>

        

        <div className="flex flex-wrap items-end justify-between mb-2">
          <div className="w-auto">
            <div className="field-label">
              Available RIR for this project  <span
                  className="hasTooltip"
                  data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
            </div>
          </div>
          <div className="flex items-center">
            44/<span className="text-gray-500">50</span>RIR
            <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
            <RadaSvg />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mb-2">
          <div className="w-auto">
            <span className="field-label">
              Token Generated Events (TGE)<span
                  className="hasTooltip"
                  data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
            </span>
          </div>
          <div className="">
          14 December, 2021
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-2">
          <div className="w-auto">
            <span className="field-label">
              Unlocked at TGE <span
                  className="hasTooltip"
                  data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
            </span>
          </div>
          <div className="">
            10% 
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-2">
          <div className="w-auto">
            <span className="field-label">
              Status
            </span>
          </div>
          <div className="label label--active">
            Open for investment
          </div>
          { /*
          <div className="label label--inactive">
            Close for investment
          </div>
          */}
        </div>
      </div>
    </div>   

  )
}

export default TokenMeta
