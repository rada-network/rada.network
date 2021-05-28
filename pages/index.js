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
  homeDisplay = 0
  currentTab = "latest";
  tweets = []
  constructor() {
    makeObservable(this, {
      currentTab: observable,
      addTweet: action,
      tweets: observable,
      homeDisplay: observable,
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
        // if (this.currentTab === "popular"){
        //   if (this.tweetsPopular.filter(el => {
        //     return el.id === tw.id
        //   }).length === 0){
        //     this.tweetsPopular.push(tw)
        //   }
        //
        // }
        // else if (this.currentTab === "latest"){
        //   if (this.tweetsLatest.filter(el => {
        //     return el.id === tw.id
        //   }).length === 0){
        //     this.tweetsLatest.push(tw)
        //   }
        // }
      }

    }
  }
}

const observableTweetStore = new ObservableTweetStore();

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
  observableTweetStore.tweets = data.postsTweet
  return (
    <Layout extraClass="page-home" meta={"dhunt.io"}>
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
      {observableTweetStore.homeDisplay === 1 || observableTweetStore.homeDisplay === 0 ?
        <SocialPostsList
        grid="1"
        gap="2"
        title="Social Signal"
        itemType={"tweet"}
        titleIcon="fire-alt"
        titleIconColor="red-500"
        dataStore={observableTweetStore}
        initPosts={{'latest' : data.postsTweet,"popular" : []}}
      />  : ""
      }
      {observableTweetStore.homeDisplay === 2 || observableTweetStore.homeDisplay === 0 ?
        <ProjectsList
          grid="2"
          gap="4"
          itemType={"nft"}
          title="NFTs that you cannot missed"
          titleIcon="icons"
          titleIconColor="purple-500"
          posts={data.postsNFT}
        /> : ""
      }

      {observableTweetStore.homeDisplay === 3 || observableTweetStore.homeDisplay === 0 ?
        <ProjectsList
          grid="2"
          gap="4"
          itemType={"dapp"}
          title="Most Active DApps"
          titleIcon="cube"
          titleIconColor="pink-500"
          posts={data.postsDapp}
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
      {observableTweetStore.homeDisplay === 4 || observableTweetStore.homeDisplay === 0 ?
        <ProjectsList
          grid="2"
          gap="4"
          itemType={"all"}
          title="Latest Ideas"
          titleIcon="code-branch"
          titleIconColor="blue-500"
          cta="Sorted by"
          posts={data.posts}
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