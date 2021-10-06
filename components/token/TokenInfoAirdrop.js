import TokenInfoHeader from "./TokenInfoHeader";
import { useTranslation } from "next-i18next";
import { useEffect } from "react"

export default function TokenInfoAirdrop({tokenData, tokenInfo, airdrop}) {
    const {t, i18n} = useTranslation()
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widget.gleamjs.io/e.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        }
      });

    return (
        <div className="section section-coininfo--airdrop">

        <div className="grid grid-cols-1">

        {/* Post Header */}
        <div className="flex flex-col">

            <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />

            <div className="mt-4">
                <p>{airdrop?.description}</p>
                <a class="e-widget no-button" href={`https://gleam.io/${airdrop?.code}`} rel="nofollow" target="_blank" title={airdrop?.title}>{airdrop?.title}</a>
            </div>
        </div>
        </div>
        </div>
    )
}