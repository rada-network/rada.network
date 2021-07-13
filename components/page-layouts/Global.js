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

  const [Scrollbar] = useState('')

  useEffect(() => {
    // make scrollbar
    ps = new PerfectScrollbar(scrollBox.current, {
    });
  
    return () => {
      ps.destroy();
    }
  }, [scrollBox]);

  return (
    <>
    <Head />

    <div className={`main-layout`}>

      <Navbar />

      <Topbar />
      
      <div className={`mainbody scrollbar`} ref={scrollBox}>
        {children}
        <Footer />
      </div>

    </div>
    </>
  );
};
