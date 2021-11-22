import { BscSvg, UsdtSvg, LaunchSvg, BusdSvg } from "../../../svg/SvgIcons";
export default function LaunchpadOverview({ project }) {
  const { token } = project;
  return (
    <>
      <div className="section-header mb-4">
        <div className="flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-0 flex-shrink-0 mb-4 items-center">
            <span className="icon flex-shrink-0 mr-2">
              <img
                src={token.logo}
                className="h-px-32 w-px-32"
                alt={token.name}
              />
            </span>
            <h1 className="flex items-center">
              <strong
                className="text-color-title text-xl lg:text-2xl font-semibold"
                itemProp="name"
              >
                {token.name}
              </strong>
              <span className="badge badge-coin badge-coin-lg ml-2 -mb-1">
                {token.symbol}
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap space-x-4 mb-4">
            <div className="flex items-center text-sm">
              <span className="w-5 h-5">
                <BusdSvg />
              </span>
              <span className="ml-2">BUSD</span>
            </div>

            <div className="flex items-center text-sm">
              <span className="w-4 h-4">
                <BscSvg />
              </span>
              <span className="ml-2">{project?.platform?.networkName.toUpperCase()}</span>
            </div>

            <div className={`label ${project.type}`}>{project.type}</div>
          </div>
        </div>
      </div>

      {/* Video / Banner of Project */}
      <div className="page-media">
        <div className="media-player">
          <div className="w-full h-full">
            {project.cover_embed ? 
            <div className={`aspect-w-16 aspect-h-9`} dangerouslySetInnerHTML={{__html : project.cover_embed}}>
            </div>
            :
            <div className={`aspect-w-16 aspect-h-9`}>
              <img
                className="rounded-lg"
                src={project.cover_uri}
                itemProp="image"
              />
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
