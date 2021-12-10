import React from "react";

export const CardProject = ({title, link, img, status, raise, tokenLogo, tokenPrice, countdown, token, progressToken, target, progressPercentage, type, network, desc}) => {
  
  return (
    <a href={link} className={`card-project card-project-lg`}>

      <div className="project-content">

        <div className="project-thumb">
          <div className="project-thumb--wrapper">
            <img className="project-thumb--img" src={img} alt="{title}" />
          </div>

          <div className="project-type">
            <span className={`label ml-auto featured`}>Featured</span>
            <span className={`label ml-auto ${type}`}>{type}</span>
          </div>

          <div className={`countdown-mini--wrapper ${status == "closed" ? "hidden" : ""}`}>
            <h5>Project Status</h5>
            <div className="countdown--mini">
              <div className="countdown--mini--body countdown--mini--body--day">
                <time>12</time> <span>days</span>
              </div>
              <div className="countdown--mini--body countdown--mini--body--hour">
                <time>15</time>
                <span>hrs</span>
              </div>
              <div className="countdown--mini--body countdown--mini--body--minute">
                <time>48</time>
                <span>min</span>
              </div>
              <div className="countdown--mini--body countdown--mini--second">
                <time>24</time>
                <span>sec</span>
              </div>
            </div>
          </div>
        </div>

        <div class="project-content--meta">
          <div className="project-title">
            <div className="project-title--token-logo">
              <img src={tokenLogo} className="rounded-full" />
            </div>
            <div className="project-title--token-name ">
              {title}
            </div>
            <span class="badge badge-coin badge-coin-lg ml-2">{token}</span>
          </div>

          <div className="project-desc">
            {desc}
          </div>

          <ul className="project-fields">
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

          <div className="progress-bar mt-2 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
            <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full" title={progressPercentage} style={{width: `${progressPercentage}`}}>{progressPercentage}</div>
          </div>

          <div className="project--cta">
            <a href="project" className={`rounded-lg btn-default btn-default-lg btn-primary block mt-auto text-center is-${status}`}><span>
              {status == "closed" ? "Closed" : "Invest now"}
              </span>
            </a>
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

export default CardProject