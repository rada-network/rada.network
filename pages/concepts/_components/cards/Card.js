const Card = ({post, title, text, mediaUri, link}) => {
  const content = 
    <div className="card">
      <div className="card-media">
        <img className="card-img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-title">{title}</div>
        </div> 
        <div className="card-body-main">
          <div className="card-text text-color-desc">{text}</div>
        </div>
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

export default Card