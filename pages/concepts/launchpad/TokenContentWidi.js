import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
const TokenContent = function({tokenData,token}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>LaunchVerse Overview</h3>
        </div>
        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
            <li className="list-pair mb-2">
              <span className="list-key">
                Raise
              </span>
              <span className="ml-auto list-value font-semibold">
                350,000 USDT
              </span>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Participants
              </span>
              <span className="ml-auto list-value font-semibold">
                2,200
              </span>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Token Price
              </span>
              <span className="ml-auto font-semibold">0.035 USDT </span>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Progress
              </span>
              <span className="list-value ml-auto">
                <span className="font-semibold">6,000,000</span>
                <span className="opacity-70">/10,000,000</span> WIDI
              </span>
            </li>
          </ul>
          <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div className="text-2xs font-semibold  flex px-2 text-white items-center progress-bar--percentage h-5 bg-green-600 rounded-full" style={{width: `72%`}}>72%</div>
          </div>
        </div>
      </div>
      {/* end of project-brief */}

      <div className="card card-default">
        <div className="card-header">
          <h3>Widiland's Info</h3>
        </div>
        <div className="card-body">
          <p className="">
          WidiLand is an NFT Game aiming to become a globally well-known social networking game. Enabled by blockchain technology, these digital in-game items, lands, and characters have both recreational and financial value
          </p>
          <p className="mt-auto">
            <a href="#" className="link">Read full research</a> <span className="icon text-2xs ml-0.5"><i className="fa-duotone fa-external-link"></i></span>
          </p>
        </div>

      </div>
      {/* end of project-process */}
    </div>
  )
}

export default TokenContent;