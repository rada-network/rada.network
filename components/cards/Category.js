//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import Link from "next/link"

export const Card = ({title, cta, text, itemType}) => {
  return (
    <div className={`card card-category card-category_${itemType || 'default'}`}>

      <div className="card-body">
        { title && 
        <div className="card-body-header">
          <div className="card-title line-clamp-1">{title}</div>
        </div> }
        { text && 
        <div className="card-body-main">
          <div className="card-text">{text}</div>
        </div> }
        { cta && 
        <div className="card-body-footer">
          <div className="card-cta">
            <button className="btn">
              <span className="btn-text">
                <Link href={`/explore/${itemType}`}>
                  {cta}
                </Link>
              </span>
              <span className="icon"><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div> }
      </div>

    </div>
  );
};