export const Card = ({title, text, mediaUri, avatarUri, link, isMulti}) => {
  const content = 
    <div className="card card-collection">
      <div className="card-media">
        <img className="card-img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-body-media">
            <img className="card-img" src={avatarUri} />
          </div>
          <div className="card-title">{title}</div>
        </div> 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
        </div>
      </div>
      { isMulti && 
      <div className="card-is-multi"></div> }
    </div>;

  return link ? (
    <a className="card-link" href={link}>
      {content}
    </a>
  ) : (
    content
  );
};