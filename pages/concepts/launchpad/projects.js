import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";

import Screen from "../../../components/utils/Responsive";

import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";

import dynamic from "next/dynamic";
const Layout = dynamic(import("@components/page-layouts/Global"));

export default () => (
  <>
  <Layout extraClass="page-details">

    <div className="pane-content">
      <div className="pane-content--sec pane-content-active !w-full">

        <div className="pane-content--sec--top !block">
          <div className="flex h-full relative lg:px-3">
            <div className="tabbar page-tabs">
              <div className="tabbar--main">
                <a href="#" className="tab-item tab-item--active">Public</a>
                <span className="tab-item--divider"></span>
                <a href="#" className="tab-item">Private</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pane-content--sec--main grid scrollbar dark:!bg-gray-900 !bg-opacity-70">
          <div className="page page-full page-project-details !pt-0">
            <ProjectsList /> 
          </div>
        </div>

      </div>

    </div>

    </Layout>
  </>
);

