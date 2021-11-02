import React from "react";
import utils from "../../lib/util";
import ContentLoader from "react-content-loader";
import RadaSvg from "../svg/rada";
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

export const CardProject = ({project}) => {
    const {symbol, title, img, description, tokenLogo, max_allocation, total_allocation, min_allocation, price} = project
  
    return (
    <div className="card--wrapper">
      <div className="card--header">
        <div className="token-logo">
          <img src={tokenLogo} />
        </div>
        <a href="./concepts/launchpad/project"><h3>{title}</h3></a>     
      </div>
      <div className="card--body p-3 lg:p-5">
        <img className="project-thumb" src={img} alt="{title}" />
        <div className="project-desc pb-1">
          {description}
        </div>
        <ul className="mb-0 mt-auto pt-2 border-t border-gray-200 dark:border-gray-900">
          <li className="list-pair mt-auto mb-0">
            <span className="list-key">
              Requirement
            </span>
            <span className="list-value">
              'xxxx'
            </span>
          </li>
          <li className="list-pair">
            <span className="list-key">
              Maximum allocation
            </span>
            <span className="list-value flex items-center">
              <span className="w-3 h-3 mr-1"><RadaSvg /></span> {max_allocation} RIR
            </span>
          </li>
        </ul>
      </div>
      {/* End of card--body */}
      <div className="card--footer">
        <Link href={`projects/${symbol.toLowerCase()}`}><a className="rounded-lg btn-primary block m-5 p-3 text-center">Invest</a></Link>
      </div>
    
    {/* End of card--wrapper */}
    </div>
  )
}