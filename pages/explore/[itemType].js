import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/Header';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import useSWR from "swr";
import getClient from "../../data/client";
import {observer} from "mobx-react";

import itemsByItemType from "../../data/query/posts";
import {getTweet} from "../../data/query/postsTweet";
import {useRouter} from "next/router";
import {useStore} from "../../lib/useStore";
import {HomeStore, ObservableTweetStore} from "../index";

const homeStore = new HomeStore()
const observableTweetStore = new ObservableTweetStore({homeStore})
let defaultTypes = ["nft", "dapp", "token", "defi", "africa", "problem", "metadata", "marketing", "dao"]

const getData = async (itemType, socialOrder) => {
  const client = getClient()
  if (typeof socialOrder == "undefined") socialOrder = "latest"
  if (itemType === "tweet") {
    const postTweet = await getTweet({socialOrder, skip: 0, take: 12})
    return postTweet.data.tweetFeed
  }
  // console.log("itemType: ", !defaultTypes.includes(itemType))
  const dataItem = await client.query({
    query: itemsByItemType,
    variables: !defaultTypes.includes(itemType)
      ? {take: 12,
        skip: 0,
        itemType: "",
        orderBy: socialOrder === "popular" ? {createdAt: "asc"} : {createdAt: "desc"}}
      : {take: 8,
        skip: 0,
        itemType: itemType,
        orderBy: socialOrder === "popular" ? {createdAt: "asc"} : {createdAt: "desc"}}
  })
  return dataItem.data.itemFeed
}

export default observer(function Explore(posts) {
  const router = useRouter()
  const store = useStore()
  let { itemType } = router.query

  const getKey = () => {
    return [store?.state.socialOrder]
  }

  try {
    const {data, error} = useSWR([itemType, getKey()[0]], getData)
    observableTweetStore.tweets = data
    if (error){
      return (
        <>
          <p>itemType: {itemType}</p>
          <div>Loading...</div>
        </>
      )
    }
    data.map((post) => {
      console.log(post.createdAt[1])
    })
    if (itemType === "tweet"){
      return (
        <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
          <Header/>
          <SocialPostsList
            grid="1"
            gap="2"
            title="Social Signal"
            titleIcon="fire-alt"
            titleIconColor="red-500"
            initPosts={{'latest': data, 'popular': []}}
            dataStore={observableTweetStore}
          />
        </Layout>
      )
    }
    return (
      <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
        <Header/>
        <ProjectsList
          grid="2"
          gap="2"
          title={`Most ${itemType.split('-').join(' ').toUpperCase()} in a Week`}
          itemType={itemType}
          titleIcon="code-branch"
          titleIconColor="blue-500"
          cta="Sorted by"
          detail={!defaultTypes.includes(itemType)}
          dataStore={observableTweetStore}
        />
      </Layout>
    )
  }catch (err){
    console.log(err)
    console.log("error in [itemType].js")
  }

  return (
    <Layout extraClass="page-home">
      <Header/>
      <p>Loading...</p>
    </Layout>
  )
})