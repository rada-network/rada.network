import "../styles/tw.css";
import "../styles/globals.css";
import "../styles/styles.css";

import { useWallet, UseWalletProvider } from "use-wallet";
import NextNprogress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie";
// import { Provider } from 'mobx-react'
import { StoreProvider, useStore } from "../lib/useStore";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { configure } from "mobx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { appWithTranslation } from "next-i18next";
import { getScreenName } from "../components/utils/Responsive";
import { Provider, useSession, signOut } from "next-auth/client";
import { useCookies } from "react-cookie";
import { PageStoreProvider, usePageStore } from "../lib/usePageStore";

function parseJwt(token) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

configure({
  enforceActions: "never",
});
export function getTokenState(token) {
  if (!token) {
    return { valid: false, needRefresh: true };
  }
  const decoded = parseJwt(token);
  if (!decoded) {
    return { valid: false, needRefresh: true };
  } else if (decoded.exp && Math.floor(Date.now() / 1000) + 300 > decoded.exp) {
    return { valid: false, needRefresh: true };
  } else {
    return { valid: true, needRefresh: false };
  }
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const store = useStore();
  const [session, loading] = useSession();
  const [cookies, setCookie,removeCookie] = useCookies(["access_token"]);
  const { dataStore, detailStore } = usePageStore();
  dataStore.lang = pageProps.lang || "vi";
  useEffect(() => {
    if (session) {
      const { valid } = getTokenState(session.access_token);
      if (valid) {
        store.user.update({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          access_token: session.access_token,
          walletAddress: "",
        });
        setCookie("access_token", session.access_token, {
          path: "/",
          maxAge: 24 * 7 * 3600,
        });
      } else {
        signOut(true).then(() => {
          removeCookie("access_token",{
            path: "/", expires: -1,
          });
        })
      }
    }
    return () => {};
  }, [session, store]);
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `${url} is a shallow store ${shallow} ${store.shallowInternal}`
      );
      if (shallow) {
        if (!store.shallowInternal) {
          detailStore.data = {};
          router.push(url, url);
        } else {
          //router.push(url,url)
          ga.pageview(url);
          store.setShallowConnect(false);
        }
      } else {
        ga.pageview(url);
        store.setShallowConnect(false);
      }
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // resize monitor, for responsive/device info
  useEffect(() => {
    const onResize = () => {
      // update body attribute for styling
      document.body.setAttribute(
        "data-screen",
        getScreenName(window.innerWidth)
      );
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <Component {...pageProps} />;
};
// Wrap everything in <UseWalletProvider />
const TokenRankingStore = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // const store = useStore(pageProps.initialState)

  return (
    <ThemeProvider attribute="class">
      <UseWalletProvider
        chainId={1}
        connectors={{
          // This is how connectors get configured
          portis: { dAppId: "my-dapp-id-123-xyz" },
          fortmatic: { apiKey: "formatic api key" },
          walletconnect: {
            rpcUrl:
              "https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c",
          },
          walletlink: {
            url: "https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c",
          },
        }}
      >
        <PageStoreProvider>
          <StoreProvider>
            <NextNprogress
              options={{ showSpinner: false }}
              color="#8B5CF6"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <CookiesProvider>
              <Provider session={pageProps.session}>
                <MyApp Component={Component} pageProps={pageProps} />
                ​
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </Provider>
            </CookiesProvider>
          </StoreProvider>
        </PageStoreProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(TokenRankingStore);
