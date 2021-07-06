
import styles from "../../styles/modules/Widget.influencers.module.css";
import Link from "next/link"
import {uuid} from "@walletconnect/utils";

const InfluencerInfoType = ({word}) => {
  const cWord = word.trim().toLowerCase()
  if (cWord === ""){
    return ""
  }
  return (
    <Link href={`/tags/${cWord}`}>
      <span className={`badge ${styles.info} ${styles.info_type}`}>
        {word}
      </span>
    </Link>
  )
}

export function Influencer({item}) {
  const keywords = item.keywords?.split(",") || []
  return (
    <div className={`widget-list`}>
      <div className={`group widget-list--item`}>

        <div className="flex">

          <div className="flex flex-col flex-1">
            <div className={`${styles.title}`}>
              <span>{item.name}</span>
            </div>

            <div className={`${styles.info_wrapper}`}>
              {keywords.map(function (word) {
                return (
                  <InfluencerInfoType key={uuid()} word={word}/>
                )
              })}
            </div>
          </div>

          {item.image ?
            <div className={`${styles.avatar}`}>
              <img src={item.image} alt={item.name}/>
            </div>
            : ""
          }

        </div>


        <div className="flex">
          <div className={`${styles.text}`}>
            {item.description}
          </div>
        </div>

        <div className={`${styles.links}`}>
          {item.twitter !== null ?
          <a href={item.twitter} target="_blank">
            <span className={`icon ${styles.links__icon}`}>
              <i className="fab fa-twitter"/>
            </span>
          </a>
            :
            ""
          }

          {item.linkedin !== null ?
          <a href={item.linkedin} target="_blank">
            <span className={`icon ${styles.links__icon}`}>
              <i className="fab fa-linkedin-in"/>
            </span>
          </a>
            :
            ""
          }

          {item.website !== null ?
          <a href={item.website} target="_blank">
            <span className={`icon ${styles.links__icon}`}>
              <i className="fal fa-globe"/>
            </span>
          </a>
            :
            ""
          }

        </div>

      </div>
    </div>
  )
}