import React from "react";
import Link from "next/link";
import {RiHeartFill, RiTwitterFill} from "react-icons/ri";

import utils from "../../lib/util";
import styles from '../../styles/modules/Card.socialpost.module.css'

export const SocialPost = ({post, favoriteCount, retweetCount, hashtags,
                            fullText, createdAt, media, tweetUser}) => {
  let twitterName
  let accountName
  let avatarImg
  let bannerImg

  if (tweetUser === undefined) console.log("tweetUser is undefined")
  else{
    twitterName = tweetUser.name
    accountName = tweetUser.screen_name
    avatarImg = tweetUser.profile_image_url_https
    bannerImg = tweetUser.profile_banner_url
  }

  const link = `https://twitter.com/${accountName}/status/${post.id}`
  const tweetDate = utils.timeDifference(new Date(), new Date(createdAt))
  const titleTime = utils.titleTime(createdAt)

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

  return (
    <Link href={link} target={"_blank"}>
      <div className={`card card-social ${styles.card} cursor-pointer`}>

        <div className={`card-header ${styles.card_header}`}>

          <div className="user-info-wrapper flex">
            <div className="avatar">
              <img className="avatar-img" src={avatarImg} />
            </div>
            <div className="flex flex-col ml-3">
              <div className={`metadata-wrapper ${styles.tweet_metadata_wrapper}`}>
                <a href={link} target={"_blank"} className={`metadata ${styles.tweet_metadata_name} ${styles.tweet_metadata}`}>
                  <span className="title">
                    {twitterName}
                  </span>
                </a>
              </div>
              <div className={`metadata-wrapper ${styles.tweet_metadata_wrapper}`}>
                <div className={`metadata ${styles.tweet_metadata} ${styles.tweet_metadata_username}`}>
                  <span className="metadata-value">@{accountName}</span>
                </div>
                <div className={`metadata tweet_metadata_date ${styles.tweet_metadata}`}>
                  <span className="metadata-value" title={`${titleTime}`}>{tweetDate}</span>
                </div>
              </div>
            </div>
          </div>

          <span className={`icon ${styles.icon_twitter}`}>
            <i className={`fab fa-twitter`}></i>
          </span>

        </div>

        <div className={`card-body ${styles.card_body}`}>

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
          <div className={`card-text ${styles.card_text}`} dangerouslySetInnerHTML={{ __html: fullText}}></div>
          {/* <div className={`card-media ${styles.card_media}`} style={{background: media ? media[0].media_url : "" }}> */}

          {media && 
            <div className={`card-media ${styles.card_media}`}
                style={{backgroundImage: media
                    ? media[0].media_url_https
                      ? "url(" + media[0].media_url_https + ")"
                      : ""
                    : "",
                }}>

            {media
              ? <img src={media[0].media_url_https ? media[0].media_url_https : ""} className={"project-icon_img w-full h-full rounded object-cover"} alt=""/>
              : ""
            }
          </div> }

        </div>

      </div>

      <div className={`card-footer ${styles.card_footer}`}>

        <div className={`metadata-wrapper metadata-wrapper_nodivide ${styles.tweet_metadata_wrapper}`}>
          <div className={`metadata ${styles.tweet_metadata} ${styles.tweet_metadata_commentcount}`}>
            <span className="icon mr-1 text-base opacity-40">
              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
            </span>
            <span title={"likes"}>{utils.numberFormat(post.replyCount)}</span>
          </div>
          <div className={`metadata ml-2 ${styles.tweet_metadata} ${styles.tweet_metadata_retweetcount}`}>
            <span className="icon mr-1 text-base opacity-40">
              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
            </span>
            <span title={"retweet count"}>{utils.numberFormat(retweetCount)}</span>
          </div>
          <div className={`metadata ml-2 ${styles.tweet_metadata} ${styles.tweet_metadata_favoritecount}`}>
            <span className="icon mr-1 text-base opacity-40">
              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
            </span>
            <span title={"likes"}>{utils.numberFormat(favoriteCount)}</span>
          </div>
        </div>


      </div>

      </div>
    </Link>
  )
}