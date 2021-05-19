import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/Header';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import useSWR from "swr";
import getClient from "../../data/client";

import itemsByItemType from "../../data/query/posts";
import { useRouter } from "next/router";

const getData = async (itemType) => {
  // console.log(`2. itemType: ${itemType}`)
  // console.log("get data in Explore page")

  const client = getClient()
  const dataItem = await client.query({
    query: itemsByItemType,
    variables: !["nft", "dapp", "token", "defi"].includes(itemType)
      ? {take: 16, skip: 0, itemType: "", orderBy: {createdAt: "desc"}}
      : {take: 10, skip: 0, itemType: itemType, orderBy: {createdAt: "asc"}}
  })
  return dataItem.data.itemFeed
}

export default function Explore() {
  const router = useRouter()
  let { itemType } = router.query

  try {
    const {data, error} = useSWR([itemType], getData)

    let postsTopComments = data.slice().sort((a, b) => b.totalComment - a.totalComment)
    let postsTopVotes = data.slice().sort((a, b) => b.totalVote - a.totalVote)
    // console.log(data);
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
    const showPosts = (post) => {
      return (
        <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
          <Header/>
          <ProjectsList
            grid="2"
            gap="2"
            title={`Most ${itemType.split('-').join(' ').toUpperCase()} in a Week`}
            cta="Sorted by"
            detail={!["nft", "dapp", "token", "defi"].includes(itemType)}
            posts={post}
          />
        </Layout>
      )
    }
    if (itemType === "top-comment") return showPosts(postsTopComments)
    else if (itemType === "top-vote") return showPosts(postsTopVotes)
    else return showPosts(data)
  }catch (err){
    console.log("error")
  }

  return (
    <Layout extraClass="page-home">
      <Header/>
      <p>Loading...</p>
    </Layout>
  )
}