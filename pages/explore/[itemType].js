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
    variables: itemType === "allPosts" ? {take: 10, skip: 0, itemType: ""} : {take: 10, skip: 0, itemType: itemType}
  })
  return dataItem.data.itemFeed
}

export default function Explore() {
  const router = useRouter()
  const { itemType } = router.query

  try {
    const {data, error} = useSWR([itemType], getData)
    // console.log("1. itemType: ", itemType, "data: ", data)
    data.map((post) => {
      console.log(post.id)
      console.log(post.title)
    })
    return (
      <Layout extraClass="page-home" title={itemType === "allPosts" ? "Category Pages" : "Explore Pages"}>
        <Header/>
        {/*<p>{`${itemType === "allPosts"}`}</p>*/}
        <ProjectsList
          grid="2"
          gap="2"
          title={`Most Active ${itemType.toUpperCase()} in a Week`}
          posts={data}
        />
      </Layout>
    )
  }catch (err){
    console.log(err)
  }

  return (
    <Layout extraClass="page-home">
      <Header/>
      {/*<p>Explore Page: {itemType}</p>*/}
    </Layout>
  )
}

// async function getStaticProps() {
// }