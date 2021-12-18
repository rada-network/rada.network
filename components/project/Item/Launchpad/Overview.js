import { useTranslation } from "react-i18next";
import { BscSvg, UsdtSvg, LaunchSvg, BusdSvg } from "../../../svg/SvgIcons";
import { useState, useEffect } from "react";
import Image from "@components/Image";
export default function LaunchpadOverview({ project,pool }) {
  const { token } = project;
  const { t } = useTranslation("launchpad");
  const [isWarning, setIsWarning] = useState(false);
  useEffect(() =>{
    if (window.sessionStorage){
      let isShow = window.sessionStorage.getItem("networkWarning")
      if (!!isShow || !pool){
        setIsWarning(false);
      }
      else{
        setIsWarning(true);
      }
    }
  },[])
  const closeWarning = (e) => {
    if (window.sessionStorage){
      window.sessionStorage.setItem("networkWarning",1)
    }
    setIsWarning(false);
  }
  return (
    <>
      {isWarning && (
        <div className="message warning flex relative items-center">
          <span className="message-icon">
            <i className="mr-2 fas fa-exclamation-circle"></i>
          </span>
          <div className="message-content pr-2">{t("bsc warning")}</div>
          <button
            onClick={closeWarning}
            className="flex items-center ml-auto w-4 h-4 "
          >
            <i className="text-base fas fa-times"></i>
          </button>
        </div>
      )}
      <div className="section-header pt-4">
        <div className="flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-0 flex-shrink-0 mb-4 items-center">
            <span className="icon flex-shrink-0 mr-2">
              <Image
                src={token.logo}
                className="h-px-32 w-px-32"
                alt={token.name}
                width={32}
                height={32}
              />
            </span>
            <h1 className="flex items-center">
              <strong
                className="text-color-title text-xl lg:text-2xl font-semibold"
                itemProp="name"
              >
                {token.name}
              </strong>
              <span className="badge badge-coin badge-coin-lg ml-2">
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
              <span className="ml-2">
                {project?.platform?.networkName.toUpperCase()}
              </span>
            </div>

            {!!pool && <div className={`label ${pool.type}`}>{pool.type}</div>}
          </div>
        </div>
      </div>

      {/* Video / Banner of Project */}
      {pool == null && 
      <div className="page-media">
        <div className="media-player rounded-lg">
          <div className="w-full h-full">
            {project.cover_embed ? (
              <div
                className={`aspect-w-16 aspect-h-9`}
                dangerouslySetInnerHTML={{ __html: project.cover_embed }}
              ></div>
            ) : (
              <div className={`aspect-w-16 aspect-h-9`}>
                <Image
                  layout="fill"
                  className="rounded-lg"
                  src={project.cover_uri}
                  itemProp="image"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      }
    </>
  );
}
