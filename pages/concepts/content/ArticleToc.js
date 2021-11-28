import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../../../components/page-layouts/Global";

import SampleArticle from "./SampleArticle";

export default () => ( 
  <>
    <Layout extraClass="page-home">
      <div className={`pane-content`}>
        <div className="pane-content--sec pane-content-active !w-full">
          <div className="pane-content--sec--top !hidden"></div>

            <div className="pane-content--sec--main grid scrollbar">
              <div className="page-full page-project-details !pt-0 page-research-details">
                <div className="w-limiter-lg">

                  <SampleArticle />
                  
                </div>
              </div>
            </div>

        </div>
      </div>
    </Layout>
  </>
)
