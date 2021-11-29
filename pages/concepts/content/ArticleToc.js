import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../../../components/page-layouts/Global";

import SampleArticle from "./SampleArticle";
import Toc from "../_components/content/TocSidebar";

export default () => ( 
  
  <>
    <Layout extraClass="page-details">
      <div className={`pane-content`}>
        <div className="pane-content--sec pane-content-active !w-full">

            <div class="pane-content--sec--top">
              <div class="flex h-full w-limiter-lg relative xl:px-4">
                <div class="page-back flex-shrink-0 ml-0 relative lg:left-1 xl:left-2">
                  <div class="btn">
                    <a href="/vi/launchverse"><span class="icon"><i class="fa-solid fa-chevron-left"></i></span><span class="btn--text sr-only">back</span></a>
                  </div>
                </div>
                <div class="tabbar page-tabs relative lg:left-8 xl:-left-1">
                  <div class="tabbar--main">
                    <a class="tab-item tab-item--active" href="/vi/launchverse/parallel">LaunchVerse</a>
                    <span class="tab-item--divider"></span>
                    <a class="tab-item" href="/vi/launchverse/parallel/research"><span class="token-symbol flex-shrink-0 lg:mr-2"><img src="https://media.rada.network/assets/e1a6619a-2209-44aa-820f-482171cb7299?format=webp&amp;width=128" class="h-px-20 w-px-20" alt="The Parallel" /></span><span class="tab-item--text">Thông tin PRL</span></a>
                    <a class="tab-item" href="/vi/launchverse/parallel/share2earn"><span class="icon"><i class="fa-duotone fa-hand-holding-heart"></i></span><span class="tab-item--text">Share2Earn</span></a>
                  </div>
                </div>
                <button class="btn btn-primary my-2 px-2 ml-auto lg:mr-3 xl:mr-12 text-sm flex">Kết nối</button>
              </div>
            </div>


            <div className="pane-content--sec--main grid scrollbar">
              <div className="page-full page-project-details !pt-0 page-research-details">
                <div className="w-limiter-lg">

                  <SampleArticle />

                  <Toc />
                  
                </div>
              </div>
            </div>

        </div>
      </div>
    </Layout>
  </>
)
