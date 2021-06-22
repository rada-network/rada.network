import Link from "next/link"
import styles from '../../styles/modules/Card.media.module.css'

export const Card = ({mediaUri, itemType, title, text, cta, onClick}) => {
  return (
    <div className={`card ${styles.card}`} onClick={onClick}>
      <div className={`${styles.card_media} h-full`}>
        <img className={`${styles.media} cursor-pointer`} src={mediaUri} />
      </div> 
      { title || text || cta && 
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
              <span className="btn__text">
                <Link href={`/explore/${itemType}`}>
                  {cta}
                </Link>
              </span>
              <span className="icon"><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div> }
      </div> }
    </div>
  );
};