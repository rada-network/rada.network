// Components
import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/headers/HeaderHome';
import {Sidebar} from '../../components/sidebar/SidebarNews';
import {CategoryList} from '../../components/card-layouts/CategoryList';

import { observer } from "mobx-react";

//ReactIcons
import {getTopic} from "../../data/query/topic";
import utils from "../../lib/util";
import {HomeStore, ObservableTweetStore} from "../../lib/store";
import {getNews} from "../../data/query/news";
import {NewsList} from "../../components/card-layouts/NewsList";

const homeStore = new HomeStore({isHome : true})

const observableNewsStore = new ObservableTweetStore({homeStore})

const getData = async () => {

  const news = await getNews({take : 20, skip: 0, orderBy: {createdAt : "desc"}})

  const topic = await getTopic();

  return {
    topic : topic.data.itemTypeCount,
    news : news.data.newsFeed
  }
}

export default observer((props) => {
  const data = props
  // const data = props
  // update to store
  if (!data) return <div>loading...</div>
  // init first tweet data to show in homepage
  observableNewsStore.tweets = data.news
  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'News',data : {}})}>

      <Header props={{
        title : "Trends hunter for Cardano community",
        itemType : "home",
        description : "Stay updated with the best quality news & updates"
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

              <NewsList
                grid="1"
                gap="0"
                extraClass="news-list"
                title="Cardano's News"
                // titleIcon="newspaper"
                // titleIconColor="yellow-500"
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