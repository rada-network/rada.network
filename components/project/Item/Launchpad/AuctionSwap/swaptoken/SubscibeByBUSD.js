import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useRIRContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import BidRanking from "./BidRanking"

const SubcribeByBUSD = ({ pool, project, accountBalance, setStep, fetchAccountBalance, auctionSwapInfo }) => {
  const store = useStore()
  const { t } = useTranslation("launchpad")
  const { account } = useActiveWeb3React()
  const launchpadContract = useAuctionSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [numberBox, setNumberBox] = useState(0);
  const [priceBusd, setPriceBusd] = useState(auctionSwapInfo.info.startPrice);
  const [totalBusd, setTotalBusd] = useState(auctionSwapInfo.info.startPrice);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [globalEditing, setGlobalEditing] = useState(false);
  const maxSelected = auctionSwapInfo.info.maxBuyPerAddress - auctionSwapInfo.order.totalItem;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentOrder([...auctionSwapInfo.order.detail])
  }, [auctionSwapInfo.order.detail])

  useEffect(() => {
    let _totalItem = currentOrder.reduce(function (sum, value) {
      return sum + parseInt(value.quantity)
    }, 0)
    setTotalItem(_totalItem)
  }, [currentOrder])


  const handleChangeNumberBox = function (e) {
    setNumberBox(e.currentTarget.value)
    setTotalBusd(parseInt(e.currentTarget.value) * parseInt(priceBusd))
  }
  const handleChangePriceBusd = function (e) {
    setPriceBusd(e.currentTarget.value)
    setTotalBusd(parseInt(e.currentTarget.value) * parseInt(numberBox))
  }

  const handleChangeCurrentOrder = function (e, item, type) {
    if (type === "price") {
      const newCurrentOrder = currentOrder.map(element => {
        if (element.index === item) {
          element.priceEach = parseInt(e.currentTarget.value)
        }
        return element;
      });
      setCurrentOrder(newCurrentOrder)
    }
    if (type === "quantity") {
      const newCurrentOrder = currentOrder.map(element => {
        if (element.index === item) {
          element.quantity = parseInt(e.currentTarget.value)
        }
        return element;
      });
      setCurrentOrder(newCurrentOrder)
    }

    if (type === "editing") {
      const newCurrentOrder = currentOrder.map(element => {
        if (element.index === item) {
          element.isEditing = !element.isEditing;
          if (!element.isEditing) {
            element.priceEach = element.basePriceEach
            element.quantity = element.baseQuantity
          }
        }
        return element;
      });
      //setGlobalEditing(!globalEditing)
      setCurrentOrder(newCurrentOrder)
    }
  }

  const handleIncreaseBid = async function (bidIndex) {
    try {
      store.transaction.showTransaction(true, t("start transaction message"));
      let bid = currentOrder.filter((i) => {
        return i.index === bidIndex
      })[0]
      const tx = await callWithGasPrice(launchpadContract, 'increaseBid', [pool.id, bidIndex, bid.quantity, ethers.utils.parseEther(bid.priceEach.toString(), 0)])
      store.transaction.startTransaction(true, t("transaction started"));
      const receipt = await tx.wait()
      store.transaction.update(receipt.transactionHash);
      fetchAccountBalance()
    }
    catch (error) {
      if (!!error?.data?.message) {
        store.transaction.updateError(t(error?.data?.message?.replace("execution reverted: ", "").replace("ERC20: ", "")), true);
      }
      else if (!!error?.message) {
        store.transaction.updateError(t(error?.message), true);
      } else {
        store.transaction.updateError(t(error.toString().replace("execution reverted: ", "").replace("ERC20: ", "")), true);
      }
    }
    //setGlobalEditing(!globalEditing)
  }

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        setLoading(true)
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          setLoading(false)
          return response2.gt(0)
        } catch (error) {
          setLoading(false)
          return false
        }
      },
      onApprove: async (requireApprove) => {
        store.transaction.showTransaction(true, t("start transaction message"));
        const tx = callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256])
        store.transaction.startTransaction(true, t("transaction started"));
        return tx;
      },
      onApproveSuccess: async ({ receipt }) => {
        store.transaction.update(receipt.transactionHash);
      },
      onConfirm: () => {
        store.transaction.showTransaction(true, t("start transaction message"));
        const tx = callWithGasPrice(launchpadContract, 'placeBid', [pool.id, numberBox, ethers.utils.parseEther(priceBusd.toString())]);
        store.transaction.startTransaction(true, t("transaction started"));
        return tx;
      },
      onSuccess: async ({ receipt }) => {
        store.transaction.update(receipt.transactionHash);
        await fetchAccountBalance()
        store.updateLoadPoolContent((new Date()).getTime())
        //setGlobalEditing(false)
      },
    })

  const resetApproved = async () => {
    await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, 0])
    await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, 0])
  }

  const claimNftBox = () => {

  }

  if (loading) {
    return (
      <div className="flex my-4 justify-center items-center">
        <div className="mx-auto">
          <p className="relative mb-4">
            <span className="spinner-xl"></span>
          </p>
          <span className="text-xs mt-8">Please wait</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="">
        {!isApproved ? (
          <div className="flex flex-col text-center">
            <button className="btn !text-sm relative mx-auto btn-default btn-default-lg btn-primary" disabled="" id="swap-button" width="100%" scale="md"
              onClick={handleApprove}
            >
              Enable BUSD
            </button>
            <p className="mt-4 text-xs">Enable BUSD to start bidding</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="flex mb-4 text-2xs md:text-xs uppercase border-b border-gray-200 dark:border-gray-700">
              <div className="w-1/6 flex-shrink-0 pr-2">
                <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Boxes</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-2">
                <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">BUSD per Box</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                <label className="mb-2 block tracking-wide font-medium opacity-70">Total (BUSD)</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                <label className="mb-2 block tracking-wide font-medium opacity-70">Rank</label>
              </div>

              {auctionSwapInfo.info.ended && (
                <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                  <label className="mb-2 block tracking-wide font-medium opacity-70">Win quantity</label>
                </div>
              )}
              {!auctionSwapInfo.info.ended && (
                <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                  <label className="mb-2 block tracking-wide font-medium opacity-70"></label>
                </div>
              )}
            </div>

            {currentOrder.map(function (item) {
              return (
                <>
                  <div className="mb-4 flex items-center relative">

                    {/* Box quantity */}
                    <div className="w-1/6 pr-2 flex-shrink-0">
                      {item.isEditing ? (
                        <>
                          <select id="box" name="amount" defaultValue={item.quantity} onChange={e => { handleChangeCurrentOrder(e, item.index, 'quantity') }} className="select-custom w-full ">
                            {Array((auctionSwapInfo.info.maxBuyPerAddress)).fill(null).map(function (_, i) {
                              if (i + 1 < item.baseQuantity) return null
                              if (i + 1 > (auctionSwapInfo.info.maxBuyPerAddress - (totalItem - item.quantity))) return null
                              return (
                                <option key={i} className="text-gray-300" value={(i + 1)}>{i + 1}</option>
                              )
                            })}
                          </select>
                        </>
                      ) : (
                        <>
                          {item.quantity}
                        </>
                      )}
                    </div>

                    {/* Price quantity */}
                    <div className="w-1/5 pl-2 flex-shrink-0">
                      {item.isEditing ? (
                        <>
                          <select id="news-order" className="select-custom  w-full " defaultValue={item.priceEach} onChange={e => { handleChangeCurrentOrder(e, item.index, 'price') }}>
                            {item.select.map((_, i) => {
                              return (
                                <option key={i} className="text-gray-300" value={_}>{_}</option>
                              )
                            })}
                          </select>
                        </>
                      ) : (
                        <>
                          {item.priceEach}
                        </>
                      )}
                    </div>

                    {/* Total BUSD */}
                    <div className="w-1/5 pl-4  text-right">{item.priceEach * item.quantity}</div>
                    {/* Total Ranking */}
                    <BidRanking pool={pool} bid_value={item.priceEach} bid_index={item.index} />

                    {/* Add button */}
                    {!auctionSwapInfo.info.ended && (
                      <>
                        {item.isEditing ? (
                          <>
                            <div className="ml-2 md:ml-4 w-1/5 flex justify-evenly space-x-2">
                              <button className={`!py-2 flex-grow flex-shrink-0 btn btn-default`}
                                onClick={e => { handleChangeCurrentOrder(e, item.index, 'editing') }}>
                                {/* <i className="fas fa-times-circle mr-1"></i>   */}
                                <span className="btn--text">Cancel</span>
                              </button>
                              <button className={`!py-2 btn btn-primary px-2 w-full justify-center`}
                                onClick={e => { handleIncreaseBid(item.index) }}>
                                {/* <i className="fas fa-plus-circle mr-1"></i> */}
                                <span className="btn--text">Adjust</span>
                              </button>
                            </div>

                          </>

                        ) : (
                          <div className="ml-2 md:ml-4 w-1/5">
                            <button className={`!py-2 btn btn-default w-full` + (globalEditing ? " disabled" : "")}
                              onClick={e => { handleChangeCurrentOrder(e, item.index, 'editing') }}
                            >
                              {/* <i className="fas text-xs fa-pencil mr-1"></i> */}
                              <span className="btn--text">Adjust Bid</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Win quantity */}
                    {auctionSwapInfo.info.ended &&
                      <div className="w-1/5 pl-4  text-right">
                        {item.winQuantity}
                      </div>
                    }
                  </div>

                </>
              )
            })}

            {totalItem < auctionSwapInfo.info.maxBuyPerAddress && !auctionSwapInfo.info.ended && (
              <>
                <div className="flex  items-center relative">
                  <div className="w-1/6 pr-2 flex-shrink-0">
                    <select id="box" name="amount" defaultValue={numberBox} onChange={handleChangeNumberBox} className="select-custom w-full ">
                      <option className="text-gray-300" value="0">---</option>
                      {Array(maxSelected).fill(null).map((_, i) => {
                        if (i + 1 > (auctionSwapInfo.info.maxBuyPerAddress - (totalItem))) return null
                        return (
                          <option key={i} className="text-gray-300" value={(i + 1)}>{i + 1}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="w-1/5 pl-2 flex-shrink-0">
                    <select id="news-order" className="select-custom  w-full " defaultValue={priceBusd} onChange={e => { handleChangePriceBusd(e) }}>
                      {Array(10).fill(null).map((_, i) => {
                        return (
                          <option key={i} className="text-gray-300" value={auctionSwapInfo.info.startPrice + (i * 10)}>{auctionSwapInfo.info.startPrice + i * 10}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="w-1/5 pl-4 text-right">
                    {totalBusd}
                  </div>
                  <BidRanking pool={pool} bid_value={priceBusd} bid_index={-1} />
                  {auctionSwapInfo.info.ended ? null : (
                    <div className="w-1/5">
                      <button className={`text-sm ml-2 md:ml-4 py-2 btn btn-primary px-2 w-full ${(globalEditing || numberBox == 0 || auctionSwapInfo.info.startPrice == 0) ? "disabled" : ""} flex justify-center`}
                        onClick={handleConfirm}>
                        Add bid
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
        {auctionSwapInfo.info.ended && auctionSwapInfo.stat.totalSold > 0 && (
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`}
            onClick={claimNftBox}>
            {t("Claim")}
          </button>
        )}
        {/* {account === "walletaddress" &&
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
        } */}
      </div>
    </>
  )
}
export default SubcribeByBUSD