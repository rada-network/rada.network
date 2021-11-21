import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";

import ThemeSwitch from "../ThemeSwitch"
import Profile from "../Profile";

import {LanguageSwitch} from "../LanguageSwitch";
import Screen from "../utils/Responsive";
import { useRef,useEffect } from "react";
import BackgroundWrapper from "./BackgroundWrapper";

export const Layout =  ({children,meta,bgImage,extraClass}) => {
  return (
    <>
    <Head meta={meta} />


    <BackgroundWrapper image={bgImage} />

    <div className={`main-layout--wrapper ${extraClass || ''}`}>
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