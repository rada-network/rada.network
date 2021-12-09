import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import dynamic from "next/dynamic";
const TokenInfoHeader = dynamic(import("./TokenInfoHeader"));

export default function TokenInfoAirdrop({ tokenData, tokenInfo, airdrop }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.gleamjs.io/e.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  return (
    <div className="section section-coininfo--airdrop">
      <div className="grid grid-cols-1">
        {/* Post Header */}
        <div className="flex flex-col">
          {/* <TokenInfoHeader tokenData={tokenData} token={tokenInfo} /> */}

          <div className="text-center max-w-lg w-full mx-auto">
            <div className="flex justify-between items-center w-full">
              <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />
              <h2 className="mb-3 text-yellow-500 font-semibold">Airdrop</h2>
            </div>

            <div
              className=""
              dangerouslySetInnerHTML={{ __html: airdrop?.description }}
            ></div>
          </div>

          <div className="mt-4">
            <a
              class="e-widget no-button"
              href={`https://gleam.io/${airdrop?.code}`}
              rel="nofollow"
              target="_blank"
              title={airdrop?.title}
            >
              {airdrop?.title}
            </a>
          </div>

          {/* <div className="post-content max-w-lg w-full mx-auto mt-8 text-sm">
                <p>Fill in the airdrop form and leave your BSC address. The form will be available on https://coinmarketcap.com/currencies/forward-protocol/ once the event starts.</p>

                <p>DISCLAIMER: Forward Protocol is responsible for selecting the winning participants who completed all the required steps for the airdrop campaign and the distribution of the tokens. A list detailing the winners will be announced on the 15th of Oct, 2021 on Forward Protocol's twitter account. Forward Protocol will proceed with the airdrop distribution a week after TGE.</p>
              </div> */}
        </div>
      </div>
    </div>
  );
}
