import { RiArrowUpSFill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";


export const Card = ({title, text, mediaUri, projectType, projectPlatform, projectPlatformShort, projectDate, projectSubmitter, projectSubmitterImgUri, projectCommentsCounts, link, voteTotal}) => {
  return (
    <div className="card group card-project flex-row items-center content-center">
      <div className="card-media project-icon">
        <img className="card-img project-icon_img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-title">
           <a className="card-link" href={link}>
              {title}
            </a>
          </div>
          <div className="metadata-wrapper project-metadata-wrapper">
            <a href="#" className={`metadata badge badge-${projectType || ''} project-metadata_type`}>
              <span className="metadata-value">{projectType}</span>
            </a>
          </div>
        </div> 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
        </div>

        <div className="card-body-footer">
          <div className="metadata-wrapper project-metadata-wrapper">

            <a href="#" className={`metadata project-metadata_platform project-metadata_platform_${projectPlatformShort || ''} `}>
              <img className="card-img" src="./node_modules/cryptocurrency-icons/svg/color/ada.svg" />
              <span className="metadata-value">{projectPlatform}</span>
            </a>

            <div className="metadata-divider"></div>

            <div className="metadata project-metadata_date">
              <span className="icon"></span>
              <span className="metadata-value">{projectDate}</span>
            </div>

            <a href={link} className="metadata project-metadata_submitter hidden">
              <span className="card-body-media project-submitter inline-block mr-1">
                <img className="card-img project-submitter_img" src={projectSubmitterImgUri} />
              </span>
              <span className="metadata-value">{projectSubmitter}</span>
            </a>

            <div className="metadata-divider"></div>

            <a href={link} className="metadata project-comment_count">
              <span className="icon mr-1"><RiChat1Fill /></span>
              <span>{projectCommentsCounts}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <btn className="btn flex-col justify-center w-icon-64 h-icon-64 btn-project-vote rounded-md bg-gray-50 group-hover:bg-primary-700 group-hover:text-white transition-none">
          <span className="icon text-xl"><RiArrowUpSFill /></span>
          <span className="btn-project-vote_total text-xs whitespace-nowrap font-bold transition-all">
            {voteTotal}
          </span>
        </btn>
      </div>
    </div>
  );
};