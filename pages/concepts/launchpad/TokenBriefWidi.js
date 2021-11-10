import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
const TokenBrief = function(){
  return (
    <>
      <div className="section-header mb-4">
                            
        <div className="flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-0 flex-shrink-0 mb-4 items-center">
            <span className="icon flex-shrink-0 mr-2">
              <img src="/token-logos/widiland.jpg" className="rounded-full h-px-32 w-px-32" alt="Parallel" />
            </span>
            <h1 className="flex items-center">
              <strong className="text-color-title text-xl lg:text-2xl font-semibold">Widiland</strong>
              <span className="badge badge-coin badge-coin-lg ml-2 -mb-1">WIDI</span>
            </h1>
          </div>

          <div className="flex flex-wrap space-x-4 mb-4">

        

            <div className="flex items-center text-sm">
              <span className="w-4 h-4">
                <BscSvg />
              </span>
              <span className="ml-1">Binance Smart Chain</span>
            </div>

            <div className="label private">Public</div>
          </div>
        </div>

      </div>


      {/* Video / Banner of Project */}
      <div className="page-media">
        <div className="media-player">
          <div className="w-full h-full">
            <div className={`aspect-w-16 aspect-h-9`}>
              <img className="rounded-lg" src="/placeholders/widiland-thumb.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TokenBrief;