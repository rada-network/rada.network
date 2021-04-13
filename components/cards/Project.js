import { RiArrowUpSFill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";


export const Card = ({title, text, mediaUri, projectDate, projectSubmitter, projectSubmitterImgUri, projectCommentsCounts, link, voteTotal}) => {
  const content = 
    <div className="card group card-project flex-row items-center content-center">
      <div className="card-media project-icon">
        <img className="card-img project-icon_img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-title">{title}</div>
        </div> 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
        </div>
        <div class="card-body-footer">
          <div className="metadata-wrapper project-metadata-wrapper">
              <div class="metadata project-metadata_date">
                <span class="icon"></span>
                <span class="metadata-value">{projectDate}</span>
              </div>
              <div class="metadata project-metadata_submitter">
                <div className="card-body-media project-submitter inline-block mr-1">
                  <img className="card-img project-submitter_img" src={projectSubmitterImgUri} />
                </div>
                <span class="metadata-value">{projectSubmitter}</span>
              </div>
              <div class="metadata-divider"></div>
              <div class="metadata project-comment_count">
                <span class="icon mr-1"><RiChat1Fill /></span>
                <span>{projectCommentsCounts}</span>
              </div>
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
    </div>;

  return link ? (
    <a className="card-link" href={link}>
      {content}
    </a>
  ) : (
    content
  );
};