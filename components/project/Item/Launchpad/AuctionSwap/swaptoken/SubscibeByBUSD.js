import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2,useRIRContract} from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import useStore from "@lib/useStore"
import { range } from "@utils/hooks/index"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,auctionSwapInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()
  const launchpadContract = useAuctionSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberBox,setNumberBox] = useState(1);
  const [priceBusd,setPriceBusd] = useState(auctionSwapInfo.info.startPrice);
  const [totalBusd,setTotalBusd] = useState(auctionSwapInfo.info.startPrice);
  const [currentOrder,setCurrentOrder] = useState([]);
  const [totalItem,setTotalItem] = useState(0);
  const maxSelected = auctionSwapInfo.info.maxBuyPerAddress - auctionSwapInfo.order.totalItem

  useEffect(() => {
    setCurrentOrder([...auctionSwapInfo.order.detail])
  },[])

  useEffect(() => {
    let _totalItem = currentOrder.reduce(function(sum,value){
      return sum + parseInt(value.quantity)
    },0)
    setTotalItem(_totalItem)
  },[currentOrder])

  
  const handleChangeNumberBox = function(e){
    setNumberBox(e.currentTarget.value)
    setTotalBusd(parseInt(e.currentTarget.value)*parseInt(priceBusd))
  }
  const handleChangePriceBusd = function(e){
    setPriceBusd(e.currentTarget.value)
    setTotalBusd(parseInt(e.currentTarget.value)*parseInt(numberBox))
  }

  const handleChangeCurrentOrder = function(e,item,type){
    if (type === "price"){
      const newCurrentOrder = currentOrder.map(element => {
        if (element.index === item) {
          element.priceEach = parseInt(e.currentTarget.value)
        }
        return element;
      });
      setCurrentOrder(newCurrentOrder)
    }
    if (type === "quantity"){
      const newCurrentOrder = currentOrder.map(element => {
        if (element.index === item) {
          element.quantity = parseInt(e.currentTarget.value)
        } 
        return element;
      });
      setCurrentOrder(newCurrentOrder)
    }
  }

  const handleIncreaseBid = async function(bidIndex){
    try{
      store.transaction.showTransaction(true, t("start transaction message"));
      let bid = currentOrder.filter((i) => {
        return i.index === bidIndex
      })[0]
      const tx = await callWithGasPrice(launchpadContract, 'increaseBid', [pool.id,bidIndex,bid.quantity,ethers.utils.parseEther(bid.priceEach.toString(),0)])
      store.transaction.startTransaction(true, t("transaction started"));
      const receipt = await tx.wait()
      store.transaction.update(receipt.transactionHash);
      fetchAccountBalance()
    }
    catch (error) {
      if (!!error?.data?.message){
        store.transaction.updateError(t(error?.data?.message?.replace("execution reverted: ","").replace("ERC20: ","")), true);
      }
      else if (!!error?.message){
        store.transaction.updateError(t(error?.message), true);
      } else {
        store.transaction.updateError(t(error.toString().replace("execution reverted: ","").replace("ERC20: ","")), true);
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
      const tx = callWithGasPrice(launchpadContract, 'placeBid', [pool.id,numberBox,ethers.utils.parseEther(priceBusd.toString())]);
      store.transaction.startTransaction(true, t("transaction started"));
      return tx;
    },
    onSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
      await fetchAccountBalance()
      store.updateLoadPoolContent((new Date()).getTime())
    },
  })
  return (
    <>
      <div className="global-padding">
        <div className="mb-4 p2-4 flex border-b dark:border-opacity-40 border-gray-200 dark:border-gray-700">
          <div className="w-1/5 flex-shrink-0 pr-2">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Boxes</label>
          </div>
          <div className="w-2/5 flex-shrink-0 pl-2">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">Price (BUSD)</label>
          </div>
          
        </div>
        {currentOrder.map(function(item){
          return (
            <div className="mb-4 flex relative">
              <div className="w-1/5 pr-2 flex-shrink-0">
                <select className="select-custom w-full" value={item.quantity} onChange={e => {handleChangeCurrentOrder(e,item.index,'quantity')}}>
                  {/* remove '!rounded-l-none' if user doesn't have RIR */}
                  {Array((auctionSwapInfo.info.maxBuyPerAddress)).fill(null).map(function(_, i){
                    if (i + 1 < item.baseQuantity) return null
                    if (i + 1 > (auctionSwapInfo.info.maxBuyPerAddress - (totalItem - item.quantity))) return null
                    return (
                      <option key={i} className="text-gray-300" value={(i+1)}>{i+1}</option>
                    )
                  })}
                </select>
              </div>
              <div className="w-2/5 pl-2 flex-shrink-0">
                <select id={"old-order"+item.index} className="select-custom  w-full" value={item.priceEach} onChange={e => {handleChangeCurrentOrder(e,item.index,'price')}}>
                  {item.select.map((_, i) => {
                    return (
                      <option key={i} className="text-gray-300" value={_}>{_}</option>
                    )
                  })}
                </select>          
              </div>
              <button onClick={e => { handleIncreaseBid(item.index)}} className="ml-4 w-2/5 flex-grow btn btn-primary px-2 flex justify-center">
                <i className="fas fa-check-circle mr-1"></i> Increase
              </button>
            </div>
          )
        })}
        

        {totalItem < auctionSwapInfo.info.maxBuyPerAddress && <div className="mb-4 flex relative">
          <div className="w-1/5 pr-2 flex-shrink-0">
            <select id="box" name="amount" defaultValue={numberBox} onChange={handleChangeNumberBox} className="select-custom w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              {Array(maxSelected).fill(null).map((_, i) => {
                if (i + 1 > (auctionSwapInfo.info.maxBuyPerAddress - (totalItem))) return null
                return (
                  <option key={i} className="text-gray-300" value={(i+1)}>{i+1}</option>
                )
              })}
            </select>
          </div>
          <div className="w-2/5 pl-2 flex-shrink-0">
            <select id="news-order" className="select-custom  w-full " defaultValue={priceBusd} onChange={e => {handleChangePriceBusd(e)}}>
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              {Array(10).fill(null).map((_, i) => {
                return (
                  <option key={i} className="text-gray-300" value={auctionSwapInfo.info.startPrice + (i*10)}>{auctionSwapInfo.info.startPrice+i*10}</option>
                )
              })}
            </select>          
          </div>
          <button className="ml-4 w-2/5 flex-grow btn btn-primary px-2 disabled flex justify-center">
            <i className="fas fa-plus-circle mr-1"></i> Add</button>
        </div>
        }
        
        
        <div className="mb-4 flex gap-4 items-center py-4 border-b border-t dark:border-opacity-40 border-gray-200 dark:border-gray-700">
          <div className="w-1/2">
           Total
          </div>
          <div className="w-1/2 text-lg text-right font-semibold">
            {totalBusd} BUSD       
          </div>
        </div>
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        {totalItem < auctionSwapInfo.info.maxBuyPerAddress && <div className="mt-4  grid grid-cols-2 gap-4"> 
          <div className="flex-shrink-0 flex-grow">
            <button className={`btn !text-sm relative w-full btn-default btn-default-lg btn-purple` + (isApproved ? " disabled" : "")} onClick={handleApprove} width="100%" scale="md">
              {isApproving && <span className="spinner" />}
              {isApproved && <span className="button-compact-body--icon--text" ><CheckSvg></CheckSvg></span>}
              {isApproving && 
              <>{t("Approving Contract")}</> 
              }
              {isApproved && 
              <>{t("Approved Contract")} BUSD</> 
              }
              {!isApproving && !isApproved &&
              <>{t("Approve Contract")} BUSD</>
              }
            </button>
          </div>
          <div className="flex-shrink-0 flex-grow">
            <button className={`btn !text-sm relative w-full btn-default btn-default-lg btn-purple` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" width="100%" scale="md">
              {isConfirming && <span className="spinner" />}
              {isConfirming ? <>{t("Place Bid")}</> : <>{t("Add Bid")}</>}
            </button>
          </div>
        </div>
        }
        <div className="mt-4">
          {auctionSwapInfo.order.total > 0 &&
          <button className="btn btn-default btn-default-lg w-full mt-2" onClick={e => {setStep(31)}} disabled="" id="cancel" width="100%" scale="md">
          {t("Back")}
          </button>
          }
        </div>
      </div>

    </>
  )
}
export default SubcribeByBUSD