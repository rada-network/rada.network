import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../../../components/page-layouts/Global";

export default function ConceptsIndex() {
  return (
    <Layout extraClass="page-home">
      <div className={`pane-content`}>
        <div className="pane-content--sec pane-content-active !w-full">
          <div className="pane-content--sec--top !hidden"></div>

            <div className="pane-content--sec--main grid scrollbar">
              <div className="page page-full bg-white dark:bg-gray-900">
                <div className="grid">
   
                </div>
              </div>
            </div>

        </div>
      </div>
    </Layout>
  );
}
