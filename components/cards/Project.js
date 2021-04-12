export const Card = ({title, text, mediaUri, submitterImgUri, link, voteTotal}) => {
  const content = 
    <div className="card card-project flex-row items-center content-center">
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
        </div>
      </div>
      <div className="card-footer">
        <btn className="btn btn-project-vote">
          <span className="btn-project-vote_total">
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