import React from "react";
import { backgroundImage } from "tailwindcss/defaultTheme";

export const CardProject = ({title, link, img, status, raise, participian, tokenLogo, tokenPrice, countdown, token, progressToken, target, endedin, type, network}) => {
  
  return (
    <a href={link} className={`card-project card-project-sm`}>
      <div className="project-content">

        <div class="project-content--meta">
          <div className="project-title">
            <div className="project-title--token-logo">
              <img src={tokenLogo} className="rounded-full" />
            </div>
            <div>
              <div className="flex items-baseline">
                <div className="project-title--token-name">
                  {title}
                </div>
              </div>
            </div>
          </div>

          <ul className="project-fields">
            <li className="list-pair">
              <span className="list-key">
                Total Raise
              </span>
              <span className="ml-auto list-value font-semibold">
              {raise}
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                Participians
              </span>
              <span className="list-value">
                <span className="font-semibold">{participian}</span>
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                Progress
              </span>
              <span className="list-value">
                <span className="font-semibold">{progressToken}</span>
                <span className="opacity-70">/{target}</span> {token}
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                Ended in
              </span>
              <span className="list-value">
                <span className="font-semibold">{endedin}</span>
              </span>
            </li>
          </ul>

          <div className="project-status">
            <span className={`label label-${status}`}>
              {status}
            </span>
          </div>

        </div>
      </div>
        {/* End of project--content */}
      {/* End of card--body */}
     
      {/* End of card--wrapper */}
    </a>
    
  )
}

export default CardProject