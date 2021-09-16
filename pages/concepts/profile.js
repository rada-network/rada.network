import { Head } from "../../components/Head";
import { Topbar } from "../../components/Topbar";
import { Navbar } from "../../components/Navbar";

import ThemeSwitch from "../../components/ThemeSwitch"

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../components/LanguageSwitch";
import Screen from "../../components/utils/Responsive";
import { observer } from "mobx-react";

export const Layout = observer(({children,meta,dataStore,detailStore}) => {

  // const [Scrollbar] = useState('')

  // useEffect(() => {
  //   // make scrollbar
  //   ps = new PerfectScrollbar(scrollBox.current, {
  //   });
  
  //   return () => {
  //     ps.destroy();
  //   }
  // }, [scrollBox]);

  return (
    <>
    <Head meta={meta} title={meta.title} description={meta.description} keyword={meta.keyword} facebook={meta.facebook} twitter={meta.twitter} />

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
          <LanguageSwitch dataStore={dataStore} />
          <ThemeSwitch />
        </div>
      </div>
      </Screen>

      <div className={`pane-center`}>
        
        <Screen upto="md">
        <div className="pane-center--top">
          {/* <Tabbar /> */}
          <Topbar dataStore={dataStore} />
        </div>
        </Screen>

        <div className="pane-center--main">
          
          {/* HieuNN */}
          {/* Future Concept will be here */}
          

        </div>

      </div>

    </div>

    </>
  );
})
