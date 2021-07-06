import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/headers/Header';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import useSWR from "swr";
import {observer} from "mobx-react";

import {getPosts} from "../../data/query/posts";
import {getTweet} from "../../data/query/postsTweet";
import {useRouter} from "next/router";
import {getTopic} from "../../data/query/topic";
import utils from "../../lib/util";
import {useStore} from "../../lib/useStore";

import styles from "../../styles/modules/Layout.module.css";


import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import {Widget} from "../../components/widgets/Widget";

const homeStore = new HomeStore({isHome : false})
const observableTweetStore = new ObservableTweetStore({homeStore})

const getData = async (itemType,q) => {

  const topics = await getTopic();

  if (itemType === "tweet") {
    const postTweet = await getTweet({socialOrder : observableTweetStore.currentTab, skip: 0, take: 12})
    return {
      feed : postTweet.data.tweetFeed,
      topic : [
        {
          title : "Tweets",
          type : "tweet",
          description : "Blockchain social signals.."
        }
      ]
    }
  }
  const dataItem =await getPosts({
    type : itemType,
    take : 12,
    skip : 0,
    socialOrder : observableTweetStore.currentTab,
    query : q
  })

  return {
    feed : dataItem.data.itemFeed,
    topic : topics.data.itemTypeCount.filter(function(item){
      return item.itemType === itemType
    })
  }
}
const voteStore = new VoteStore()

export default observer(function Explore(props) {
  const router = useRouter();
  let { slug,q } = router.query;
  const data = props
  const store = useStore()
  const itemType = slug;
  observableTweetStore.query = q;
  let title = itemType !== "search" ? `${utils.topicTransform(itemType)}` : "Search results for "
  observableTweetStore.tweets = data.feed
  if (itemType === "tweet"){
    return (
      <Layout extraClass="page-home"
              meta={utils.createSiteMetadata({page : 'Explore',data : {query : q,itemType : itemType}})}
      >
        <Header props={data.topic[0]}/>

        <div className={`wrapper`}>
          <div className={`container`}>

            <div className={`grid-12cols`}>

              {/* main content */}
              <div className={`maincontent`}>

                <SocialPostsList
                  grid="1"
                  gap="0"
                  title={title}
                  // titleIcon="fire-alt"
                  // titleIconColor="red-500"
                  dataStore={observableTweetStore}
                />

              </div>

              {/* Sidebar */}
              <Sidebar className={`${styles.sidebar}`} extraClass="" />

            </div>

          </div>
        </div>

      </Layout>
    )
  }
  else{
    return (
      <Layout extraClass="page_topic"
              meta={utils.createSiteMetadata({page : 'Explore',data : {query : q,itemType : itemType}})}>

        <Header props={data.topic[0]}/>

        <div className={`wrapper`}>
          <div className={`container`}>

            <div className={`grid-12cols`}>

              {/* main content */}
              <div className={`maincontent`}>

                <ProjectsList
                  grid="1"
                  gap="0"
                  title={title}
                  cta="Sorted by"
                  detail={true}
                  itemType={itemType}
                  dataStore={observableTweetStore}
                  voteStore={voteStore}
                />

              </div>

              {/* Sidebar */}
              <Sidebar className={`${styles.sidebar}`} extraClass="" />

            </div>

          </div>
        </div>

      </Layout>
    )
  }
})

export async function getServerSideProps(context) {
  const {slug,q} = context.query;
  const props = await getData(slug,q)
  return {
    props: props
  }
}