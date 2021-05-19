import {Header} from "../components/Header";
import {Layout} from "../components/page-layouts/OneColumn";
import {useRouter} from "next/router";
import getClient from "../data/client";

import allItems from "../data/query/posts"
import useSWR from "swr";
import {ProjectsList} from "../components/card-layouts/ProjectsList";


const getData = async () => {
  const client = getClient()
  const dataItem = await client.query({
    query: allItems,
    variables: {take:100, skip: 0, itemType:"", orderBy: {createdAt: "desc"}}
  })
  return {
    items: dataItem.data.itemFeed
  }
}

export default function explore() {

  const router = useRouter()
  const { itemType } = router.query

  const shuffleData = (data) => {
    let currentIndex = data.length, temp, randomIndex
    while (0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temp = data[currentIndex]
      data[currentIndex] = data[randomIndex]
      data[randomIndex] = temp
    }
    return data
  }

  try {
    const {data, error} = useSWR("explore-page", getData)

    if (error) return <div>Loading page....</div>

    return (
      <Layout extraClass="page-home">
        <Header/>
        <ProjectsList
          grid="2"
          gap="2"
          title="View All"
          cta="View all"
          detail={false}
          posts={shuffleData(data.items.slice())}
        />
      </Layout>
    )
  }catch (err){
    console.log(err)
  }
  return(
    <>
      <Layout extraClass="page-home">
        <Header/>
        <p>Loading...</p>
      </Layout>
    </>
  )
}