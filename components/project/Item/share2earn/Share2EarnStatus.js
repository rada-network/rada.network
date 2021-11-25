import useChainConfig from "@utils/web3/useChainConfig"
import CopyToClipboard from "react-copy-to-clipboard"
import RadaSvg from "@components/svg/rada"
import { toast } from "react-toastify"
const Share2EarnStatus = ({ level1, level2 }) => {
  const { getRIRAddress, getBscScanURL } = useChainConfig()
  const riraddress = getRIRAddress()

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  }

  return (

    <div className="mb-8 items-center text-base mt-4 bg-gray-50 
            dark:bg-gray-900 dark:bg-border-800 border border-gray-200 dark:border-gray-700 rounded-lg md:ml-14">
      <div className="p-4  border-b border-gray-200 dark:border-gray-700">
        Your Share2Earn status
      </div>
      <div className="p-4">
        <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
          <li className="list-pair mb-2">
            <div className="list-key">
              RIR Contract
              <span
                className="hasTooltip"
                data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                data-event="hover"
              ><i className="fa-duotone fa-info-circle text-base" />
              </span>
            </div>
            <div className="px-2 py-1 rounded flex bg-gray-100 dark:bg-gray-800 ml-auto list-value hover:bg-gray-200 hover:dark:bg-gray-900">
              <div>
                <a href={getBscScanURL()}>{`${riraddress.substr(0, 5)}...${riraddress.substr(-4)}`}</a>
                </div>
              <CopyToClipboard
                onCopy={handleCopy}
                text={riraddress}
              >
                <button class="btn ml-2">
                  <i className="fa-duotone fa-copy text-xs"></i>
                </button>
              </CopyToClipboard>
            </div>
          </li>

          <li className="list-pair mb-2">
            <div className="list-key">
              Tier 1
              <span
                className="hasTooltip"
                data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                data-event="hover"
              > <i className="fa-duotone fa-info-circle text-base" />
              </span>
            </div>
            <div className="ml-auto flex items-center list-value font-semibold">
              {level1}
            </div>
          </li>

          <li className="list-pair mb-2">
            <div className="list-key">
              Tier 2
              <span
                className="hasTooltip"
                data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                data-event="hover"
              > <i className="fa-duotone fa-info-circle text-base" />
              </span>
            </div>
            <span className="ml-auto font-semibold">{level2}</span>
          </li>

          <li className="list-pair mb-2">
            <div className="list-key">
              Earned
              <span
                className="hasTooltip"
                data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                data-event="click"
              > <i className="fa-duotone fa-info-circle text-base" />
              </span>
            </div>
            <div className="ml-auto flex items-center font-semibold">
              <span class="icon w-4 h-4 mr-1">
                <RadaSvg />
              </span>
              {level1*0.1 + level2*0.01} RIR
            </div>
          </li>

          <li className="list-pair mb-2">
            <div className="list-key">
              Your ranking
              <span
                className="hasTooltip"
                data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                data-event="click"
              > <i className="fa-duotone fa-info-circle text-base" />
              </span>
            </div>
            <div className="ml-auto flex items-center font-semibold">
              <div>45<span className="font-normal opacity-70">/850</span></div>
              <button className="!text-xs btn btn-default ml-2">
                Leaderboard
              </button>
            </div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default Share2EarnStatus