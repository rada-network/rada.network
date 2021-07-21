
import Link from "next/link"
import {uuid} from "@walletconnect/utils";

const InfluencerInfoType = ({word}) => {
  const cWord = word.trim().toLowerCase()
  if (cWord === ""){
    return ""
  }
  return (
    <Link href={`/tags/${cWord}`}>
      <span className={`metadata badge`}>
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
            <div className={`widget-list--item--title`}>
              <span className="text-color-title">{item.name}</span>

              <div className={`widget-links`}>
                {item.twitter !== null ?
                <a href={item.twitter} target="_blank">
                  <span className={`icon`}>
                    <i className="fab fa-twitter"/>
                  </span>
                </a>
                  :
                  ""
                }

                {item.linkedin !== null ?
                <a href={item.linkedin} target="_blank">
                  <span className={`icon`}>
                    <i className="fab fa-linkedin-in"/>
                  </span>
                </a>
                  :
                  ""
                }

                {item.website !== null ?
                <a href={item.website} target="_blank">
                  <span className={`icon`}>
                    <i className="fal fa-globe"/>
                  </span>
                </a>
                  :
                  ""
                }

              </div>

            </div>

            <div className={`metadata-wrapper`}>
              {keywords.map(function (word) {
                return (
                  <InfluencerInfoType key={uuid()} word={word}/>
                )
              })}
            </div>
          </div>

          {item.image ?
            <div className={`widget-media rounded-full ml-4`}>
              <img className={`rounded-full`} src={item.image} alt={item.name}/>
            </div>
            : ""
          }

        </div>

        <div className="flex">
          <div className={`text-color-desc widget-list--item--text`}>
            {item.description}
          </div>
        </div>

      </div>
    </div>
  )
}