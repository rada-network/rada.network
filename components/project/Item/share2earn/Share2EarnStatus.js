import useChainConfig from "@utils/web3/useChainConfig"
import CopyToClipboard from "react-copy-to-clipboard"
import RadaSvg from "@components/svg/rada"
import {toast} from "react-toastify"
const Share2EarnStatus = ({level1, level2}) => {
  const {getRIRAddress} = useChainConfig()
  const riraddress = getRIRAddress()

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  }

  return (
    <div className="mb-8 items-center text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg md:ml-14">
      <div className="p-4  border-b border-gray-200 dark:border-gray-700">
        Your Share2Earn status
      </div>
      <div className="p-4">
        <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
          <li className="list-pair mb-2">
            <span className="list-key">
              RIR Contract
            </span>
            <div className="px-2 py-1 rounded flex bg-gray-100 dark:bg-gray-800 ml-auto list-value hover:bg-gray-200 hover:dark:bg-gray-900">
              <div>{`${riraddress.substr(0,5)}...${riraddress.substr(-4)}`}</div>
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
            <span className="list-key">
              Referral Level 1
            </span>
            <div className="ml-auto flex items-center list-value font-semibold">
              {level1}
            </div>
          </li>
          <li className="list-pair mb-2">
            <span className="list-key">
              Referral Level 2
            </span>
            <span className="ml-auto font-semibold">{level2}</span>
          </li>
          <li className="list-pair mb-2">
            <span className="list-key">
              Earned
            </span>
            <div className="ml-auto flex items-center font-semibold">
              <span class="icon w-4 h-4 mr-1">
                <RadaSvg />
              </span>
              {level1*0.1 + level2*0.01} RIR
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Share2EarnStatus