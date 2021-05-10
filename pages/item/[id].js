import { useEffect, useState } from "react";
import useSWR, {mutate} from 'swr'
import ReactDOM from "react-dom";
import Link from 'next/link'

import useUser from '../../lib/useUser'
import {Layout} from '../../components/page-layouts/OneColumn';
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


const MAX_LEVEL = 3;
let replyTo = ''

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
  const {data} = useSWR([props.item.id,"item"],getData, {initialData: props});

  const readMore = () => {
    const read = document.getElementById("read")
    const readBtn = document.getElementById("readBtn")
    if (read.style.display === ""){
      read.style.display = "inline"
      readBtn.innerHTML = "Read Less"
    }else{
      readBtn.innerHTML = "Read More"
      read.style.display = ""
    }
  }

  const showContents = Object.keys(data.item.contentJson).map(key => {
    return `${data.item.contentJson[key].a} <br /> ${data.item.contentJson[key].b} <br />`
  })
  return (
    <Layout extraClass="page-project_details" title={data.item.title}>
      <>
        {/* Page Header */}
        <div className="page-header">
          <div className="container">

            <div className="page-header_l">
              <Link href={`#`}>
                <a title="SolaSystem" className="project-icon">
                  <img className="project-icon_img" src={data.item.imageUri} />
                </a>
              </Link>
            </div>

            <div className="flex-1 page-header_main">
              <div className="flex items-center content-center page-title">
                <h1 className="project-title">{`${data.item.title}`}</h1>
              </div>

              <div className="project-text_short">
                <div  dangerouslySetInnerHTML={{__html: data.item.description}} />
              </div>

              <div className="mt-2 metadata-wrapper project-metadata-wrapper">
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

            </div>

            <div className="page-header_r">
              <div className="flex justify-between cta-wrapper">
                <a target="_blank" rel="nofollow" href={data.item.websiteUri} className="justify-center px-2 py-2 text-purple-700 bg-white border rounded-md w-px-104 md:w-full btn border-gray-200 item-center md:px-3 md:py-3 hover:bg-primary-100 hover:border-primary-500">
                  <span className="text-2xl icon"><RiCompass3Fill /></span>
                  <span className="ml-2 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Visit</span>
                  </span>
                </a>
                <Vote
                  itemId={data.item.id}
                  votes={data.item.totalVote}
                  page={"detail"}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Page Main */}
        <div className="container">

          <div className="flex flex-row justify-center">

            <div className="page-main">

              <div className="section">
                <div className="section-body">
                  <div className="flex-col">

                    {/*<div className="project-media-viewer">*/}
                    {/*  <div className="w-full h-full project-media-wrapper">*/}
                    {/*    <div className="overflow-hidden rounded shadow-xl project-media aspect-w-16 aspect-h-9">*/}
                    {/*      /!* <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" /> *!/*/}
                    {/*      <iframe width="560" height="315" src="https://www.youtube.com/embed/qnkuBUAwfe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    <div className="pt-4 mt-4 md:flex md:mt-8">

                      <div className="flex-1 w-full text-gray-900 text-opacity-100 md:pr-10 project-text">
                        <div id={`read`}
                          dangerouslySetInnerHTML={{__html: showContents}}></div>
                        <button className="hover:underline text-blue-700" onClick={readMore} id={"readBtn"}>Read more</button>
                      </div>
                      {data.item.ideaUser !== null ? <IdeaInfo item={data.item}/> : ""}

                    </div>

                  </div>

                </div>
              </div>
              <CommentList item={data.item} comments={data.comments}/>

            </div>

            {/* <div className="page-sidebar">
              <div className="flex flex-col h-full project-details">
                <div className="project-text">
                  <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>
                  <p>Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                </div>
              </div>
            </div> */}

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
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const props = await getData(params.id);
  return {
    props,
    revalidate: 900
  }
}