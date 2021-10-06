import { useEffect,useState } from "react";
import { getTokenById } from "../../data/query/getTokenById";
import { TrendingStore } from "../../lib/store";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber"
import { useTranslation } from "next-i18next";
import TokenInfoHeader from "./TokenInfoHeader";
import { usePageStore } from "../../lib/usePageStore";
import TokenInfoGeneral from "./TokenInfoGeneral";
import TokenInfoTeam from "./TokenInfoTeam";
import TokenInfoAirdrop from "./TokenInfoAirdrop";


const TokenInfo = ({tokenId, subTabName})=>{
  const {detailStore} = usePageStore()
  const trendingStore = new TrendingStore()
  const [tokenData, setTokenData] = useState({})
  const [usdCoinInfo, setUSDCoinInfo] = useState({})
  const [btcCoinInfo, setBTCCoinInfo] = useState({})
  const {t, i18n} = useTranslation()
  const tokenInfo = detailStore?.data?.tokens?.find(t => t.symbol === tokenId)
  useEffect(() => {
   tokenInfo && getTokenById({id : tokenInfo?.slug, lang: i18n.language}).then(function (res) {
   setTokenData(res.data.tokenById)
   getCoinInfo(res.data.tokenById?.id)
  })
  }, [tokenInfo])

  const getCoinInfo =  async (fsym)=>{
    await fetch(`/api/coin-info?fsym=${fsym}&tsym=USD`).then(response => response.json())
    .then(data => setUSDCoinInfo(data.Data));

    await fetch(`/api/coin-info?fsym=${fsym}&tsym=BTC`).then(response => response.json())
    .then(data => setBTCCoinInfo(data.Data));
  }

  return (
    <>
    { subTabName ==='information' && <TokenInfoGeneral tokenData={tokenData} usdCoinInfo={usdCoinInfo} btcCoinInfo={btcCoinInfo} tokenInfo={tokenInfo} /> }
    { subTabName ==='team' && <TokenInfoTeam tokenData={tokenData} tokenInfo={tokenInfo} /> }
    { subTabName ==='airdrop' && <TokenInfoAirdrop tokenData={tokenData} tokenInfo={tokenInfo} /> }
    </>
  )


}

export default TokenInfo