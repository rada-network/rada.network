import Link from "next/link"
import styles from '../../styles/modules/Card.category.module.css'

import {IoChevronForwardSharp} from "react-icons/io5";
import utils from "../../lib/util";

export const Card = ({title, cta, text, itemType}) => {
  return (
    <Link href={`/explore/${itemType}`}>
    <div className={`card group ${styles.card}`} type={`${itemType || 'default'}`}>

      <div className={`card-body ${styles.card_body}`}>
        { title && 
        <div className={`card-body-header ${styles.card_body__header}`}>
          <div className="card-title line-clamp-1">{utils.topicTransform(title)}</div>
        </div> }
        { text && 
        <div className={`card-body-main ${styles.card_body__main}`}>
          <div className={`card-text line-clamp-3 ${styles.card_text}`}>{text}</div>
        </div> }
        { cta && 
        <div className={`card-body-footer ${styles.card_body__footer}`}>
          <div className={`card-cta ${styles.card_cta}`}>
            <button className={`btn ${styles.btn}`}>
              <span className={`btn__text ${styles.btn_text}`}>
                <a href={`/explore/${itemType}`}>
                  {cta}
                </a>
              </span>
              <span className={`btn__caret_right ${styles.btn__caret_right}`}></span>
            </button>
          </div>
        </div> }
      </div>

    </div>
    </Link>
  );
};