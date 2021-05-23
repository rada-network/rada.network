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
            <a
              href={`/explore/dapp`}
              className={`metadata project-metadata_type project-metadata_type_${
                "dapp" || ""
              } `}
            >
              <span className="metadata-value">dapp</span>
            </a>

            {showPlatform(hashtags)}
            {/*<div className="metadata-divider"></div>*/}

            <div className="metadata project-metadata_date">
              <span className="metadata-value">{createdAt.split(('T'))[0]}</span>
            </div>
            <div className="metadata-divider"></div>
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
          <div className="card-media project-icon">
            <Link href={link}>
              <img className="card-img project-icon_img"
                   src={"data:image/png;base64,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"}/>
            </Link>
          </div>
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