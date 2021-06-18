import Link from "next/link"
import styles from '../../styles/modules/Card.miniH.module.css'

export const CardMiniH = ({title, text, mediaUri, mediaType, link}) => {
  const content = 
    <div className={`card group ${styles.card}`}>

      <div className={`${styles.card_media}`}>
        <img className={`${styles.media}`} src={mediaUri} />
      </div> 

      <div className={`${styles.card_body}`}>

        { title && 
        <div className={`${styles.card_body__header}`}>
          <div className={`${styles.card_title}`}>{title}</div>
        </div> }

        <div className={`${styles.card_body__footer}`}>
          <div className="metadata-wrapper">
            <div className="metadata metadata_author">
              <span className="metadata-value">Cardano Foundation</span>
            </div>
            <div className="metadata metadata_date">
              <span className="metadata-value">2d</span>
            </div>
          </div>
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