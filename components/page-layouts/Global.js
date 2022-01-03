import { Head } from "../Head";

import dynamic from "next/dynamic";

import Screen from "../utils/Responsive";

const Navbar = dynamic(import("../Navbar"));
const Profile = dynamic(import("../Profile"));
const ThemeSwitch = dynamic(import("../ThemeSwitch"));
const LanguageSwitch = dynamic(import("../LanguageSwitch"));
const BackgroundWrapper = dynamic(import("./BackgroundWrapper"));
const TransactionModal = dynamic(import("./TransactionModal"));
const ConnectWalletModal = dynamic(import("./ConnectWalletModal"));

const Topbar = dynamic(() =>
  import("../Topbar").then(
    (module) => module.Topbar
  )
);

const Layout = ({ children, meta, bgImage, extraClass }) => {
  return (
    <>
      <Head meta={meta} />
      <BackgroundWrapper image={bgImage} />
      <ConnectWalletModal />
      <TransactionModal />
      <div className={`main-layout--wrapper ${extraClass || ""}`}>
        <div className={`main-layout`}>
          {/* Mobile / Tablet Navbar */}
          <Screen upto="md" wrap="pane-bottom">
            <div className="pane-bottom">
              <Navbar />
            </div>
          </Screen>

          {/* Desktop Navbar */}
          <Screen from="lg" wrap="pane-left">
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

            <div className="pane-center--main">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
