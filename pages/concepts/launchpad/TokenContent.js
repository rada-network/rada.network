import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
const TokenContent = function({tokenData,token}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>LaunchVerse Overview</h3>
        </div>
        {/* <div className="message warning flex mx-2 mt-2 md:mx-4 md:mt-4 relative items-center">
          <span className="message-icon">
            <i className="mr-2 fas fa-exclamation-circle"></i>
          </span>
          <div className="message-content pr-2">
            This pool is already closed.
          </div>
          <button className="flex items-center ml-auto w-4 h-4 ">
            <i className="text-base fas fa-times"></i>
          </button>
        </div>    */}

        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
            <li className="list-pair mb-2">
              <span className="list-key">
                Raise
              </span>
              <span className="ml-auto list-value font-semibold">
                360,000 BUSD
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
              <span className="ml-auto font-semibold">0.036 BUSD </span>
            </li>
            <li className="list-pair mb-2">
              <span className="list-key">
                Progress
              </span>
              <span className="list-value ml-auto">
                <span className="font-semibold">7,200,000</span>
                <span className="opacity-70">/10,000,000</span> PRL
              </span>
            </li>
          </ul>
          <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-600 rounded-full" style={{width: `72%`}} title="72%">72%</div>
          </div>
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
      {/* end of project-process */}
    </div>
  )
}

export default TokenContent;