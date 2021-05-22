// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';
import {PromoList} from '../components/card-layouts/PromoList';
import {TopUsersList} from '../components/card-layouts/TopUsersList';
import {CategoryList} from '../components/card-layouts/CategoryList';

//ReactIcons
import {IoChevronForwardSharp} from "react-icons/io5";
import getClient from "../data/client";
import postQuery from "../data/query/posts"
import tweetQuery from "../data/query/postsTweet"
import useSWR from "swr";
import { useStore } from "../lib/useStore"
import {TweetList} from "../components/card-layouts/TweetList";

const getData = async () => {
  console.log("get data")
  const client = getClient()

  const posts = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: "", orderBy: {createdAt: "desc"}}
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
    variables: {skip: 0, take: 4, orderBy: {createdAt: "asc"}}
  })
  console.log("Query is running...", typeof window)

  return {
    posts: posts.data.itemFeed,
    postsNFT: postsNFT.data.itemFeed,
    postsDapp: postsDapp.data.itemFeed,
    postsTweet: postsTweet.data.tweetFeed,
  }
}

export default function Home(props) {
  const store = useStore()
  const {data} = useSWR('homepage', getData, {initialData: props, revalidateOnMount: !store.inited})
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
      <ProjectsList
        grid="2"
        gap="4"
        title="Popular Projects Today"
        posts={data.posts}
      />
      <CategoryList
        extraClass="category-list"
        grid="5"
        gap="5"
        title="Project Categories"
        cta="View all"
        itemType={"all"}
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"nft"}
        title="NFTs that you cannot missed"
        posts={data.postsNFT}
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"dapp"}
        title="Most Active Dapps in a Week"
        posts={data.postsDapp}
      />
      <TopUsersList
        grid="5"
        gap="5"
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"today"}
        cta={"View All"}
        title="New Projects Today"
        detail={true}
        posts={data.posts}
      />
      <PromoList
        extraClass="promo-list"
        grid="3"
        gap="5"
      />
      <TweetList
        grid="1"
        gap="2"
        title="Popular Tweet Today"
        posts={data.postsTweet}
      />
      <ProjectsList
        grid="2"
        gap="4"
        itemType={"all"}
        title="All Projects"
        cta="Sorted by"
        posts={data.posts}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const props = await getData();
  return {
    props,
    revalidate: 900
  }
}