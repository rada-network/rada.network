// Components
import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/headers/HeaderHome';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {CategoryList} from '../../components/card-layouts/CategoryList';

import { observer } from "mobx-react";

//ReactIcons
import {getTopic} from "../../data/query/topic";
import utils from "../../lib/util";
import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import {getNews} from "../../data/query/news";
import {NewsList} from "../../components/card-layouts/NewsList";
import {getPosts} from "../../data/query/posts";
import {ProjectsList} from "../../components/card-layouts/ProjectsList";

const homeStore = new HomeStore({isHome : false})
const voteStore = new VoteStore();
const observableIdeaStore = new ObservableTweetStore({homeStore})

const getData = async () => {
  const post = await getPosts({take : 20, skip: 0, socialOrder: observableIdeaStore.currentTab,type: ""})
  const topic = await getTopic();
  return {
    topic : topic.data.itemTypeCount,
    ideas : post.data.itemFeed
  }
}

export default observer((props) => {
  const data = props
  // const data = props
  // update to store
  if (!data) return <div>loading...</div>
  // init first tweet data to show in homepage
  observableIdeaStore.tweets = data.ideas
  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'Project',data : {}})}>

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

              <ProjectsList
                homeDisplay={4}
                grid="1"
                gap="0"
                itemType={"all"}
                title="Projects from Catalyst"
                // titleIcon="code-branch"
                // titleIconColor="blue-500"
                cta="Sorted by"
                dataStore={observableIdeaStore}
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

export async function getStaticProps() {
  const props = await getData();
  return {
    props,
    revalidate: 900
  }
}