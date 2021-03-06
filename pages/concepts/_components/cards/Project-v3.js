import React from "react";

export const CardProject = ({title, link, img, status, statusName, raise, tokenLogo, tokenPrice, countdown, token, progressToken, target, progressPercentage, type, network, desc}) => {

  return (
    <a href={link} className={`card-project is-${status}`}>
      <div className="project-content relative">

        <div className="block">
          <div className={`countdown-mini--wrapper top-0 !bottom-auto`}>
            <div>{statusName}</div>
            <div className="countdown--mini">
              <div className="countdown--mini--body countdown--mini--body--day">
                <time>12</time> <span title="day">d</span>
              </div>
              <div className="countdown--mini--body countdown--mini--body--hour">
                <time>15</time>
                <span title="hour">h</span>
              </div>
              <div className="countdown--mini--body countdown--mini--body--minute">
                <time>48</time>
                <span title="minute">m</span>
              </div>
              <div className="countdown--mini--body countdown--mini--second">
                <time>24</time>
                <span title="second">s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="project-content--meta">
          <div className="project-title flex justify-between items-center">
            <div className="text-xl">
              <h5>{title}</h5>
            </div>
            <div className="project-status -mt-1">
              <span className={`label label-${status}`}>{status}</span>
            </div>
          </div>

          <ul className="project-fields">
            <li className="list-pair mt-auto mb-0">
              <span className="list-key">
                Total Raise
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
            <a href="project" className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
              <span>
               View Details
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