import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Tabbar } from "../Tabbar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import { useState, useEffect, createRef } from 'react'

// Perfect Scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Responsive from "../Resposive";

const scrollBox = createRef();
let ps;

export const Layout = ({children}) => {

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
    <Head />

    <div className={`main-layout`}>

      <div className="pane-left">
        <Navbar />
      </div>

      <div className={`pane-center`}>
        <Responsive lt="1024">
        <div className="pane-center--top">
          {/* <Tabbar /> */}
          <Topbar />
        </div>
        </Responsive>

        <div className="pane-center--main">
          {children}
        </div>

      </div>

    </div>
    </>
  );
};
