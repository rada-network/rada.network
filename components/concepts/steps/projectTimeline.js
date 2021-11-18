import {CheckSvg } from "../../../components/svg/SvgIcons";
const ProjectTimeline = ({step}) => {
  return (
    <>
    {/* Steps Progress */}
    <nav aria-label="Progress">
      <ol role="list" className="steps-compact ">

        <li className={`step-compact ${step == "1" ? "is-current" : ""} 
        ${step == "2" ? "is-complete" : ""} 
        ${step == "3" ? "is-complete" : ""}
        ${step == "4" ? "is-complete" : ""}`}>
          {/* Current Step */}
          <a href="#" className="step-compact-body" aria-current="step">
            <div className="step-compact-body--icon">
              <span className="step-compact-body--icon--text">
              {step == "1" ? "1" : ""}
              {step == "2" ? <CheckSvg /> : ""}
              {step == "3" ? <CheckSvg /> : ""}
              {step == "4" ? <CheckSvg /> : ""}
              </span>
            </div>
            <div className="step-compact-body--content">
              <span className="step-compact-body--title">Whitelist</span>
              <span className="step-compact-body--text">
                Apply for whitelist
              </span>
            </div>
          </a>
          
        </li>
        <li className={`step-compact ${step == "2" ? "is-current" : ""}
         ${step == "3" ? "is-complete" : ""}
         ${step == "4" ? "is-complete" : ""}
         `}>
          {/* Upcoming Step */}
          <a href="#" className="step-compact-body" aria-current="step">
            <div className="step-compact-body--icon">
              <span className="step-compact-body--icon--text">
              {step == "3" ? <CheckSvg /> : "2"}  
              </span>
            </div>
            <div className="step-compact-body--content">
              <span className="step-compact-body--title">Prefunding</span>
              <span className="step-compact-body--text">
                Deposit your fund
              </span>
            </div>
          </a>
         
        </li>

        <li className={`step-compact ${step == "3" ? "is-current" : ""}
        ${step == "4" ? "is-complete" : ""}
         `}>
          {/* Upcoming Step */}
          <a href="#" className="step-compact-body" aria-current="step">
            <div className="step-compact-body--icon">
              <span className="step-compact-body--icon--text">3</span>
            </div>
            <div className="step-compact-body--content">
              <span className="step-compact-body--title">Status</span>
              <span className="step-compact-body--text">
                Status of your application
              </span>
            </div>
          </a>
        </li>
        <li className={`step-compact ${step == "4" ? "is-current" : ""}`}>
          {/* Upcoming Step */}
          <a href="#" className="step-compact-body" aria-current="step">
            <div className="step-compact-body--icon">
              <span className="step-compact-body--icon--text">4</span>
            </div>
            <div className="step-compact-body--content">
              <span className="step-compact-body--title">Claim</span>
              <span className="step-compact-body--text">
                Claim your token
              </span>
            </div>
          </a>
        </li>

      </ol>
    </nav>

    </>
  )
}

export default ProjectTimeline