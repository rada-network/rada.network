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
import useSWR from "swr";
import { useStore } from "../lib/useStore"

const getData = async () => {
  console.log("get data")
  const client = getClient()

  const posts = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: ""}
  })

  const postsNFT = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: "nft"},
  })

  const postsDapp = await client.query({
    query: postQuery,
    variables: {skip: 0, take: 4, itemType: "dapp"}
  })

  console.log("Query is running...", typeof window)

  return {
    posts: posts.data.itemFeed,
    postsNFT: postsNFT.data.itemFeed,
    postsDapp: postsDapp.data.itemFeed,
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
    
  return (
    <Layout extraClass="page-home">
      <Header/>
      <ProjectsList
        grid="2"
        gap="2"
        title="Popular Projects Today"
        posts={data.posts}
      />
      <CategoryList
        extraClass="category-list"
        grid="5"
        gap="5"
        title="Project Categories"
        cta="View all"
      />
      <ProjectsList
        grid="2"
        gap="2"
        title="NFTs that you cannot missed"
        posts={data.postsNFT}
      />
      <ProjectsList
        grid="2"
        gap="2"
        title="Most Active Dapps in a Week"
        posts={data.postsDapp}
      />
      <TopUsersList
        grid="5"
        gap="5"
      />
      <ProjectsList
        grid="1"
        gap="2"
        title="New Projects Today"
        posts={data.posts}
      />
      <PromoList
        extraClass="promo-list"
        grid="3"
        gap="5"
      />
      <ProjectsList
        grid="1"
        gap="2"
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