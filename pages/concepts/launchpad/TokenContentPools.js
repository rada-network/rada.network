import { BscSvg} from "../../../components/svg/SvgIcons";
import CopyToClipboard from "react-copy-to-clipboard"
const TokenContent = function({tokenData,token}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>Overview</h3>
        </div>
        

        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
            <li className="list-pair mb-2">
              <span className="list-key">
                PRL's Contract
              </span>
              <div className="ml-auto flex items-center list-value font-semibold">
                <a target="_blank" href="" title="0x3554dfdf1478f16">0x35....78f16</a>
                <CopyToClipboard text="">
                  <button class="btn btn-default ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Network
              </span>
              <div className="ml-auto flex items-center list-value">
                <span className="w-4 h-4 mr-2">
                  <BscSvg />
                </span>
                <span>Binance Smart Chain</span>
              </div>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Website
              </span>
              <div className="list-value flex justify-end ml-auto items-center">
                <i class="fa-solid fa-globe mr-2"></i>
                <a href="http://theparallel.io/" target="_blank" className="link">https://theparallel.io</a>
              </div>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Connect
              </span>
              <ul className="flex ml-auto">
                <li className="ml-2">
                  <a class="btn-twitter" title="Twitter" target="_blank" href="#" rel="noreferrer">
                    <i class="fa-brands fa-twitter"></i>
                    <span className="sr-only">Twitter</span>
                  </a>
                </li>
                <li className="ml-2">
                  <a class="btn-discord"  title="Discord" target="_blank" href="#" rel="noreferrer">
                    <i class="fa-brands fa-discord"></i>
                    <span className="sr-only">Discord</span>
                  </a>
                </li>
                <li className="ml-2">
                  <a class="btn-medium"  title="Medium" target="_blank" href="#">
                    <i class="fa-brands fa-medium"></i>
                    <span className="sr-only">Medium</span>
                  </a>
                </li>
                <li className="ml-2">
                  <a class="btn-telegram"  title="Telegram"  target="_blank" href="#" rel="noreferrer">
                    <i class="fa-brands fa-telegram"></i>
                    <span className="sr-only">Telegram</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
         
        </div>
      </div>
      {/* end of project-brief */}

      <div className="card card-default project-process">
        <div className="card-header">
          <h3>Parallel's Info</h3>
        </div>
        <div className="card-body">
          <p className="">
          A world built on Runes and 3D cubes to enhance your creativity. You can build your unique character (Paragon) and have its copyright, then trade your Paragon for tokens or join the battle for amazing rewards.
          </p>
          <p className="mt-auto pt-4">
            <a href="#" className="link">Read full research</a> 
            {/* <span className="icon text-2xs ml-0.5"><i className="fa-duotone fa-external-link"></i></span> */}
          </p>
        </div>

      </div>
     
    </div>
  )
}

export default TokenContent;