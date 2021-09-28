import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";

import ThemeSwitch from "../ThemeSwitch"

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../LanguageSwitch";
import Screen from "../utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../lib/usePageStore";

export const StaticLayout = observer(({children,meta}) => {
  const {dataStore,detailStore} = usePageStore()
  return (
    <>
      <Head meta={meta} />

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

        <div className={`pane-center scrollbar`}>
          <Screen upto="md">
            <div className="pane-center--top">
              {/* <Tabbar /> */}
              <Topbar dataStore={dataStore} />
            </div>
          </Screen>

          <div className="pane-center--main w-full">

            <div className="page page-full scrollbar">

              <div className="page-full--inner">

                {/* <div className="page-title">
                  Your Profile
                </div> */}
                {children}
                
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
})
