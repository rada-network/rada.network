import styles from "../../styles/modules/Widget.module.css";
import stylesInfluencers from "../../styles/modules/Widget.influencers.module.css";
import Link from "next/link"
import {uuid} from "@walletconnect/utils";

const InfluencerInfoType = ({word}) => {
  const cword = word.trim().toLowerCase()
  if (cword === ""){
    return ""
  }
  return (
    <Link href={`/tags/${cword}`}>
        <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
        {word}
      </span>
    </Link>
  )
}

export function Influencer({item}) {
  const keywords = item.keywords?.split(",") || []
  return (
    <div className={`${styles.widget_list__link}`}>
      <div className={`group ${styles.widget_list__item}`}>

        <div className={`${stylesInfluencers.title}`}>
          <span>{item.name}</span>
        </div>

        <div className={`${stylesInfluencers.info_wrapper}`}>
          {keywords.map(function (word) {
            return (
              <InfluencerInfoType key={uuid()} word={word}/>
            )
          })}
        </div>

        <div className="overflow-hidden">
          <div className={`${stylesInfluencers.avatar}`}>
            <img src={item.image} alt={item.name}/>
          </div>
          <div className={`${stylesInfluencers.text}`}>
            {item.description}
          </div>
        </div>

        <div className={`${stylesInfluencers.links}`}>
          {item.twitter !== null ?
          <a href={item.twitter} target="_blank">
              <span className={`icon ${stylesInfluencers.links__icon}`}>
                <i className="fab fa-twitter"/>
              </span>
          </a>
            :
            ""
          }

          {/*<a href="#" target="_blank">*/}
          {/*        <span className={`icon ${stylesInfluencers.links__icon}`}>*/}
          {/*          <i className="fab fa-telegram-plane"/>*/}
          {/*        </span>*/}
          {/*</a>*/}
          {item.website !== null &&
          <a href={item.website} target="_blank">
                  <span className={`icon ${stylesInfluencers.links__icon}`}>
                    <i className="fal fa-globe"/>
                  </span>
          </a>
          }
        </div>

      </div>
    </div>
  )
}