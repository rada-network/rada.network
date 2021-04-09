export const Card = ({title, text, mediaUri, link, cta}) => {
  const content = 
    <div className="card card-mini-h">
      <div className="card-media">
      <img className="card-img" src={mediaUri} />
      </div> 
      <div className="card-body">
        { title && 
        <div className="card-body-header">
          <div className="card-title">{title}</div>
        </div> }
        { text && 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
        </div> }
        { cta && 
        <div className="card-body-footer">
          <div className="card-cta">
            <button className="btn">
              <span className="btn-text">{cta}</span>
            </button>
          </div>
        </div> }
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