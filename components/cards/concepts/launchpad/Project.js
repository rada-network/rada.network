import React from "react";
import utils from "../../../../lib/util";
import ContentLoader from "react-content-loader";
import RadaSvg from "../../../svg/rada";
import Link from "next/link"
export const NewsLoader = (props) => (
  <div className={`card card-post`}>
    <div className={`card-body`}>
      <ContentLoader
        speed={2}
        backgroundColor="#9CA3AF"
        foregroundColor="#E5E7EB"
        style={{ opacity: '20%' }}
        viewBox="0 0 380 100"
        {...props}
      >
        <rect x="0" y="0" rx="3" ry="3" width="40" height="40" />
        <rect x="48" y="8" rx="3" ry="3" width="128" height="6" />
        <rect x="48" y="24" rx="3" ry="3" width="80" height="6" />
        <rect x="48" y="56" rx="3" ry="3" width="360" height="6" />
        <rect x="48" y="71" rx="3" ry="3" width="380" height="6" />
        <rect x="48" y="88" rx="3" ry="3" width="178" height="6" />
      </ContentLoader>
    </div>
  </div>
)
export const CardProject = ({title, img, status, raise, tokenLogo, countdown, token, progressToken, target, progressPercentage, type}) => {
  
  return (
    <a href="project" className="card--wrapper">
      <div className="card--body p-3 lg:p-4">
        <div className="project-header--wrapper flex items-center mb-4">    
          <div className="project-title flex items-center">
            <div className="project-title--token-logo bg-white w-6 h-6 p-0.5 mr-1 rounded-full">
              <img src={tokenLogo} />
            </div>
            <div className="project-title--token-name ml-1 font-semibold">
              {title}
            </div>
          </div>
          <div className={`label ml-auto ${type}`}>
            {type} 
          </div>
        </div>
        <img className="project-thumb" src={img} alt="{title}" />
        <ul className="mb-0 mt-auto pt-2 border-t border-gray-200 dark:border-gray-900">
        
          <li className="list-pair mt-auto mb-0">
            <span className="list-key">
              Raised
            </span>
            <span className="ml-auto list-value font-semibold">
              {raise}
            </span>
          </li>
          <li className="list-pair">
            <span className="list-key">
              Progress
            </span>
            <span className="list-value ml-auto">
              <span className="font-semibold">{progressToken}</span>
              <span className="opacity-70">/{target}</span> {token}
            </span>
          </li>
        </ul>
        <div className="progress-bar mt-3 bg-gray-300 w-full h-3 rounded-lg">
            <div className="progress-bar--percentage h-3 bg-green-600 rounded-lg" style={{width: `${progressPercentage}`}}></div>
        </div>
      </div>
      {/* End of card--body */}
      <div className="card--footer">
        <div className={`px-4 pt-4 flex items-center  ${status == "closed" ? "hidden" : ""}`}>
          <div className="w-4 h-4 mr-1 text-purple-500 opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>stopwatch-alternate</title>
              <path fill="currentColor" d="M19.159,8.257l1.548-1.549a1,1,0,1,0-1.414-1.414l-1.6,1.6A9.448,9.448,0,0,0,13,5.054V2h2a1,1,0,1,0,0-2H9A1,1,0,0,0,9,2h2V5.054a9.5,9.5,0,1,0,8.159,3.2ZM12,22.5a8,8,0,1,1,8-8A8,8,0,0,1,12,22.5Z"/>
              <path fill="currentColor" d="M12,8a6.5,6.5,0,1,0,6.5,6.5A6.5,6.5,0,0,0,12,8Zm.53,6.822a.759.759,0,0,1-1.06,0L9.428,12.782a.75.75,0,0,1,1.061-1.061l2.041,2.042A.749.749,0,0,1,12.53,14.823Z"/>
            </svg>
          </div>
          <div className="opacity-70 text-sm">Ends in</div>
          <div className="text-md font-semibold ml-auto">{countdown}</div>
        </div>
        <a href="project" className={`rounded-lg btn-primary block m-4 p-3 text-center ${status}`}>
         {status == "closed" ? "Closed" : "Invest"}
        </a>
      </div>
      {/* End of card--wrapper */}
    </a>
    
  )
}