import SubcribeByBUSD from "./swaptoken/SubscibeByBUSD"


const SwapTokensV2 = ({accountBalance,fetchAccountBalance,auctionSwapInfo,setStep,pool,project}) => {
  return (
    <>
      <SubcribeByBUSD auctionSwapInfo={auctionSwapInfo} project={project} pool={pool} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} setStep={setStep} />
    </>
  )
}
export default SwapTokensV2