import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Tabbar } from "../Tabbar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import ThemeSwitch from "../ThemeSwitch"

import { useState, useEffect, createRef } from 'react'

// Perfect Scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Screen from "../utils/Responsive";
import {LanguageSwitch} from "../LanguageSwitch";

const scrollBox = createRef();
let ps;

export const Layout = ({children,meta,dataStore,detailStore}) => {

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

    <div className={`body-decor`}>
    </div>

    <div className={`body-decor--text`}>
      <p className="mb-1">&copy; Image from Unsplash</p>
      <div className="flex">
        <a href="#"><i class="far fa-random"></i> New Image</a>
        <a href="#" className="ml-2"><i class="far fa-minus-circle"></i> Remove Image</a>
      </div>
    </div>

    <div className={`main-layout`}>

      {/* Mobile / Tablet Navbar */}
      <Screen upto="md">
      <div className="pane-bottom">
        <Navbar dataStore={dataStore} detailStore={detailStore} />
        <Screen from="lg">
        <div className="pane-left--bottom">
          <LanguageSwitch dataStore={dataStore} />
          <ThemeSwitch />
        </div>
        </Screen>
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
          {children}
        </div>

      </div>

    </div>

    </>
  );
}
