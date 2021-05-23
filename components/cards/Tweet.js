import React from "react";
import Link from "next/link";
import {RiHeartFill, RiTwitterFill} from "react-icons/ri";

export const TweetCard = ({post, favoriteCount, retweetCount, source, hashtags, fullText, createdAt}) => {
  const link = `https://twitter.com/${post.source.user_id_str}/status/${post.id}`
  const showPlatform = (hashtags) => {
    // return unique hashtag
    const uniqueHashtag = [...new Set(hashtags.map(hashtag => hashtag.text))]
    console.log("uniqueHashtag: ", uniqueHashtag)
    return (
      uniqueHashtag.map((hashtag) => (
        <a href={`https://twitter.com/hashtag/${hashtag}`} className={`metadata project-metadata_platform project-metadata_platform_${
          hashtag || ""} `}
        >
          {/*<span className="icon">*/}
          {/*  <i className={`cf cf-${hashtag.slice(0, 3).toLowerCase()} || "btc"`}></i>*/}
          {/*    </span>*/}
          <span className="metadata-value">#{hashtag}</span>
          <div className="metadata-divider"></div>
        </a>
      ))
    )
  }

  return(
    <div className="flex-col items-center content-center card group card-tweet">

      <div className="card-body">

        <div className="card-body-header">

          <div className="metadata-wrapper project-metadata-wrapper">

            {/* {showPlatform(hashtags)} */}

            <div className="metadata project-metadata_date">
              <span className="metadata-value">{createdAt.split(('T'))[0]}</span>
            </div>
          </div>

          <div className="card-title">
            <Link href={link}
                  target={"_blank"}>
              <a className="card-link">{
                fullText.length < 70
                  ? fullText
                  : fullText.slice(0, 40) + "..."}
              </a>

            </Link>
          </div>

        </div>

        <div className="card-body-main">
          <div className="card-text" dangerouslySetInnerHTML={{ __html: fullText.slice(0, 50)}}></div>
        </div>

      </div>

      <div className="card-footer">
        <a href={link} className="metadata project-comment_count">
              <span className="mr-1 icon text-base">
                <RiTwitterFill/>
              </span>
          {/*favorite count*/}
          <span title={"retweet count"}>{retweetCount}</span>
        </a>

        <div className="metadata-wrapper project-metadata-wrapper">
          <a href={link} className="metadata project-comment_count">
              <span className="mr-1 icon text-base">
                <RiHeartFill/>
              </span>
            {/*favorite count*/}
            <span title={"likes"}>{favoriteCount}</span>
          </a>
        </div>
      </div>
    </div>
  )
}