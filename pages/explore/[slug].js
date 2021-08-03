import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import utils from "../../lib/util";
import {Layout} from "../../components/page-layouts/Global";
import {PostsListWrapper} from "../../components/card-layouts/concepts/PostsList";
import Screen from "../../components/Resposive";
import ThemeSwitch from "../../components/ThemeSwitch";
import {Wallet} from "../../components/Wallet";
import {IndexRightBar} from "../index";
import {observer} from "mobx-react";
import {HOME_ITEM_TAKE} from "../../config/paging";
import {getItems} from "../../data/query/getItem";
import {useState} from "preact/hooks";


const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableItemStore = new ObservableTweetStore({homeStore});

const getData = async ({query,type}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query,
    type : type
  })
  return {
    query : query,
    type : type,
    itemFeed : itemFeed.data.itemFeed
  }
}


export default observer((props) => {

  observableItemStore.query = props.query

  observableItemStore.tweets = props.itemFeed
  observableItemStore.type = props.type

  const detailStore = new DetailStore()
  observableItemStore.showDetail = false

  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'Index',data : {}})}>

      <div className={`pane-content`}>

        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper  dataStore={observableItemStore} detailStore={detailStore} voteStore={voteStore} />
        </div>

        {/* secondary content pane */}
        <div className={`pane-content--sec`}>

          <Screen from="lg">
            <div className={`pane-content--sec--top`}>
              <div className="leading-10"></div>
              <div className="flex items-center space-x-2">
                <ThemeSwitch />
                <div className="relative">
                  <Wallet />
                </div>
              </div>
            </div>
          </Screen>
          <IndexRightBar back={"/explore/" + props.type}  dataStore={observableItemStore} detailStore={detailStore} props={props} voteStore={voteStore} />
        </div>
      </div>
    </Layout>
  )
})


export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'news' } },
      { params: { slug: 'social' } },
      { params: { slug: 'media' } },
      { params: { slug: 'projects' } },
      { params: { slug: 'blog' } },
    ],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const query = "ada,cardano"
  const type = context.params.slug
  const props = await getData({query,type});
  return {
    props,
    revalidate: 180
  }
}