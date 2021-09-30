import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";

import ThemeSwitch from "../ThemeSwitch"

import {LanguageSwitch} from "../LanguageSwitch";
import Screen from "../utils/Responsive";

export const Layout =  ({children,meta}) => {
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
        <Navbar />
      </div>
      </Screen>

      {/* Desktop Navbar */}
      <Screen from="lg">
      <div className="pane-left">
        <Navbar />
        <div className="pane-left--bottom">
          <LanguageSwitch />
          <ThemeSwitch />
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

    </>
  );
}