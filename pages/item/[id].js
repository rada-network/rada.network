import useSWR, {mutate} from 'swr'
import Link from 'next/link'
import React, { useState, useEffect, createRef } from 'react'

import {Layout} from '../../components/page-layouts/OneColumn';
import {Sidebar} from '../../components/sidebar/SidebarPost';

import getClient from "../../data/client";

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";


import itemQuery from "../../data/query/itemDetail"
import allItem from "../../data/query/items"
import {RiArrowUpSFill, RiCompass3Fill, RiExternalLinkLine} from "react-icons/ri";
import {CommentList} from "../../components/comments/commentList";
import {Vote} from "../../components/vote/Vote";
import itemComments from "../../data/query/itemComments";
import {useRouter} from "next/router";
import IdeaContent from "../../components/info/ideaContent";
import {Card} from "../../components/cards/MediaOnly";
import NetworkIcon from "../../components/icons/networkIcon";
import TokenIcon from "../../components/icons/tokenIcon";
import ItemTypeBadge from "../../components/icons/itemTypeBadge";

import Media from "../../components/Media"
import {useStore} from "../../lib/useStore";
import {getIsVotes} from "../../data/query/isVoted";
import utils from "../../lib/util";

// Widgets Comp
import { Widget } from "../../components/widgets/Widget";
import {VoteStore} from "../../lib/store";

const scrollBox = createRef();
let ps;

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

const voteStore = new VoteStore()

export default function Item (props) {

  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const store = useStore()
  voteStore.walletAddress = store.wallet.address

  const {data} = useSWR([props.item.id,"item"],getData, {initialData: props});
  const imgsUri = data.item.imagesUri

  const showImgs = Object.keys(imgsUri).map(key => {
    return <a href={`${imgsUri[key]}`}>img {key} <br /></a>
  })

  voteStore.addVotes([{
    id : data.item.id,
    totalVote : data.item.totalVote,
    isVoted : false
  }])

  const [showIdx, setShowIdx] = useState(-1)
  const popupMedia = (idx) => {
    setShowIdx(idx)
  }

  const images = Object.keys(imgsUri).map(key => imgsUri[key])

  const Gallery = () => (!images.length) ? <span ref={scrollBox} /> : (
    <div className={`project-media scrollbar`} ref={scrollBox}>
      {images.map((img, idx) => (
        <Card
          itemType=""
          mediaUri={img}
          onClick={e => popupMedia(idx)}
        />
      ))}
    </div>
  )


  useEffect(() => {
    // make scrollbar
    ps = new PerfectScrollbar(scrollBox.current, {
    });

    return () => {
      ps.destroy();
    }
  }, [scrollBox, showIdx]);

  return (
    <Layout extraClass="page-project_details"
            meta={utils.createSiteMetadata({page : 'IdeaDetail',data : data.item})}
    >
      <>

      <div className={`wrapper`}>
        <div className={`container`}>

          <div className={`main-grid`}>

            {/* main content */}
            <div className={`maincontent`}>

              <div className={`section section-top`}>

                <div className={`section-inner`}>

                  {/* Page Header */}
                  <div className="page-header">

                    {data.item.thumbnail !== null ?
                    <div className="project-icon">
                      <Link target={"_blank"} href={data.item.imageUri}>
                        <a className="">
                          <img className="project-icon_img" src={data.item.imageUri} />
                        </a>
                      </Link>
                    </div>
                    : ""
                    }
                    <div className="flex w-full flex-col">
                      <div className="flex items-center content-center page-title">
                        <h1 className="project-title">{`${data.item.title}`}</h1>
                      </div>

                      <div className="metadata-wrapper">
                        <ItemTypeBadge item={data.item}/>
                        <NetworkIcon
                            badge={true}
                            projectWebsiteUri={data.item.platform.websiteUri}
                            projectPlatformShort={data.item.platform.networkName.slice(0, 3)}
                            projectPlatform={data.item.platform.name}
                        />
                        <TokenIcon item={data.item} badge={true}  />
                      </div>

                      <div className="project-text_short" dangerouslySetInnerHTML={{__html: data.item.description}} />

                      {/* Main CTAS */}
                      <div className="cta-wrapper">
                        <Vote
                          itemId={data.item.id}
                          voteStore={voteStore}
                          page={"detail"}
                        />
                        <a target="_blank" rel="nofollow" href={data.item.websiteUri} className="btn btn-project-link ml-4">
                          <span className="btn-project-vote_total whitespace-nowrap">
                            <span className="inline-block text-sm font-medium">Visit</span>
                          </span>
                          <span className="icon ml-2"><RiExternalLinkLine /></span>
                        </a>
                      </div>

                    </div>

                  </div>

                  {/* Page Main */}
                  <div className="flex flex-row justify-center">
                    <div className="page-main">

                      {/* Gallery */}
                      <Gallery ref={scrollBox} />

                      <IdeaContent item={data.item} />

                      <Media idx={showIdx} doClose={() => setShowIdx(-1)} items={images} />

                    </div>
                  </div>

                </div>

              </div>

              {/* Comments */}

              <CommentList item={data.item} comments={data.comments}/>

            </div>

            {/* Sidebar */}
            <Sidebar className={`sidebar`} extraClass="" />

          </div>

        </div>
      </div>

      </>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {id} = context.query;
  const props = await getData(id);
  return {
    props: props
  }
}