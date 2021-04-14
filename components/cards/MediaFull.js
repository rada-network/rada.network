//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const Card = ({title, text, mediaUri, cta}) => {
  return (
    <div className="card card-media-full">
      <div className="card-media">
        <img className="card-img" src={mediaUri} />
      </div> 
      <div className="card-body">
        { title && 
        <div className="card-body-header">
          <div className="card-title text-base line-clamp-1">{title}</div>
        </div> }
        { text && 
        <div className="card-body-main">
          <div className="card-text text-xs opacity-75">{text}</div>
        </div> }
        { cta && 
        <div className="card-body-footer">
          <div className="card-cta">
            <button className="btn">
              <span className="btn-text">{cta}</span>
              <span className="icon"><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div> }
      </div>
    </div>
  );
};