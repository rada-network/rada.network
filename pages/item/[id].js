import { useEffect, useState } from "react";
import useSWR, {mutate} from 'swr'
import ReactDOM from "react-dom";
import Link from 'next/link'

import useUser from '../../lib/useUser'
import {Layout} from '../../components/page-layouts/OneColumn';
import {Carousel} from "../../components/carousel/Carousel";
import getClient from "../../data/client";

import itemQuery from "../../data/query/itemDetail"
import allItem from "../../data/query/items"
import {RiArrowUpSFill, RiCompass3Fill} from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import tgVote from "../../data/query/tgVote";
import {CommentList} from "../../components/comments/commentList";
import {Vote} from "../../components/vote/Vote";
import IdeaInfo from "../../components/info/ideaInfo";
import itemComments from "../../data/query/itemComments";
import {useRouter} from "next/router";
import IdeaContent from "../../components/info/ideaContent";
import {Card} from "../../components/cards/MediaFull";


const getData = async (id) => {
  const client = getClient()
  const dataItem = await client.query({
    query : itemQuery,
    variables : {id : id}
  });
  let _comments = await client.query({
    query : itemComments,
    variables : {itemId : id,orderBy : {createdAt : "desc"}}
  })
  return {
    item : dataItem.data.itemById,
    comments : _comments.data.commentFeed
  }
}

export default function Item (props) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const {data} = useSWR([props.item.id,"item"],getData, {initialData: props});
  const imgsUri = data.item.imagesUri
  // const imgs = data.item.images
  // console.log("imgsUri: ", imgsUri)

  const showImgs = Object.keys(imgsUri).map(key => {
    return <a href={`${imgsUri[key]}`}>img {key} <br /></a>
  })
  const showImages_ = Object.keys(imgsUri).map(key => {
    return(
      <Card
        itemType=""
        mediaUri={imgsUri[key]}
      />
    )
  })
  return (
    <Layout extraClass="page-project_details" meta={data.item.title}>
    {/*<Layout extraClass="page-project_details" meta={data.item}>*/}
      <>

      <div class="section section-top">
        <div className="container">
          <div className="container-inner">

            {/* Page Header */}
            <div className="page-header flex flex-col md:flex-row">

              {data.item.thumbnail !== null ?
              <div className="mr-8">
                <Link target={"_blank"} href={data.item.imageUri}>
                  <a className="project-icon rounded overflow-hidden">
                    <img className="project-icon_img w-full h-full object-cover" src={data.item.imageUri} />
                  </a>
                </Link>
              </div>
              : ""
              }

              <div className="flex w-full flex-col">

                <div className="flex items-center content-center page-title">
                  <h1 className="project-title">{`${data.item.title}`}</h1>
                </div>

                <div className="metadata-wrapper project-metadata-wrapper">
                  <a href={`/explore/${data.item.itemType}`} className={`metadata badge badge-${data.item.itemType} project-metadata_type`}>
                    <span className="metadata-value">{data.item.itemType}</span>
                  </a>
                  <a href={data.item.platform.websiteUri} className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                    <span className="icon"><i className={`cf cf-${data.item.platform.networkName.slice(0, 3)}`}/></span>
                    <span className="metadata-value">{data.item.platform.name}</span>
                  </a>
                  <a href="#" className="metadata badge badge-eth project-metadata_platform project-metadata_platform_sol">
                    <span className="icon"><i className={`cf cf-${data.item.token.symbol.toLowerCase()}`}/></span>
                    <span className="metadata-value">{data.item.token.symbol}</span>
                  </a>
                </div>

                {/* Main CTAS */}
                <div className="mt-6 flex cta-wrapper">
                  <Vote
                    itemId={data.item.id}
                    votes={data.item.totalVote}
                    page={"detail"}
                  />
                  <a target="_blank" rel="nofollow" href={data.item.websiteUri} className="btn">
                    <span className="text-2xl icon"><RiCompass3Fill /></span>
                    <span className="ml-2 btn-project-vote_total whitespace-nowrap">
                      <span className="inline-block text-sm font-medium">Visit</span>
                    </span>
                  </a>
                </div>
                
              </div>

            </div>

            {/* Page Main */}
            <div className="flex flex-row justify-center">

                <div className="page-main">

                  {showImages_}


                  <IdeaContent item={data.item} />



                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Comments */}
        <div class="section">
          <div className="container">
            <div className="container-inner">
              <CommentList item={data.item} comments={data.comments}/>
            </div>
          </div>
        </div>

      </>
    </Layout>
  )
}

export async function getStaticPaths() {
  const client = getClient()
  const items = await client.query({
    query : allItem,
    variables : {take : 10000,skip : 0}
  });
  // Get the paths we want to pre-render based on posts
  const paths = items.data.itemFeed.map((item) => ({
    params: { id: item.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

export async function getStaticProps({params}) {
  const props = await getData(params.id);
  return {
    props,
    revalidate: 900
  }
}