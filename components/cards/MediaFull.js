import Link from "next/link"
import styles from '../../styles/modules/Card.media.module.css'

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const Card = ({title, mediaUri, mediaType}) => {

  const Podcast = () => (
    <div className={`card ${styles.card_media}`}>
      <div className="w-full h-full">
        <div className={`${styles.media} aspect-w-16 aspect-h-9`}>
          <iframe width="640" height="360" src={mediaUri} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" />
        </div>
      </div>
    </div>
  )
  const Video = ({src}) => (
    <div className={`${styles.card_media}`}>
      <div className="w-full h-full">
        <div className={`${styles.media} aspect-w-16 aspect-h-9`}>
          <iframe width="640" height="360" src={mediaUri} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`card ${styles.card}`}>

      { mediaType == 'Video' && <Video src={mediaUri} /> }
      { mediaType == 'Podcast' && <Podcast src={mediaUri} /> }
      
      <div className={`card-body ${styles.card_body}`}>

        <div className={`card-body-header ${styles.card_body__header}`}>
          <a href="#" className={`card-title ${styles.card_title}`}>{title}</a>
        </div>

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

    </div>
  );
};