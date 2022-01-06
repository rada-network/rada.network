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
      <div className="p-2 md:p-6">
        {/* <div className="flex flex-col text-center">
          <button className="btn relative w-full  md:w-1/2 mx-auto btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            Enable BUSD
          </button>  
          <p className="pt-4">You must enable BUSD to bid</p>
        </div> */}
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
        <div className="mb-4 flex items-center relative">
          <div className="w-1/6 pr-2 flex-shrink-0">
            4
          </div>
          <div className="w-1/5 pl-2 flex-shrink-0">
           100      
          </div> 
          <div className="w-1/5 pl-4  text-right">400</div>
          <div className="w-1/5 pl-2 flex-shrink-0 text-right">
           30<span className="opacity-60">/260 </span>     
          </div>
          <button className="ml-2 md:ml-4 flex-shrink-0 flex-grow btn btn-default !py-2 !text-md flex justify-center">
            <i className="fas text-xs fa-pencil mr-1"></i> Adjust
          </button>
        </div>

        <div className="flex mb-4  items-center relative">
          <div className="w-1/6 pr-2 flex-shrink-0">
            <select id="box" name="amount" className="select-custom w-full ">
              <option className="text-gray-300">1</option>
              <option className="text-gray-300">2</option>
              <option className="text-gray-300">3</option>
              <option className="text-gray-300" selected>4</option>
              <option className="text-gray-300">5</option>
              <option className="text-gray-300">6</option>
              <option className="text-gray-300">7</option>
              <option className="text-gray-300">8</option>
              <option className="text-gray-300">9</option>
              <option className="text-gray-300">10</option>
            </select>
          </div>
          <div className="w-1/5 pl-2 flex-shrink-0">
            <select id="rir" name="rir" className="select-custom  w-full ">
              <option className="text-gray-300" selected>Price</option>
              <option className="text-gray-300">100</option>
              <option className="text-gray-300" selected>200</option>
              <option className="text-gray-300">300</option>
              <option className="text-gray-300">400</option>
              <option className="text-gray-300">500</option>
              <option className="text-gray-300">600</option>
              <option className="text-gray-300">700</option>
              <option className="text-gray-300">800</option>
              <option className="text-gray-300">900</option>
              <option className="text-gray-300">1000</option>
            </select>          
          </div>
          <div className="w-1/5 pl-2 text-right">800</div>
          <div className="w-1/5 pl-2 flex-shrink-0 text-right">
           45<span className="opacity-60">/260 </span>     
          </div>
          <button className="text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 flex justify-center">
            <i className="fas fa-plus-circle mr-1"></i>Add bid
          </button>
        </div>

        <div className="flex  items-center relative">
          <div className="w-1/6 pr-2 flex-shrink-0">
            <select id="box" name="amount" className="select-custom w-full ">
              <option className="text-gray-300" selected>--</option>
              <option className="text-gray-300">1</option>
              <option className="text-gray-300">2</option>
              <option className="text-gray-300">3</option>
              <option className="text-gray-300">4</option>
              <option className="text-gray-300">5</option>
              <option className="text-gray-300">6</option>
              <option className="text-gray-300">7</option>
              <option className="text-gray-300">8</option>
              <option className="text-gray-300">9</option>
              <option className="text-gray-300">10</option>
            </select>
          </div>
          <div className="w-1/5 pl-2 flex-shrink-0">
            <select id="rir" name="rir" className="select-custom  w-full ">
              <option className="text-gray-300" selected>Price</option>
              <option className="text-gray-300">100</option>
              <option className="text-gray-300">200</option>
              <option className="text-gray-300">300</option>
              <option className="text-gray-300">400</option>
              <option className="text-gray-300">500</option>
              <option className="text-gray-300">600</option>
              <option className="text-gray-300">700</option>
              <option className="text-gray-300">800</option>
              <option className="text-gray-300">900</option>
              <option className="text-gray-300">1000</option>
            </select>          
          </div>
          <div className="w-1/5 pl-2"></div>
          <div className="w-1/5 pl-2"></div>
          <button className="text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 disabled flex justify-center">
            <i className="fas fa-plus-circle mr-1"></i>Add bid
          </button>
        </div>
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        {/* <div className="mt-4  grid grid-cols-2 gap-4"> 
         
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative disabled  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
          
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            
              Prefund
            </button>         
          </div>
        </div> */}

        

      </div>

    </>
  )
}
export default SubcribeByBUSD