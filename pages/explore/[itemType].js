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
    variables: itemType === "All-Posts" || itemType === "New-Projects-Today"
      ? {take: 10, skip: 0, itemType: "", orderBy: {createdAt: "desc"}}
      : {take: 10, skip: 0, itemType: itemType, orderBy: {createdAt: "asc"}}
  })
  return dataItem.data.itemFeed
}

export default function Explore() {
  const router = useRouter()
  const { itemType } = router.query

  try {
    const {data, error} = useSWR([itemType], getData)
    // console.log(data);
    if (error){
      return <div>Loading...</div>
    }
    data.map((post) => {
      console.log(post.createdAt[1])
    })
    return (
      <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
        <Header/>
          <ProjectsList
            grid="2"
            gap="2"
            title={`Most ${itemType.split('-').join(' ').toUpperCase()} in a Week`}
            cta="Sorted by"
            detail={!["nft", "dapp", "token", "defi"].includes(itemType)}
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