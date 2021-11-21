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
export const CardProject = ({title, link, img, status, raise, tokenLogo, tokenPrice, countdown, token, progressToken, target, progressPercentage, type, network, desc}) => {
  
  return (
    <a href={link} className={`card-project is-${status}`}>
      {/* {status=="closed"?
        <div className="project-header--wrapper flex items-center mb-4">    
          <div className="project-title p-4 flex items-center">
            <div className="project-title--token-logo bg-white w-6 h-6 p-0.5 mr-1 rounded-full">
              <img src={tokenLogo} />
            </div>
            <div className="project-title--token-name ml-1 font-semibold">
              {title}
            </div>
          </div>
        </div>
      :""} */}
      <div className="project-content">
        <div className="project-thumb">
          <div className="project-thumb--wrapper">
            <img className="project-thumb--img" src={img} alt="{title}" />
          </div>
        </div>
        <div class="project-content--meta">
          
          <div className="project-title">
            <div className="project-title--token-logo bg-white w-6 h-6 md:w-10 md:h-10 p-0.5 mr-1 rounded-full">
              <img src={tokenLogo} className="rounded-full" />
            </div>
            <div className="project-title--token-name ">
              {title}
            </div>
            <div className="project-type">
              <span className={`label ml-auto ${type}`}>{type}</span>
            </div>
          </div>
          <div className="project-desc">
            {desc}
          </div>
          <ul className="">
            
            <li className="list-pair mt-auto mb-0">
              <span className="list-key">
                Raise
              </span>
              <span className="ml-auto list-value font-semibold">
              {raise}
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                Token price
              </span>
              <span className="list-value ml-auto"> {tokenPrice}</span>
            </li>
            {/* {status=="open"? 
            <li className="list-pair">
              <span className="list-key">
                Network
              </span>
              <span className="list-value ml-auto">{network}</span>
            </li>
            : "" } */}
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
          {status=="open" ? 
          <div className="progress-bar mt-2 bg-gray-300 dark:bg-gray-600 w-full h-5 rounded-full">
            <div className="text-3xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-5 bg-green-600 rounded-full" title={progressPercentage} style={{width: `${progressPercentage}`}}>{progressPercentage}</div>
          </div>
          : ""}
          <div className="project--cta ">
            <div className={`countdown--wrapper ${status == "closed" ? "hidden" : ""}`}>
              {/* <div className="opacity-70 flex items-center my-2">
                <span className="flex w-4 h-4 mr-2 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>stopwatch-alternate</title>
                    <path fill="currentColor" d="M19.159,8.257l1.548-1.549a1,1,0,1,0-1.414-1.414l-1.6,1.6A9.448,9.448,0,0,0,13,5.054V2h2a1,1,0,1,0,0-2H9A1,1,0,0,0,9,2h2V5.054a9.5,9.5,0,1,0,8.159,3.2ZM12,22.5a8,8,0,1,1,8-8A8,8,0,0,1,12,22.5Z"/>
                    <path fill="currentColor" d="M12,8a6.5,6.5,0,1,0,6.5,6.5A6.5,6.5,0,0,0,12,8Zm.53,6.822a.759.759,0,0,1-1.06,0L9.428,12.782a.75.75,0,0,1,1.061-1.061l2.041,2.042A.749.749,0,0,1,12.53,14.823Z"/>
                  </svg>
                </span>
                <span className="">Ends in</span>
              </div> */}
              
              {status=="open" ? 
              <div className="countdown--mini">
                <div className="countdown--mini--body countdown--mini--body--day">
                  <time>12</time> <span>days</span>
                </div>
                <div className="countdown--mini--body countdown--mini--body--hour">
                  <time>15</time>
                  <span>hrs</span>
                </div>
                <div className="countdown--mini--body countdown--mini--body--minute">
                  <time> 48 </time>
                  <span>min</span>
                </div>
                <div className="countdown--mini--body countdown--mini--second">
                  <time> 24 </time>
                  <span>sec</span>
                </div>
              </div> : ""}
              
              
            </div>

            {status!="upcoming"?<a href="project" className={`rounded-lg btn-primary block mt-4 p-3 text-center is-${status}`}><span>
              {status == "closed" ? "Closed" : "Invest now"}
              </span>
            </a> : ""}
          </div>
          {/* End of project-cta */}
        </div>
      </div>
        {/* End of project--content */}
      {/* End of card--body */}
     
      {/* End of card--wrapper */}
    </a>
    
  )
}