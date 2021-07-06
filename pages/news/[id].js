import Link from 'next/link'
import {Layout} from '../../components/page-layouts/OneColumn';
import {Sidebar} from '../../components/sidebar/SidebarPost';

import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "../../styles/modules/Layout.module.css";

import {RiArrowUpSFill, RiCompass3Fill, RiExternalLinkLine} from "react-icons/ri";
import {CommentList} from "../../components/comments/commentList";
import {Vote} from "../../components/vote/Vote";
import {useRouter} from "next/router";

import {useStore} from "../../lib/useStore";
import utils from "../../lib/util";
import KeywordIcon from "../../components/icons/keywordIcon";
import React from "react";
import {getNews} from "../../data/query/getNewsById";


const getData = async (id) => {
  const newsDetail = await getNews({id})
  return {
    news : newsDetail.data.newsById,
  }
}

export function NewsDetailBody({props,isSideBar}){
  let keywords = JSON.parse(props.news.keywords);
  keywords = Object.entries(keywords)
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.grid_12cols}`}>
          {/* main content */}
          <div className={`${styles.maincontent}`}>
            <div className={`${styles.section} ${styles.section_top}`}>
              <div className={`section-inner ${styles.section_inner}`}>
                {/* Page Header */}
                <div className="page-header">

                  {props.news.thumbnailUri !== null ?
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
          </div>
          {/* Sidebar */}
          {isSideBar ?
            <Sidebar className={`${styles.sidebar}`} extraClass="" />
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
  return (
    <Layout extraClass="page-project_details"
            meta={utils.createSiteMetadata({page : 'NewsDetail',data : props.news})}
    >
      <NewsDetailBody props={props} isSideBar={true} />
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