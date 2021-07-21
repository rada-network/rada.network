import React, {useCallback, useEffect, useMemo, useState} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../button/tabButton";
import WidgetTitle from "../text/widgetTitle";
import {CardNews, NewsLoader} from "../cards/News";
import {getNews} from "../../data/query/news";
import ContentLoader from "react-content-loader";

const take = 12

export const NewsList = observer(({dataStore, extraClass, grid, gap, title, titleIcon,titleIconColor, cta, query}) => {

  const [loadingButton, setLoadingButton] = useState(false)
  const handleLoadMoreItems = async (e) => {
    //if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)
    dataStore.showMoreButton = false

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
      dataStore.showMoreButton = false
    }
    else{
      dataStore.showMoreButton = true
    }

  }
  return (
    <div className={`section section-news ${extraClass || ''}`}>
      <div className={`section-inner`}>

        <div className={`section-header`}>
          <div className={`section-title`}>

            <WidgetTitle title={title} titleIcon={titleIcon} titleIconColor={titleIconColor}
                         dataStore={dataStore}
            />

            {/* Hieu: Example Dropdown in Section Title */}
            {/*<div className="ml-2 inline-flex justify-center items-center">*/}
            {/*  <DropDown color="white"/>*/}
            {/*</div>*/}

          </div>

          {cta &&
          <div className={`section-cta`}>
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

        <div className={`section-body no-padding`}>
          <div className={`grid gap-0 lg:gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
            {
              dataStore.tweets.map(function(post){
                return (
                  <CardNews key={post.id} news={post}/>
                )
              })

            }
            {loadingButton &&
              [...Array(take)].map((x, i) =>
                <NewsLoader key={i} />
              )
            }
          </div>
        </div>
        {loadingButton || dataStore.showMoreButton ?
          <div className={`section-footer`}>
            {loadingButton
              ? <a className="btn btn-loading">
                <span className={"btn btn__text"}>Loading...</span>
              </a>
              : ""
            }
            {dataStore.showMoreButton ?
              <a onClick={handleLoadMoreItems}
                 className="btn btn-nav">
                <span className="btn__text">Show {take} more</span>
                <span className="btn__caret_down"/>
              </a>
              :  ""
            }
          </div>
          :
          ""
        }

      </div>
    </div>
  )
})