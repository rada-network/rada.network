import { Head } from "../Head";
import { Topbar } from "../Topbar";

import dynamic from "next/dynamic";

import Screen from "../utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../lib/usePageStore";

const Navbar = dynamic(import("../Navbar"));
const Profile = dynamic(import("../Profile"));
const ThemeSwitch = dynamic(import("../ThemeSwitch"));
const LanguageSwitch = dynamic(import("../LanguageSwitch"));

export const StaticLayout = observer(({ children, meta }) => {
  const { dataStore, detailStore } = usePageStore();
  return (
    <>
      <Head meta={meta} />

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
                <LanguageSwitch dataStore={dataStore} />
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </Screen>

        <div className={`pane-center scrollbar`}>
          <Screen upto="md">
            <div className="pane-center--top">
              {/* <Tabbar /> */}
              <Topbar />
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
});
