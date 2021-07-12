import {Layout} from '../../components/page-layouts/OneColumn';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {observer} from "mobx-react";

import {getPosts} from "../../data/query/posts";
import {useRouter} from "next/router";
import utils from "../../lib/util";
import {useStore} from "../../lib/useStore";

import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import {getNews} from "../../data/query/news";
import {NewsList} from "../../components/card-layouts/NewsList";

const homeStore = new HomeStore({isHome : false})
const observableIdeaStore = new ObservableTweetStore({homeStore})
const observableNewsStore = new ObservableTweetStore({homeStore})

const getData = async (q) => {
  const dataItem =await getPosts({
    take : 12,
    skip : 0,
    type : "search",
    socialOrder : observableIdeaStore.currentTab,
    query : q
  })

  const dataNews = await getNews({
    take : 12,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : q
  })

  return {
    ideas : dataItem.data.ideaFeed,
    news : dataNews.data.newsFeed,
  }
}
const voteStore = new VoteStore()

export default observer(function ExploreSearch(props) {
  const router = useRouter();
  let { q } = router.query;
  const data = props
  observableIdeaStore.query = q;
  observableNewsStore.query = q;
  observableIdeaStore.tweets = data.ideas
  observableNewsStore.tweets = data.news

  observableIdeaStore.showMoreButton = (data.ideas.length > 0)
  observableNewsStore.showMoreButton = (data.news.length > 0)

  voteStore.addVotes(data.ideas)
  const store = useStore()
  voteStore.walletAddress = store.wallet.address
  return (
    <Layout extraClass="page_topic"
            meta={utils.createSiteMetadata({page : 'Search',data : {q : observableNewsStore.query}})}>
      <div className={`wrapper`}>
        <div className={`container`}>

          <div className={`main-grid`}>

            {/* main content */}
            <div className={`maincontent`}>

              <NewsList
                grid="1"
                gap="0"
                extraClass="news-list"
                title="News for"
                // titleIcon="newspaper"
                // titleIconColor="yellow-500"
                dataStore={observableNewsStore}
              />
              <ProjectsList
                grid="1"
                gap="0"
                title={`Ideas for `}
                cta="Sorted by"
                detail={true}
                itemType='search'
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

export async function getServerSideProps(context) {
  const {q} = context.query;
  const props = await getData(q)
  return {
    props: props
  }
}