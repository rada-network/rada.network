import '../styles/tw.css'
import '../styles/globals.css'
import '../styles/styles.css'

import {useWallet, UseWalletProvider} from 'use-wallet'
import NextNprogress from 'nextjs-progressbar';
import { CookiesProvider } from 'react-cookie';
// import { Provider } from 'mobx-react'
import {StoreProvider, useStore} from "../lib/useStore"
import {ThemeProvider} from 'next-themes';


import {configure} from "mobx"
import {useEffect} from "react";
import {useRouter} from "next/router";
import * as ga from '../lib/ga'
import { appWithTranslation } from 'next-i18next';
import { getScreenName } from '../components/utils/Responsive';

configure({
  enforceActions: "never",
})

const MyApp = appWithTranslation(({Component, pageProps}) => {
  const router = useRouter()
  const store = useStore()
  useEffect(() => {
    const handleRouteChange = (url,{shallow}) => {

      if (shallow && !store.shallowInternal){
        router.push(url,url)
      }
      else{
        ga.pageview(url)
        store.setShallowConnect(false)
      }
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // resize monitor, for responsive/device info
  useEffect(() => {
      const onResize = () => {
          // update body attribute for styling
          document.body.setAttribute('data-screen', getScreenName(window.innerWidth))
      }
      onResize()
      window.addEventListener("resize", onResize)

      return () => {
          window.removeEventListener("resize", onResize);
        }
  }, [])

  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
})

// Wrap everything in <UseWalletProvider />
const TokenRankingStore = ({Component, pageProps}) => {
  // const store = useStore(pageProps.initialState)

  return (
    <ThemeProvider attribute="class">
      <UseWalletProvider
        chainId={1}
        connectors={{
          // This is how connectors get configured
          portis: {dAppId: 'my-dapp-id-123-xyz'},
          fortmatic: {apiKey: 'formatic api key'},
          walletconnect: {rpcUrl: 'https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c'},
          walletlink: {url: 'https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c'},
        }}
      >
        <StoreProvider>
          <NextNprogress
            options={{showSpinner: false}}
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <MyApp Component={Component} pageProps={pageProps}/>
        </StoreProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default TokenRankingStore
