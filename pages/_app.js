import '../styles/tw.css'
import '../styles/globals.css'
import '../styles/styles.css'
import { useWallet, UseWalletProvider } from 'use-wallet'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Wrap everything in <UseWalletProvider />
export default ({ Component, pageProps }) => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
      fortmatic: { apiKey: 'formatic api key' },
      walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      walletlink: { url: 'https://mainnet.eth.aragon.network/' },
  }}
  >
    <MyApp Component={Component} pageProps={pageProps} />
  </UseWalletProvider>
)