import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";

import ThemeSwitch from "../ThemeSwitch"
import Profile from "../Profile";

import {LanguageSwitch} from "../LanguageSwitch";
import Screen from "../utils/Responsive";
import { useRef,useEffect } from "react";

export const Layout =  ({children,meta}) => {

  const ref = useRef()
  useEffect(() => {
    //ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/user/nnth/likes/1600x900")`)
  },[])

  const handleChangeBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/user/nnth/likes/1600x900?time=${(new Date()).getTime()}")`)
  }

  const handleRemoveBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    ref.current.setAttribute("style",`background-image: none`)
  }
  
  return (
    <>
    <Head meta={meta} />

    <div ref={ref} className={`body-decor`}>
    </div>

    <div className={`body-decor--text`}>
      <div className="flex flex-col">
        <a href="#" onClick={handleChangeBg} title="New Background">
          <i className="far fa-random"></i>
        </a>
        <a href="#" onClick={handleRemoveBg} className="mt-2" title="Remove Background">
          <i className="far fa-minus-circle"></i>
        </a>
      </div>
    </div>

    <div className="main-layout--wrapper glassmorphism">
      <div className={`main-layout`}>

        {/* Mobile / Tablet Navbar */}
        <Screen upto="md">
        <div className="pane-bottom">
          <Navbar />
        </div>
        </Screen>

        {/* Desktop Navbar */}
        <Screen from="lg">
        <div className="pane-left">
          <Navbar />
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
    </div>

    </>
  );
}