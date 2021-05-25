import React from "react";
import Link from "next/link";
import {RiHeartFill, RiTwitterFill} from "react-icons/ri";

export const TweetCard = ({post, favoriteCount, retweetCount, hashtags,
                            fullText, createdAt, media, tweetUser}) => {
  let twitterName1
  let accountName
  let avatarImg
  let bannerImg

  if (tweetUser === undefined) console.log("tweetUser is undefined")
  else{
    twitterName1 = tweetUser.name
    accountName = tweetUser.screen_name
    avatarImg = tweetUser.profile_image_url_https
    bannerImg = tweetUser.profile_banner_url
  }

  const link = `https://twitter.com/${accountName}/status/${post.id}`

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
        </a>
      ))
    )
  }

  return(
    <a href={link} target={"_blank"}>
      <div className="flex-col items-center content-center card group card-tweet">

        <div className="card-header">

          <div className="user-info-wrapper flex">
            <div className="avatar">
              <img className="avatar-img" src={avatarImg} />
            </div>
            <div className="user-info flex flex-col ml-3 justify-center">
              <span className="text-sm font-medium">{twitterName1}</span>
              <span className="text-xs text-gray-900 text-opacity-50">@{accountName}</span>
            </div>
          </div>

          <span className="icon icon-twitter">
          <i className="fab fa-twitter text-base text-blue-400"></i>
        </span>

        </div>

        <div className="card-body">

          {/* <div className="card-body-header">

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

        </div> */}

          <div className="card-body-main">
            <div className="card-text" dangerouslySetInnerHTML={{ __html: fullText}}></div>
          </div>
          <div className="card-body-main">
            {media
              ? <img src={media[0].media_url ? media[0].media_url : ""} style={{height: 141}} alt=""/>
              : ""
            }
          </div>

        </div>

      <div className="card-footer">

        <div className="metadata-wrapper metadata-wrapper_nodivide tweet-metadata-wrapper">
          <div  className="metadata tweet-comment_count">
            <span className="mr-1 icon text-sm">
              <i className="fal fa-retweet"></i>
            </span>
            <span title={"retweet count"}>{retweetCount}</span>
          </div>
          <div className="metadata tweet-comment_count">
            <span className="mr-1 icon text-sm">
              <i className="fal fa-heart"></i>
            </span>
            <span title={"likes"}>{favoriteCount}</span>
          </div>
        </div>

        <div className="metadata-wrapper tweet-metadata-wrapper">

          <div className="metadata tweet-metadata_date">
              <span className="metadata-value">{createdAt.split(('T'))[0]}</span>
            </div>
        </div>
      </div>

      </div>
    </a>
  )
}