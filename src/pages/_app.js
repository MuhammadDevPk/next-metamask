import { WalletProvider } from "@/contexts/useWallet"

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>

    // /comemnt

    
  )
}
