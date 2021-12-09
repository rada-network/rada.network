import { ProjectsList } from "../_components/cards-layout/launchpad/ProjectsList";

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

