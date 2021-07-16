import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import { useState, useEffect, createRef } from 'react'

// Perfect Scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

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

      <div class="pane-left">
        <Navbar />
      </div>

      <div className={`pane-center`}>

        <div class="pane-center--top">
          <Topbar />
        </div>

        <div className="pane-center--main">
          {children}
        </div>

      </div>

    </div>
    </>
  );
};
