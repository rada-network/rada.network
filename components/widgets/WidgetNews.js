import Link from "next/link"

import {RiExternalLinkLine} from "react-icons/ri";
import {HomeStore, ObservableTweetStore} from "../../lib/store";
import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {getInfluencers} from "../../data/query/getSuggestUser";
import {getNews, getNewsRelated} from "../../data/query/news";
import utils from "../../lib/util";
import {useRouter} from "next/router";
import ShowSources from "../news-sources/ShowSources";
import ReadingTime from "../news-sources/ReadingTime";
const homeStore = new HomeStore({isHome :false})
const newsStore = new ObservableTweetStore(homeStore)
const WidgetNewsList = observer(function({store}){
  const newsList = store.tweets
  return (
    <div className={`widget-body-p0`}>

      <div className={`widget-list`}>

        {/* Post Item */}
        {newsList.map(function(item){
          const postDate = utils.timeDifference(new Date(), new Date(item.createdAt))
          return (
            <Link key={item.id} href={`/news/` + item.id}>
              <div className={`group widget-list--item widget-list--link`}>

                <div className={`widget-list--item--title`}>
                  <a href="#" target="_blank">
                    <span className="text-color-title">{item.title}</span>
                  </a>
                </div>

                <div className="overflow-hidden">
                  {item.thumbnailUri !== null && item.thumbnailUri ?
                    <div className={`widget-list--item--media`}>
                      <img src={item.thumbnailUri} alt={item.title} />
                    </div>
                    : ""
                  }

                  <div className={`text-color-desc widget-list--item--text`}>
                    {item.description}
                  </div>
                </div>

                <div className="metadata-wrapper mt-2">
                  {/*<a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp">*/}
                  {/*  <span className="metadata-value">dapp</span>*/}
                  {/*</a>*/}
                  {/*<a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">*/}
                  {/*  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>*/}
                  {/*</a>*/}
                  <ShowSources source={item.websiteUri}/>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title={item.createdAt}>{postDate}</span>
                  </div>
                  <ReadingTime content={item.content}/>
                </div>

              </div>
            </Link>
          )
        })}
        {/* Post Item */}
      </div>

    </div>
  )
})

export const WidgetNews = observer(({title, widgetIcon, widgetIconColor,context}) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      newsStore.tweets = []
    }

    router.events.on('routeChangeComplete', handleRouteChangeError)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeError)
    }
  }, [])

  const [loadingButton,setLoadingButton] = useState(false)
  const take = 4
  useEffect(() => {
    setLoadingButton(true)
    newsStore.showMoreButton = false
    getNewsRelated({take, skip : 0, id: context.id }).then(function(res){
      newsStore.addTweet(res.data.newsRelated)
      setLoadingButton(false)
      newsStore.showMoreButton = true
    })
  },[])
  const handleLoadMoreItems = async (e) => {
    //if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)
    newsStore.showMoreButton = false

    const newsData = await getNewsRelated({
      skip: newsStore.tweets.length,
      take: take,
      id : context.id
    });

    if (newsData.loading) return false

    setLoadingButton(false)
    newsStore.addTweet(newsData.data.newsRelated)

    if (newsData.data.newsRelated.length < take){
      newsStore.showMoreButton = false
    }
    else{
      newsStore.showMoreButton = true
    }
  }

  return (

    <div className={`widget widget-posts`}>

      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} widget-icon-fa`}/>
        </span>
      </div> }

      <WidgetNewsList store={newsStore}/>

      {newsStore.showMoreButton?
        <div className={`widget-footer`}>
          <a className="btn btn-nav block" onClick={(e)=> handleLoadMoreItems(e)}>
            <span className="btn__text">Show 4 more</span>
            <span className="btn__caret_down"/>
          </a>
        </div>
        : ""
      }

      {loadingButton?
        <div className={`widget-footer`}>
          <a className="btn btn-nav block">
            <span className="btn__text">Loading</span>
          </a>
        </div>
        : ""
      }


    </div>

  );
});