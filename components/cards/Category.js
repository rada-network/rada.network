import Link from "next/link"
import styles from '../../styles/modules/Card.category.module.css'

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const Card = ({title, cta, text, itemType}) => {
  return (
    <div className={`card group ${styles.card_category}`} type={`${itemType || 'default'}`}>

      <div className={`card-body ${styles.card_body}`}>
        { title && 
        <div className={`card-body-header ${styles.card_body__header}`}>
          <div className="card-title line-clamp-1">{title}</div>
        </div> }
        { text && 
        <div className={`card-body-main ${styles.card_body__main}`}>
          <div className={`card-text ${styles.card_text}`}>{text}</div>
        </div> }
        { cta && 
        <div className={`card-body-footer ${styles.card_body__footer}`}>
          <div className="card-cta">
            <button className="btn">
              <span className="btn-text text-sm">
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