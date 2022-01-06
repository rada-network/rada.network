
import "../styles/tw.css";
import "../styles/globals.css";
import "../styles/styles.css";

import(/* webpackPrefetch: true */ '../public/vendors/font-awesome6-pro/css/all.min.css');
import(/* webpackPrefetch: true */ '../public/vendors/cryptocurrency-icons/styles/cryptofont.nnth.css');

import { StoreProvider, useStore } from "../lib/useStore";
import { configure } from "mobx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { appWithTranslation } from "next-i18next";
import { getScreenName } from "../components/utils/Responsive";
import { Provider, useSession, signOut } from "next-auth/client";
import { useCookies, CookiesProvider } from "react-cookie";
import { PageStoreProvider, usePageStore } from "../lib/usePageStore";
import { ThemeProvider } from "next-themes";

import dynamic from "next/dynamic";

const Nprogress = dynamic(() => import("@components/Nprogress"));
const Toast = dynamic(() => import("@components/Toast"));

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

const MyApp = function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore();
  const [session, loading] = useSession();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const { dataStore, detailStore } = usePageStore();
  dataStore.lang = pageProps.lang || pageProps.locale || "vi";

  // Get ref send to cookie
  const ref = router.query?.ref ?? "";
  if (ref != "") {
    setCookie("ref", ref, {
      path: "/",
      maxAge: 24 * 7 * 3600,
    });
  }

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
          removeCookie("access_token", {
            path: "/",
            expires: -1,
          });
          removeCookie("ref", {
            path: "/",
            expires: -1,
          });
        });
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
          //detailStore.data = {};
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

  return (
    <Component {...pageProps} />
  );
};

// Wrap everything in <UseWalletProvider />
const TokenRankingStore = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // const store = useStore(pageProps.initialState)

  return (
    <ThemeProvider attribute="class">
      <PageStoreProvider>
        <StoreProvider>
          <Nprogress />
          <CookiesProvider>
            <Provider session={pageProps.session}>
              <MyApp Component={Component} pageProps={pageProps} />
              <Toast />
            </Provider>
          </CookiesProvider>
        </StoreProvider>
      </PageStoreProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(TokenRankingStore);
