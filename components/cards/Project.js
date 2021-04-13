import { RiArrowUpSFill } from "react-icons/ri";

export const Card = ({title, text, mediaUri, submitterImgUri, link, voteTotal}) => {
  const content = 
    <div className="card group card-project flex-row items-center content-center">
      <div className="card-media project-icon">
        <img className="card-img project-icon_img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-body-media project-submitter">
            <img className="card-img project-submitter_img" src={submitterImgUri} />
          </div>
          <div className="card-title">{title}</div>
        </div> 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
          <div className="card-text">
            <div class="project-metadata-wrapper">
              <div class="project-date">
                5 hours ago
              </div>
              <div class="project-date">
                rada.co
              </div>
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