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
    ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/random/1600x900")`)
  },[])
  const handleChangeBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/random/1600x900?time=${(new Date()).getTime()}")`)
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
      <p className="mb-1">&copy; Photo from Unsplash</p>
      <div className="flex">
        <a href="#" onClick={handleChangeBg}><i className="far fa-random"></i> New Photo</a>
        <a href="#" onClick={handleRemoveBg} className="ml-2"><i className="far fa-minus-circle"></i> Remove</a>
      </div>
    </div>

    <div className="main-layout--wrapper">
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