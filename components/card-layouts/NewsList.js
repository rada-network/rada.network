import React, {useState} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../button/tabButton";
import WidgetTitle from "../text/widgetTitle";
import {CardNews} from "../cards/News";
import {getPosts} from "../../data/query/posts";
import utils from "../../lib/util";
import {getNews} from "../../data/query/news";

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
          <h2>{dataStore.query} was not found in any documents.</h2>
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
    <div className={`section ${extraClass || ''}`} id={"#top"}>
      <div className="section-inner">

        <div className="section-header">
          <div className="section-title">

            <WidgetTitle title={title} titleIcon={titleIcon} titleIconColor={titleIconColor}
                         dataStore={dataStore}
            />

            {/* Hieu: Example Dropdown in Section Title */}
            {/*<div className="ml-2 inline-flex justify-center items-center">*/}
            {/*  <DropDown color="white"/>*/}
            {/*</div>*/}

          </div>

          {cta &&
          <div className="section-cta">
            {cta === "View All" ?
              <button className="btn">
                <span className="btn-text">
                  <Link href={`/news/${query}`}>
                    {cta}
                  </Link>
                </span>
                <span className="icon"><IoChevronForwardSharp/></span>
              </button>
              :
              <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs">
                <TabButton handle={handleLoadMoreItems} key={"popular"} nValue={"popular"} value={"Popular"} dataStore={dataStore} />
                <TabButton handle={handleLoadMoreItems} key={"latest"} nValue={"latest"} value={"Latest"}dataStore={dataStore} />
              </div>
            }
          </div>
          }
        </div>

        <div className="section-body">
          <div className={`grid gap-0 lg:gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
            {
              showPosts(posts)
            }
          </div>
        </div>

        <div className="section-footer">
          {loadingButton
            ? <a className="btn btn-loading">
              <span className={"btn btn-text"}>Loading...</span>
            </a>
            : ""
          }
          {showMoreButton ?
            <a onClick={handleLoadMoreItems}
               className="btn btn-showmore">
              <span className="btn-text">Show {take} more</span>
            </a>
            :  ""
          }
        </div>
      </div>
    </div>
  )
})