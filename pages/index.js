// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';
import {PromoList} from '../components/card-layouts/PromoList';
import {TopUsersList} from '../components/card-layouts/TopUsersList';
import {CategoryList} from '../components/card-layouts/CategoryList';
import { observer } from "mobx-react"

//ReactIcons
import {getPosts} from "../data/query/posts"
import {getTweet} from "../data/query/postsTweet"
import useSWR from "swr";
import { useStore } from "../lib/useStore"
import {SocialPostsList} from "../components/card-layouts/SocialPostsList";
import {action, autorun, computed, makeObservable, observable} from "mobx";

export class ObservableTweetStore {
  currentTab = "latest";
  tweets = []
  constructor({homeStore}) {
    this.home = homeStore
    makeObservable(this, {
      currentTab: observable,
      addTweet: action,
      tweets: observable,
    });
    autorun(() => this.report);
  }

  get report() {
    if (this.currentTab === "popular"){
      this.tweetsLatest = []
    }
    else if (this.currentTab === "latest"){
      this.tweetsPopular = []
    }
  }
  addTweet(tws) {
    if (tws.length > 0){
      for (let tw of tws){
        if (this.tweets.filter(el => {
          return el.id === tw.id
        }).length === 0){
          this.tweets.push(tw)
        }
      }

    }
  }
}

export class HomeStore {
  homeDisplay = 0
  constructor() {
    makeObservable(this, {
      homeDisplay: observable,
    });
    autorun(() => {});
  }
}

const homeStore = new HomeStore()

const observableTweetStore = new ObservableTweetStore({homeStore});
const observableItemStore = new ObservableTweetStore({homeStore})
const observableNftStore = new ObservableTweetStore({homeStore})
const observableDappStore = new ObservableTweetStore({homeStore})

const getData = async (socialOrder) => {
  if (typeof socialOrder == "undefined"){
    socialOrder = "latest"
  }
  const posts = await getPosts({type : "",skip : 0,take : 12, socialOrder})

  const postsNFT = await getPosts({type : "nft",skip : 0,take : 6,orderBy : {createdAt: "desc"}})

  const postsDapp = await getPosts({type : "dapp",skip : 0,take : 6,orderBy : {createdAt: "desc"}})

  const postsTweet = await getTweet({socialOrder,skip : 0,take : 12});

  return {
    posts: posts.data.itemFeed,
    postsNFT: postsNFT.data.itemFeed,
    postsDapp: postsDapp.data.itemFeed,
    postsTweet: postsTweet.data.tweetFeed,
  }
}

export default observer(function Home(props) {
  const store = useStore()

  const {data,error} = useSWR(["latest"], getData, {initialData: props, revalidateOnMount: !store.inited})
  // const data = props
  // update to store
  if (error){
    return <p>network error</p>
  }
  if (!data) return <div>loading...</div>
  if (store) {
    store.projects.update(data.posts)
    store.projects.update(data.postsNFT)
    store.projects.update(data.postsDapp)
  }
  // init first tweet data to show in homepage
  observableTweetStore.tweets = data.postsTweet
  observableItemStore.tweets = data.posts
  observableNftStore.tweets = data.postsNFT
  observableDappStore.tweets = data.postsDapp
  console.log(homeStore.homeDisplay)
  return (
    <Layout extraClass="page-home" meta={"DHunt.io - Top BlockChain DApps"}>
      <Header/>
      {/* <ProjectsList
        grid="2"
        gap="4"
        title="Popular Projects"
        titleIcon=""
        titleIconColor="red-500"
        posts={data.posts}
      /> */}
      <CategoryList
        extraClass="category-list"
        grid="5"
        gap="5"
        title="Top Topics"
        titleIcon=""
        titleIconColor=""
        cta="View all"
        itemType={"all"}
      />
      {homeStore.homeDisplay === 1 || homeStore.homeDisplay === 0 ?
        <SocialPostsList
          grid="1"
          gap="2"
          title="Social Signal"
          itemType={"tweet"}
          titleIcon="fire-alt"
          titleIconColor="red-500"
          dataStore={observableTweetStore}
        />  : ""
      }
      {homeStore.homeDisplay === 2 || homeStore.homeDisplay === 0 ?
        <ProjectsList
          homeDisplay={2}
          grid="2"
          gap="4"
          itemType={"nft"}
          title="NFTs that you cannot missed"
          titleIcon="icons"
          titleIconColor="purple-500"
          // posts={data.postsNFT}
          dataStore={observableNftStore}
        /> : ""
      }

      {homeStore.homeDisplay === 3 || homeStore.homeDisplay === 0 ?
        <ProjectsList
          homeDisplay={3}
          grid="2"
          gap="4"
          itemType={"dapp"}
          title="Most Active DApps"
          titleIcon="cube"
          titleIconColor="pink-500"
          // posts={data.postsDapp}
          dataStore={observableDappStore}
        /> : ""
      }

      {/* <TopUsersList
        grid="5"
        gap="5"
        titleIcon=""
        titleIconColor=""
      /> */}
      {/* <ProjectsList
        grid="2"
        gap="4"
        itemType={"today"}
        cta={"View All"}
        title="New Projects"
        detail={true}
        posts={data.posts}
      /> */}
      {/* <PromoList
        extraClass="promo-list"
        grid="3"
        gap="5"
      /> */}
      {homeStore.homeDisplay === 4 || homeStore.homeDisplay === 0 ?
        <ProjectsList
          homeDisplay={4}
          grid="2"
          gap="4"
          itemType={"all"}
          title="Latest Ideas"
          titleIcon="code-branch"
          titleIconColor="blue-500"
          cta="Sorted by"
          dataStore={observableItemStore}
        /> : ""
      }

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