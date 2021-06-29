import React, {useState} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../button/tabButton";
import WidgetTitle from "../text/widgetTitle";
import {CardNews, NewsLoader} from "../cards/news";
import {getNews} from "../../data/query/news";
import ContentLoader from "react-content-loader";

import styles from "../../styles/modules/Layout.module.css";

const take = 12

export const NewsList = observer(({
                                        dataStore,
                                        extraClass,
                                        grid,
                                        gap,
                                        title,
                                        titleIcon,
                                        titleIconColor,
                                        cta,
                                        query,
                                      }) => {

  let posts = dataStore.tweets
  const [loadingButton, setLoadingButton] = useState(false)
  let startShowMoreButton = true;
  if (dataStore.tweets.length < take && !dataStore.home.isHome){
    startShowMoreButton = false
  }
  const [showMoreButton, setShowMoreButton] = useState(startShowMoreButton)
  const handleLoadMoreItems = async (e) => {
    //if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)
    setShowMoreButton(false)

    const newsData = await getNews({
      skip: dataStore.tweets.length,
      take: take,
      query : dataStore.query,
      orderBy : {createdAt : "desc"}
    });

    if (newsData.loading) return false

    setLoadingButton(false)
    dataStore.addTweet(newsData.data.newsFeed)

    if (newsData.data.newsFeed.length < take){
      setShowMoreButton(false)
    }
    else{
      setShowMoreButton(true)
    }

  }
  const showPosts = (posts) => {
    if (!loadingButton && posts.length === 0){
      return (
        <>
          <div className="empty-state">
            <p><strong className="text-bold">{dataStore.query}</strong> was not found in any documents.</p>
          </div>
        </>
      )
    }
    return (
      posts.map((post) => (
        <CardNews
          key={post.id}
          news={post}
        />
      )))
  }


  return (
    <div className={`${styles.section} ${extraClass || ''}`}>
      <div className={`${styles.section_inner}`}>

        <div className={`${styles.section_header}`}>
          <div className={`${styles.section_title}`}>

            <WidgetTitle title={title} titleIcon={titleIcon} titleIconColor={titleIconColor}
                         dataStore={dataStore}
            />

            {/* Hieu: Example Dropdown in Section Title */}
            {/*<div className="ml-2 inline-flex justify-center items-center">*/}
            {/*  <DropDown color="white"/>*/}
            {/*</div>*/}

          </div>

          {cta &&
          <div className={`${styles.section_cta}`}>
            {cta === "View All" ?
              <button className="btn">
                <span className="btn__text">
                  <Link href={`/news/${query}`}>
                    {cta}
                  </Link>
                </span>
                <span className="icon"><IoChevronForwardSharp/></span>
              </button>
              :
              <div className="btn-group btn-group-filter">
                <TabButton handle={handleLoadMoreItems} key={"popular"} nValue={"popular"} value={"Popular"} dataStore={dataStore} />
                <TabButton handle={handleLoadMoreItems} key={"latest"} nValue={"latest"} value={"Latest"} dataStore={dataStore} />
              </div>
            }
          </div>
          }
        </div>

        <div className={`${styles.section_body} ${styles.no_padding}`}>
          <div className={`grid gap-0 lg:gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
            {
              showPosts(posts)
            }
            {loadingButton &&
              [...Array(take)].map((x, i) =>
                <NewsLoader key={i} />
              )
            }
          </div>
        </div>

        <div className={`${styles.section_footer}`}>
          {loadingButton
            ? <a className="btn btn-loading">
              <span className={"btn btn__text"}>Loading...</span>
            </a>
            : ""
          }
          {showMoreButton ?
            <a onClick={handleLoadMoreItems}
               className="btn btn-nav">
              <span className="btn__text">Show {take} more</span>
              <span className="btn__caret_down"/>
            </a>
            :  ""
          }
        </div>
      </div>
    </div>
  )
})