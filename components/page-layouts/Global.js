import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Tabbar } from "../Tabbar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import { useState, useEffect, createRef } from 'react'

// Perfect Scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Screen from "../Resposive";

const scrollBox = createRef();
let ps;

export const Layout = ({children,meta,dataStore}) => {

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
    <Head title={meta.title} description={meta.description} keyword={meta.keyword} facebook={meta.facebook} twitter={meta.twitter} />

    <div className={`main-layout`}>

      <div className="pane-left">
        <Navbar dataStore={dataStore} />
      </div>

      <div className={`pane-center`}>
        
        <Screen upto="md">
        <div className="pane-center--top">
          {/* <Tabbar /> */}
          <Topbar />
        </div>
        </Screen>

        <div className="pane-center--main">
          {children}
        </div>

      </div>

    </div>
    </>
  );
};
