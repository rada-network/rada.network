import Link from 'next/link'
import {Layout} from '../../components/page-layouts/Global';
import {Sidebar} from '../../components/sidebar/Sidebar';

import "perfect-scrollbar/css/perfect-scrollbar.css";

import {RiArrowUpSFill, RiCompass3Fill, RiExternalLinkLine} from "react-icons/ri";
import {CommentList} from "../../components/comments/commentList";
import {Vote} from "../../components/vote/Vote";
import {useRouter} from "next/router";

import {useStore} from "../../lib/useStore";
import utils from "../../lib/util";
import KeywordIcon from "../../components/icons/keywordIcon";
import React from "react";
import {getNews} from "../../data/query/getNewsById";
import {VoteStore} from "../../lib/store";


const getData = async (id) => {
  const newsDetail = await getNews({id})
  return {
    news : newsDetail.data.newsById,
  }
}

const voteStore = new VoteStore()

export function NewsDetailBody({props,isSideBar,voteStore}){
  let keywords = JSON.parse(props.news.keywords);
  keywords = Object.entries(keywords)
  return (
    <div className={`wrapper`}>
      <div className={`container`}>
        <div className={`main-grid`}>
          {/* main content */}
          <div className={`maincontent`}>
            <div className={`section section-top`}>
              <div className={`section-inner`}>
                {/* Page Header */}
                <div className="page-header">

                  {props.news.thumbnailUri !== null && props.news.thumbnailUri ?
                    <div className="project-icon">
                      <a target={"_blank"} rel={"nofollow"} href={props.news.websiteUri}>
                          <img className="project-icon_img" src={props.news.thumbnailUri} />
                      </a>
                    </div>
                    : ""
                  }
                  <div className="flex w-full flex-col">
                    <div className="flex items-center content-center page-title">
                      <a target={"_blank"} rel={"nofollow"} href={props.news.websiteUri}>
                        <h1 className="project-title">{props.news.title}</h1>
                      </a>
                    </div>
                    <div className="metadata-wrapper md:my-1 lg:mt-0">
                      {
                        keywords.map(function(value, index, array){
                          return (
                            <KeywordIcon key={value[0]+value[1]+(new Date()).getTime()} keyword={value[0]} weight={value[1]}/>
                          )
                        })
                      }
                    </div>
                    <div className="project-text_short" dangerouslySetInnerHTML={{__html: props.news.description}} />

                    {/* Main CTAS */}
                    <div className="cta-wrapper">
                      <Vote
                        itemId={props.news.item.id}
                        voteStore={voteStore}
                        page={"detail"}
                      />
                      <a target="_blank" rel="nofollow" href={props.news.websiteUri} className="btn btn-project-link ml-4">
                          <span className="btn-project-vote_total whitespace-nowrap">
                            <span className="inline-block text-sm font-medium">Visit</span>
                          </span>
                        <span className="icon ml-2"><RiExternalLinkLine /></span>
                      </a>
                    </div>

                  </div>

                </div>

                {/* Page Main */}
              </div>

            </div>

            {/* Comments */}
            <CommentList item={props.news} />
          </div>
          {/* Sidebar */}
          {isSideBar ?
            <Sidebar className={`sidebar`} extraClass="" type="Post" />
            : ""
          }


        </div>

      </div>
    </div>
  )
}

export default function NewsDetail (props) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const store = useStore()
  voteStore.walletAddress = store.wallet.address
  voteStore.addVotes([props.news])
  return (
    <Layout extraClass="page-project_details"
            meta={utils.createSiteMetadata({page : 'NewsDetail',data : props.news})}
    >
      <NewsDetailBody props={props} isSideBar={true} voteStore={voteStore} />
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