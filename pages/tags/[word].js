import {Layout} from '../../components/page-layouts/Global';
import {Header} from '../../components/headers/Header';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import {observer} from "mobx-react";

import {useRouter} from "next/router";
import utils from "../../lib/util";
import {useStore} from "../../lib/useStore";

import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import {NewsList} from "../../components/card-layouts/NewsList";
import {getTweet} from "../../data/query/postsTweet";
import {getNews} from "../../data/query/news";
import {getPosts} from "../../data/query/posts";

const homeStore = new HomeStore({isHome: false})
const observableTweetStore = new ObservableTweetStore({homeStore})
const observableNewsStore = new ObservableTweetStore({homeStore})
const observableItemStore = new ObservableTweetStore({homeStore})

const getData = async (word) => {
  let newsFeed = await getNews({
    take : 12,
    skip : 0,
    query : word,
    orderBy : {createdAt : "desc"}
  })
  let itemFeed = await getPosts({
    type : "search",
    take : 12,
    skip : 0,
    socialOrder : "latest",
    query : word
  })
  let tweetFeed = await getTweet({
    take : 12,
    skip : 0,
    socialOrder : "latest",
    query : word,
    day : 1
  })
  return {
    newsFeed : newsFeed.data.newsFeed,
    ideaFeed : itemFeed.data.ideaFeed,
    tweetFeed : tweetFeed.data.tweetFeed,
  }
}
const voteStore = new VoteStore()

export default observer(function Explore(props) {
  const router = useRouter();
  let {word} = router.query;
  const data = props

  observableTweetStore.query = word
  observableNewsStore.query = word
  observableItemStore.query = word

  observableTweetStore.tweets = data.tweetFeed
  observableNewsStore.tweets = data.newsFeed
  observableItemStore.tweets = data.ideaFeed
  return (
    <Layout extraClass="page_topic"
            meta={utils.createSiteMetadata({page : 'Tag',data : {word : word}})}
    >
      <div className={`wrapper`}>
        <div className={`container`}>

          <div className={`main-grid`}>

            {/* main content */}
            <div className={`maincontent`}>
              <SocialPostsList
                grid="1"
                gap="4"
                title={"Tweet from " + word}
                titleIcon=""
                titleIconColor=""
                dataStore={observableTweetStore}
              />
              <NewsList
                grid="1"
                gap="4"
                title={"News from "}
                titleIcon=""
                titleIconColor=""
                dataStore={observableNewsStore}
              />
              <ProjectsList
                grid="1"
                gap="4"
                title={"Idea from "}
                cta="Sorted by"
                detail={true}
                itemType={'all'}
                dataStore={observableItemStore}
                voteStore={voteStore}
              />
            </div>

            {/* Sidebar */}
            <Sidebar className={`sidebar`} extraClass="" />

          </div>

        </div>
      </div>

    </Layout>
  )

})

export async function getServerSideProps(context) {
  const {word} = context.query;
  const props = await getData(word)
  return {
    props: props
  }
}