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

// Widgets Comp
import { Widget } from "../components/widgets/Widget";

//ReactIcons
import {getPosts} from "../data/query/posts"
import {getTweet} from "../data/query/postsTweet"
import useSWR from "swr";
import { useStore } from "../lib/useStore"
import {SocialPostsList} from "../components/card-layouts/SocialPostsList";
import {action, autorun, computed, makeObservable, observable} from "mobx";
import {getTopic} from "../data/query/topic";
import {Vote} from "../components/vote/Vote";
import {getIsVotes} from "../data/query/isVoted";
import vote from "./api/item/[id]/vote";
import utils from "../lib/util";

export class ObservableTweetStore {
  currentTab = "latest";
  tweets = []
  query = ""
  constructor({homeStore}) {
    this.home = homeStore
    makeObservable(this, {
      currentTab: observable,
      query: observable,
      addTweet: action,
      tweets: observable,
    });
    autorun(() => this.report);
  }

  get report() {

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
  isHome = false
  constructor({isHome}) {
    this.isHome = isHome
    makeObservable(this, {
      homeDisplay: observable,
    });
    autorun(() => {});
  }
}

export class VoteStore {
  votes = []
  walletAddress = ''
  constructor() {
    makeObservable(this, {
      votes: observable,
      walletAddress : observable,
      addVotes: action,
      updateVote: action,
      getIds: action,
    });
    autorun(() => {});
  }
  addVotes(votes) {
    if (votes.length > 0){
      for (let vote of votes){
        if (this.votes.filter(el => {
          return el.id === vote.id
        }).length === 0){
          this.votes.push({
            id : vote.id,
            totalVote: vote.totalVote,
            isVoted : false
          })
        }
      }
    }
  }
  getIds () {
    return this.votes.map(a => a.id)
  }
  updateVote(vote) {
    let flag = false
    this.votes.forEach((el,index)=>{
      if (el.id === vote.id){
        this.votes[index] = {
          id : vote.id,
          isVoted : typeof vote.isVoted == "undefined" ?  el.isVoted : vote.isVoted,
          totalVote : typeof vote.totalVote == "undefined" ?  el.totalVote : vote.totalVote,
        }
        flag = true;
      }
    })
    if (!flag){
      this.votes.push({
        id : vote.id,
        isVoted : typeof vote.isVoted == "undefined" ?  false : vote.isVoted,
        totalVote : typeof vote.totalVote == "undefined" ?  0 : vote.totalVote,
      })
    }
  }
}
const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableTweetStore = new ObservableTweetStore({homeStore});
const observableItemStore = new ObservableTweetStore({homeStore})
const observableNftStore = new ObservableTweetStore({homeStore})
const observableDappStore = new ObservableTweetStore({homeStore})

const getData = async () => {

  const posts = await getPosts({type : "",skip : 0,take : 12, socialOrder : observableItemStore.currentTab})

  const postsNFT = await getPosts({type : "nft",skip : 0,take : 6,socialOrder : observableNftStore.currentTab})

  const postsDapp = await getPosts({type : "dapp",skip : 0,take : 6,socialOrder : observableDappStore.currentTab})

  const postsTweet = await getTweet({socialOrder: observableTweetStore.currentTab,skip : 0,take : 12});

  const topic = await getTopic();

  return {
    posts: posts.data.itemFeed,
    postsNFT: postsNFT.data.itemFeed,
    postsDapp: postsDapp.data.itemFeed,
    postsTweet: postsTweet.data.tweetFeed,
    topic : topic.data.itemTypeCount
  }
}

export default observer((props) => {
  const store = useStore()
  const data = props
  voteStore.walletAddress = store.wallet.address
  // const data = props
  // update to store
  if (!data) return <div>loading...</div>
  // init first tweet data to show in homepage
  observableTweetStore.tweets = data.postsTweet
  observableItemStore.tweets = data.posts
  observableNftStore.tweets = data.postsNFT
  observableDappStore.tweets = data.postsDapp
  voteStore.walletAddress = store.wallet.address
  voteStore.addVotes(data.posts)
  voteStore.addVotes(data.postsNFT)
  voteStore.addVotes(data.postsDapp)
  utils.initVoteStore(voteStore)
  return (
    <Layout extraClass="page-home" meta={"DHunt.io - Top BlockChain DApps"}>

      <Header props={{
        title : "Trends hunter for Cardano community",
        itemType : "home",
        description : "Stay updated with the best quality news & updates"
      }}/>


      <div className="wrapper">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* mainbody */}
            <div className="mainbody lg:col-span-9">
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
                title="Top Topics"
                titleIcon=""
                titleIconColor=""
                topic={data.topic}
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

              {/* {homeStore.homeDisplay === 2 || homeStore.homeDisplay === 0 ?
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
          voteStore={voteStore}
                /> : ""
              } */}

              {/* {homeStore.homeDisplay === 3 || homeStore.homeDisplay === 0 ?
                <ProjectsList
                  homeDisplay={3}
                  grid="2"
                  gap="4"
                  itemType={"dapp"}
                  title="Most active DApps"
                  titleIcon="cube"
                  titleIconColor="pink-500"
                  // posts={data.postsDapp}
                  dataStore={observableDappStore}
          voteStore={voteStore}
                /> : ""
              } */}

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
                  title="Projects from Catalyst"
                  titleIcon="code-branch"
                  titleIconColor="blue-500"
                  cta="Sorted by"
                  dataStore={observableItemStore}
          voteStore={voteStore}
                /> : ""
              }
            </div>

            {/* Sidebar */}
            <div className="sidebar lg:col-span-3">
              <Widget
                title="Pricing"
                text="Lorem Ipsum Dolor sit Amet"
              />
            </div>

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