import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/Header';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import useSWR from "swr";
import {observer} from "mobx-react";

import {getPosts} from "../../data/query/posts";
import {getTweet} from "../../data/query/postsTweet";
import {useRouter} from "next/router";
import {HomeStore, ObservableTweetStore} from "../index";
import {getTopic} from "../../data/query/topic";
import utils from "../../lib/util";

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

export default observer(function Explore(props) {
  const router = useRouter();
  let { slug,q } = router.query;
  const data = props
  console.log(props)
  const itemType = slug;
  observableTweetStore.query = q;
  let title = itemType !== "search" ? `${utils.topicTransform(itemType)}` : "Search results for "
  observableTweetStore.tweets = data.feed
  if (itemType === "tweet"){
    return (
      <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
        <Header props={data.topic[0]}/>
        <SocialPostsList
          grid="1"
          gap="4"
          title={title}
          titleIcon="fire-alt"
          titleIconColor="red-500"
          dataStore={observableTweetStore}
        />
      </Layout>
    )
  }
  else{
    return (
      <Layout extraClass="page_topic" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
        <Header props={data.topic[0]}/>
        <ProjectsList
          grid="2"
          gap="4"
          title={title}
          cta="Sorted by"
          detail={true}
          itemType={itemType}
          dataStore={observableTweetStore}
        />
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