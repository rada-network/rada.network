import { useEffect, useState } from "react";
import Link from "next/link";

import SampleArticle from "./SampleArticle";
import Toc from "../_components/content/TocSidebar";

import dynamic from "next/dynamic";
const Layout = dynamic(import("@components/page-layouts/Global"));

export default () => (
  <>
    <Layout extraClass="page-details">
      <div className={`pane-content`}>
        <div className="pane-content--sec pane-content-active !w-full">
          <div className="pane-content--sec--top">
            <div className="flex h-full w-limiter-lg relative xl:px-4">
              <div className="page-back flex-shrink-0 ml-0 relative lg:left-1 xl:left-2">
                <div className="btn">
                  <a href="/vi/launchverse">
                    <span className="icon">
                      <i className="fa-solid fa-chevron-left"></i>
                    </span>
                    <span className="btn--text sr-only">back</span>
                  </a>
                </div>
              </div>
              <div className="tabbar page-tabs relative lg:left-8 xl:-left-1">
                <div className="tabbar--main">
                  <a className="tab-item" href="/vi/launchverse/parallel">
                    LaunchVerse
                  </a>
                  <span className="tab-item--divider"></span>
                  <a
                    className="tab-item tab-item--active"
                    href="/vi/launchverse/parallel/research"
                  >
                    <span className="token-symbol flex-shrink-0 lg:mr-2">
                      <img
                        src="https://media.rada.network/assets/e1a6619a-2209-44aa-820f-482171cb7299?format=webp&amp;width=128"
                        className="h-px-20 w-px-20"
                        alt="The Parallel"
                      />
                    </span>
                    <span className="tab-item--text">Thông tin PRL</span>
                  </a>
                  <a
                    className="tab-item"
                    href="/vi/launchverse/parallel/share2earn"
                  >
                    <span className="icon">
                      <i className="fa-duotone fa-hand-holding-heart"></i>
                    </span>
                    <span className="tab-item--text">Share2Earn</span>
                  </a>
                </div>
              </div>
              <button className="btn btn-primary my-2 px-2 md:px-4 ml-auto lg:mr-3 xl:mr-12 text-sm flex">
                Kết nối
              </button>
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
);
