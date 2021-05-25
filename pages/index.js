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
import {IoChevronForwardSharp} from "react-icons/io5";
import getClient from "../data/client";
import postQuery from "../data/query/posts"
import tweetQuery from "../data/query/postsTweet"
import useSWR from "swr";
import { useStore } from "../lib/useStore"
import {SocialPostsList} from "../components/card-layouts/SocialPostsList";

const getData = async (socialOrder) => {
  const client = getClient()

  const posts = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 12, itemType: "", orderBy: {createdAt: "desc"}}
  })

  const postsNFT = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: "nft"},
  })

  const postsDapp = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: "dapp"}
  })

  const postsTweet = await client.query({
    query: tweetQuery,
    variables: {skip: 0, take: 12, day:0, orderBy: socialOrder == 'popular' ? {favoriteCount: "desc"} : {createdAt: "asc"}}
  })

  return {
    posts: posts.data.itemFeed,
    postsNFT: postsNFT.data.itemFeed,
    postsDapp: postsDapp.data.itemFeed,
    postsTweet: postsTweet.data.tweetFeed,
  }
}

export default observer(function Home(props) {
  const store = useStore()
  const getKey = () => {
    return [store?.state.socialOrder]
  }
  
  const {data} = useSWR(getKey, getData, {initialData: props, revalidateOnMount: !store.inited})
  // const data = props
  // update to store
  if (store) {
    store.projects.update(data.posts)
    store.projects.update(data.postsNFT)
    store.projects.update(data.postsDapp)
  }
  // console.log("data.postsTweet: ", data.postsTweet)
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
      <SocialPostsList
        grid="1"
        gap="2"
        title="Social Signal"
        itemType={"tweet"}
        titleIcon="fire-alt"
        titleIconColor="red-500"
        posts={data.postsTweet}
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"nft"}
        title="NFTs that you cannot missed"
        titleIcon="icons"
        titleIconColor="purple-500"
        posts={data.postsNFT}
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"dapp"}
        title="Most Active DApps"
        titleIcon="cube"
        titleIconColor="pink-500"
        posts={data.postsDapp}
      />
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

      <ProjectsList
        grid="2"
        gap="4"
        itemType={"all"}
        title="Latest Ideas"
        titleIcon="code-branch"
        titleIconColor="blue-500"
        cta="Sorted by"
        posts={data.posts}
      />
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