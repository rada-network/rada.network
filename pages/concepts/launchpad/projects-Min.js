import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import { ProjectsList } from "../_components/cards-layout/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";


import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";

import { useRef,useEffect } from "react";
import BackgroundWrapper from "../_components/cards-layout/launchpad/BackgroundWrapper";
const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {}

  return (
    <>
      <Head meta={meta} />

      <BackgroundWrapper />

      <div className={`main-layout--wrapper`}>

        <div className={`main-layout`}>
          {/* Mobile / Tablet Navbar */}
          <Screen upto="md">
            <div className="pane-bottom">
              <Navbar dataStore={dataStore} detailStore={detailStore} />
            </div>
          </Screen>

          {/* Desktop Navbar */}
          <Screen from="lg">
            <div className="pane-left">
              <Navbar dataStore={dataStore} detailStore={detailStore} />
              <div className="pane-left--bottom">
                <Profile />
                <div className="pane-left--bottom-section">
                  <LanguageSwitch />
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </Screen>

          <div className={`pane-center`}>
            <div className="pane-center--main glassmorphism">

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

            </div>
          </div>
        </div>

      </div>
    </>
  );
})


export async function getStaticProps(context) {
  console.log(context)
  return { 
    props: {
      lang : context.locale
    }
  }
}

export default Layout;
