import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";

// Cards Concepts
import TokenMeta from "../../../components/cards/concepts/launchpad/TokenMeta";
import MainActions from "../../../components/cards/concepts/launchpad/MainActions";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";
const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {}
  return (
    <>
      <Head meta={meta} />

      {/* <div className={`body-decor`}>
    </div>

    <div className={`body-decor--text`}>
      <p className="mb-1">&copy; Photo from Unsplash</p>
      <div className="flex">
        <a href="#"><i className="far fa-random"></i> New Photo</a>
        <a href="#" className="ml-2"><i className="far fa-minus-circle"></i> Remove</a>
      </div>
    </div> */}

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

          <div className="pane-center--main scrollbar">

            <div className="pane-content">

              <div className="pane-content--full">

                <div className="page page-full page-project-details">
                  <div className="w-limiter-lg no-padding scrollbar">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                      <div className="project-brief p-5 box">
                        <h3 className="mb-5">Project Brief</h3>
                        <TokenMeta />
                      </div>
                      {/* end of project-brief */}

                      <div className="project-process p-5 box">
                        <h3 className="mb-5">How to invest</h3>
                        <div className="text-sm text-gray-700 dark:text-gray-400">
                        Nullam quis risus eget urna mollis ornare vel eu leo. 
                        Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                        </div>
                      </div>
                      {/* end of project-process */}

                      <div className="project-process p-5 box">
                        <h3 className="mb-5">How to invest</h3>
                        <div className="text-sm text-gray-700 dark:text-gray-400">
                        Nullam quis risus eget urna mollis ornare vel eu leo. 
                        Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                        </div>
                      </div>
                      {/* end of project-process */}

                    </div>

                    {/* <div className="project-sale-info mb-2.5 mt-5 ml-2.5 mr-5 w-full md:w-2/3 p-5 box">
                      Sale info
                    </div> */}

                    {/* Main Action Card */}
                    <div className="grid grid-cols-1 mt-4">
                      <MainActions />
                    </div>
                    {/* END: Main Action Card */}
                    
                  
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
