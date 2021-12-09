import { useEffect, useState } from "react";
import { getTokenById } from "../../data/query/getTokenById";
import { TrendingStore } from "../../lib/store";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber";
import { useTranslation } from "next-i18next";
import TokenInfoHeader from "./TokenInfoHeader";
import { usePageStore } from "../../lib/usePageStore";
import TokenInfoGeneral from "./TokenInfoGeneral";
import TokenInfoTeam from "./TokenInfoTeam";
import TokenInfoAirdrop from "./TokenInfoAirdrop";
import TokenInfoInvest from "./TokenInfoInvest";
import { useStore } from "../../lib/useStore";

const TokenInfo = ({ tokenId }) => {
  const [subTabName, setSubTabName] = useState("information");

  const { detailStore } = usePageStore();
  const trendingStore = new TrendingStore();
  const [tokenData, setTokenData] = useState({});
  const [usdCoinInfo, setUSDCoinInfo] = useState({});
  const [btcCoinInfo, setBTCCoinInfo] = useState({});
  const { t, i18n } = useTranslation();

  const store = useStore();
  const access_token = store.user.access_token;

  const tokenInfo = detailStore?.data?.tokens?.find(
    (t) => t.symbol === tokenId
  );
  useEffect(() => {
    tokenInfo &&
      getTokenById({ id: tokenInfo?.slug, lang: i18n.language }).then(function (
        res
      ) {
        setTokenData(res.data.tokenById);
        getCoinInfo(res.data.tokenById?.id);
      });
  }, [tokenInfo]);

  // detect subtab
  useEffect(() => {
    const arr = window.location.hash.substr(1).split("/");
    if (arr.length > 1) {
      // set subtab
      setSubTabName(arr[1]);
    }
  }, []);

  const getCoinInfo = async (fsym) => {
    await fetch(`/api/coin-info?fsym=${fsym}&tsym=USD`)
      .then((response) => response.json())
      .then((data) => setUSDCoinInfo(data.Data));

    await fetch(`/api/coin-info?fsym=${fsym}&tsym=BTC`)
      .then((response) => response.json())
      .then((data) => setBTCCoinInfo(data.Data));
  };

  const symbol = tokenInfo?.symbol.toLowerCase();
  // find active airdrop
  const airdrop = tokenData?.airdrop?.find((ad) => ad.status == "published");
  // find active invest
  const investCampaign = tokenData?.invest_campaign?.find(
    (ic) => ic.status == "published"
  );

  return (
    <>
      <div className="tabbar-sub page-subtabs">
        <div className="tabbar-sub--main">
          <a
            href={`#${symbol}`}
            className={`tab-item ${
              subTabName === "information" ? "tab-item--active" : ""
            }`}
            onClick={() => setSubTabName("information")}
          >
            Overview
          </a>

          <a
            href={`#${symbol}/team`}
            className={`tab-item ${
              subTabName === "team" ? "tab-item--active" : ""
            }`}
            onClick={() => setSubTabName("team")}
          >
            {t("team & backers")}
          </a>

          {/* <a href={`#${symbol}/more-articles`} className={`tab-item ${subTabName === 'more-article' ?'tab-item--active':'' } disabled`} onClick={()=>setSubTabName('more-articles')}>
          More Articles
        </a> */}

          {airdrop && (
            <a
              href={`#${symbol}/airdrop`}
              className={`tab-item ${
                subTabName === "airdrop" ? "tab-item--active" : ""
              }`}
              onClick={() => setSubTabName("airdrop")}
            >
              <span className="icon mr-1">
                <i className="fa-duotone fa-gift"></i>
              </span>
              {t("Airdrop")}
            </a>
          )}

          {access_token && investCampaign && (
            <a
              href={`#${symbol}/invest`}
              className={`tab-item ${
                subTabName === "invest" ? "tab-item--active" : ""
              }`}
              onClick={() => setSubTabName("invest")}
            >
              Invest
            </a>
          )}
        </div>
      </div>

      {subTabName === "information" && (
        <TokenInfoGeneral
          tokenData={tokenData}
          usdCoinInfo={usdCoinInfo}
          btcCoinInfo={btcCoinInfo}
          tokenInfo={tokenInfo}
        />
      )}
      {subTabName === "team" && (
        <TokenInfoTeam tokenData={tokenData} tokenInfo={tokenInfo} />
      )}
      {subTabName === "airdrop" && (
        <TokenInfoAirdrop
          tokenData={tokenData}
          tokenInfo={tokenInfo}
          airdrop={airdrop}
        />
      )}
      {subTabName === "invest" && (
        <TokenInfoInvest
          tokenData={tokenData}
          tokenInfo={tokenInfo}
          usdCoinInfo={usdCoinInfo}
          btcCoinInfo={btcCoinInfo}
          investCampaign={investCampaign}
        />
      )}
    </>
  );
};

export default TokenInfo;
