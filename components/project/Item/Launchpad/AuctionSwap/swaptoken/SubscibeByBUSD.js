import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useRIRContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import useStore from "@lib/useStore"
import { range } from "@utils/hooks/index"
import { current } from "tailwindcss/colors"
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
  const maxSelected = auctionSwapInfo.info.maxBuyPerAddress - auctionSwapInfo.order.totalItem

  useEffect(() => {

    setCurrentOrder([...auctionSwapInfo.order.detail])
  }, [])

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
          element.isEditing = true;
        }
        return element;
      });
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
  }

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          return response2.gt(0)
        } catch (error) {
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
      },
    })

  const resetApproved = async () => {
    await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, 0])
    await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, 0])
  }


  const adjustAuction = () => {

  }

  return (
    <>
      <div className="p-2 md:p-6">
        {!isApproved ? (
          <div className="flex flex-col text-center">
            <button className="btn relative w-full  md:w-1/2 mx-auto btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md"
              onClick={handleApprove}
            >
              Enable BUSD
            </button>
            <p className="pt-4">You must enable BUSD to bid</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="mb-4 text-2xs md:text-xs uppercase tracking-wide 
        flex border-b dark:border-opacity-40 border-gray-200 dark:border-gray-700">
              <div className="w-1/6 flex-shrink-0 pr-2">
                <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Boxes</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-2">
                <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">BUSD per box</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                <label className="mb-2 block tracking-wide font-medium opacity-70">Total (BUSD</label>
              </div>
              <div className="w-1/5 flex-shrink-0 pl-4 text-right">
                <label className="mb-2 block tracking-wide font-medium opacity-70">Position</label>
              </div>
            </div>

            {currentOrder.map(function (item) {
              return (
                <>
                  <div className="mb-4 flex items-center relative">
                    <div className="w-1/6 pr-2 flex-shrink-0">
                      {item.isEditing ? (
                        <>
                          <select id="box" name="amount" defaultValue={item.quantity} onChange={e => { handleChangeCurrentOrder(e, item.index, 'quantity') }} className="select-custom w-full ">
                            {/* remove '!rounded-l-none' if user doesn't have RIR */}
                            {Array(maxSelected).fill(null).map((_, i) => {
                              if (i + 1 > (auctionSwapInfo.info.maxBuyPerAddress - (totalItem))) return null
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

                    <div className="w-1/5 pl-2 flex-shrink-0">
                      {item.isEditing ? (
                        <>
                          <select id="news-order" className="select-custom  w-full " defaultValue={item.priceEach} onChange={e => { handleChangeCurrentOrder(e, item.index, 'price') }}>
                            {/* remove '!rounded-l-none' if user doesn't have RIR */}
                            {Array((auctionSwapInfo.info.maxBuyPerAddress)).fill(null).map((_, i) => {
                              return (
                                <option key={i} className="text-gray-300" value={auctionSwapInfo.info.startPrice + (i * 10)}>{auctionSwapInfo.info.startPrice + i * 10}</option>
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

                    <div className="w-1/5 pl-4  text-right">{item.priceEach * item.quantity}</div>

                    {/* <div className="w-1/5 pl-2 flex-shrink-0 text-right">
                      30<span className="opacity-60">/260 </span>
                    </div> */}
                    <BidRanking pool={pool} bid_value={item.priceEach}/>

                    {item.isEditing ? (
                      <button className={`text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 flex justify-center`}
                        onClick={e => { handleIncreaseBid(item.index)}}
                      >
                        <i className="fas fa-plus-circle mr-1"></i>Add bid
                      </button>

                    ) : (
                      <button className="ml-2 md:ml-4 flex-shrink-0 flex-grow btn btn-default !py-2 !text-md flex justify-center"
                        onClick={e => { handleChangeCurrentOrder(e, item.index, 'editing') }}
                      >
                        <i className="fas text-xs fa-pencil mr-1"></i> Adjust
                      </button>
                    )}

                  </div>

                </>
              )
            })}

            {totalItem < auctionSwapInfo.info.maxBuyPerAddress && (
              <>
                <div className="flex  items-center relative">
                  <div className="w-1/6 pr-2 flex-shrink-0">
                    <select id="box" name="amount" defaultValue={numberBox} onChange={handleChangeNumberBox} className="select-custom w-full ">
                      {/* remove '!rounded-l-none' if user doesn't have RIR */}
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
                      {/* remove '!rounded-l-none' if user doesn't have RIR */}
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

                  <BidRanking pool={pool} bid_value={priceBusd}/>

                  <button className={`text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 ${(numberBox == 0 || auctionSwapInfo.info.startPrice == 0) ? "disabled" : ""} flex justify-center`}
                    onClick={handleConfirm}
                  >
                    <i className="fas fa-plus-circle mr-1"></i>Add bid
                  </button>

                </div>
              </>
            )}


          </>
        )}
        {account === "0x82a0c5334F177649C48f1cC04245F57f4540148E" &&
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
        }
      </div>
    </>
  )
}
export default SubcribeByBUSD