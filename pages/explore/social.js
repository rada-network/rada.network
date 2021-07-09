// Components
import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/headers/HeaderHome';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {CategoryList} from '../../components/card-layouts/CategoryList';

import { observer } from "mobx-react";

//ReactIcons
import {getTopic} from "../../data/query/topic";
import utils from "../../lib/util";
import {HomeStore, ObservableTweetStore} from "../../lib/store";
import {getNews} from "../../data/query/news";
import {NewsList} from "../../components/card-layouts/NewsList";
import {getTweet} from "../../data/query/postsTweet";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";

const homeStore = new HomeStore({isHome : false})

const observableNewsStore = new ObservableTweetStore({homeStore})

const getData = async () => {

  const tweets = await getTweet({take : 20, skip: 0,socialOrder : "latest"})

  const topic = await getTopic();

  return {
    topic : topic.data.itemTypeCount,
    tweets : tweets.data.tweetFeed
  }
}

export default observer((props) => {
  const data = props
  // const data = props
  // update to store
  if (!data) return <div>loading...</div>
  // init first tweet data to show in homepage
  observableNewsStore.tweets = data.tweets
  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'Social',data : {}})}>

      <Header props={{
        title : "Trends hunter for Cardano community",
        itemType : "home",
        description : "Stay updated with the best quality tweets & updates"
      }}/>

      <div className={`wrapper`}>
        <div className={`container`}>

          <div className={`main-grid`}>

            {/* main content */}
            <div className={`maincontent`}>

              <CategoryList
                extraClass="category-list"
                title="Top Topics"
                // titleIcon="album-collection"
                // titleIconColor="gray-400"
                topic={data.topic}
              />

              <SocialPostsList
                title="Social Signal"
                itemType={"tweet"}
                titleIcon=""
                titleIconColor=""
                dataStore={observableNewsStore}
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

export async function getStaticProps() {
  const props = await getData();
  return {
    props,
    revalidate: 900
  }
}