import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/Header';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import useSWR from "swr";
import getClient from "../../data/client";
import {observer} from "mobx-react";

import {getPosts} from "../../data/query/posts";
import {getTweet} from "../../data/query/postsTweet";
import {useRouter} from "next/router";
import {HomeStore, ObservableTweetStore} from "../index";

const homeStore = new HomeStore({isHome : false})
const observableTweetStore = new ObservableTweetStore({homeStore})

const getData = async (itemType, socialOrder) => {
  const client = getClient()
  if (typeof socialOrder == "undefined") socialOrder = "latest"
  if (itemType === "tweet") {
    const postTweet = await getTweet({socialOrder, skip: 0, take: 12})
    return postTweet.data.tweetFeed
  }
  const dataItem =await getPosts({
    type : itemType,
    take : 12,
    skip : 0,
    socialOrder : "latest"
  })
  return dataItem.data.itemFeed
}

export default observer(function Explore({props}) {
  const router = useRouter();
  let { slug } = router.query;
  const itemType = slug;
    const {data, error} = useSWR([itemType], getData)
    if (error){
      return (
        <>
          <p>itemType: {itemType}</p>
          <div>Loading...</div>
        </>
      )
    }
    if (!data){
      observableTweetStore.data = []
      if (itemType === 'tweet')
        return (
          <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
            <Header/>
            <SocialPostsList
              grid="1"
              gap="2"
              title=""
              titleIcon="fire-alt"
              titleIconColor="red-500"
              dataStore={observableTweetStore}
            />
          </Layout>
        )
      else
        return (
          <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
            <Header/>
            <ProjectsList
              grid="2"
              gap="2"
              title={`Most ${itemType.split('-').join(' ').toUpperCase()} in a Week`}
              cta="Sorted by"
              detail={true}
              itemType={itemType}
              dataStore={observableTweetStore}
            />
          </Layout>
        )
    }
    observableTweetStore.tweets = data

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
            dataStore={observableTweetStore}
          />
        </Layout>
      )
    }
    else{
      return (
        <Layout extraClass="page-home" meta={itemType === "All-Posts" ? "Category Pages" : "Explore Pages"}>
          <Header/>
          <ProjectsList
            grid="2"
            gap="2"
            title={`Most ${itemType.split('-').join(' ').toUpperCase()} in a Week`}
            cta="Sorted by"
            detail={true}
            itemType={itemType}
            dataStore={observableTweetStore}
          />
        </Layout>
      )
    }
  return (
    <Layout extraClass="page-home">
      <Header/>
      <p>Loading...</p>
    </Layout>
  )
})

export async function getServerSideProps(context) {
  const {slug} = context.query;

  return {
    props: {
    }, // will be passed to the page component as props
  }
}