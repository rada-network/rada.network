import '../styles/tw.css'
import '../styles/globals.css'
import '../styles/styles.css'
import { useWallet, UseWalletProvider } from 'use-wallet'
import NextNprogress from 'nextjs-progressbar';
// import { Provider } from 'mobx-react'
import { StoreProvider } from "../lib/useStore"

import { configure } from "mobx"

configure({
  enforceActions: "never",
})

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

// Wrap everything in <UseWalletProvider />
const TokenRankingStore = ({ Component, pageProps }) => {
  // const store = useStore(pageProps.initialState)

  return (
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
      fortmatic: { apiKey: 'formatic api key' },
      walletconnect: { rpcUrl: 'https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c' },
      walletlink: { url: 'https://mainnet.infura.io/v3/92d8c48b74034b8cb45aa0af1bc30d2c' },
  }}
  >
    <StoreProvider>
      <NextNprogress
        options={{ showSpinner: false }}
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <MyApp Component={Component} pageProps={pageProps} />
    </StoreProvider>
  </UseWalletProvider>
)}

export default TokenRankingStore