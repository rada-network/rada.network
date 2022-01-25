import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"

const MAX_BOX_CURRENT_OPEN = 5
const OpenBox = ({ pool, project, accountBalance, setStep, fetchAccountBalance, auctionSwapInfo }) => {
  const store = useStore()
  const { t } = useTranslation("launchpad")
  const { account } = useActiveWeb3React()
  const boxContract = useERC20(pool.box_contract)
  const openBoxContract = useOpenBoxContract(pool.openbox_contract)
  const { callWithGasPrice } = useCallWithGasPrice()
  const [numberBox, setNumberBox] = useState(0);
  const handleChangeNumberBox = function (e) {
    setNumberBox(e.currentTarget.value)
  }
  const [loading, setLoading] = useState(true);

  const maxOpenBox = accountBalance.boxBalance > MAX_BOX_CURRENT_OPEN ? MAX_BOX_CURRENT_OPEN : accountBalance.boxBalance


  const handleOpenBox = async function (bidIndex) {
    //store.transaction.showTransaction(true);
    try {
      store.box.showOpenBoxModal(true, parseInt(numberBox));
      const tx = await callWithGasPrice(openBoxContract, 'openBox', [pool.id, numberBox]);
      const receipt = await tx.wait();
      let tokenIds = [];
      for (let i = 0; i < receipt.events.length; i++) {
        let tokenIDObject = new Object()
        if (receipt.events[i].args) {
          tokenIDObject["id"] = parseInt(ethers.utils.formatUnits(receipt.events[i].args[2], 0));
          tokenIds.push(tokenIDObject);
        }
      }
      store.box.updateArgs(tokenIds);
      setNumberBox(0)
      await fetchAccountBalance()
    }
    catch (error) {
      if (!!error?.data?.message) {
        store.box.updateError(t(error?.data?.message?.replace("execution reverted: ", "").replace("ERC20: ", "")), true);
      }
      else if (!!error?.message) {
        store.box.updateError(t(error?.message), true);
      } else {
        store.box.updateError(t(error.toString().replace("execution reverted: ", "").replace("ERC20: ", "")), true);
      }
    }
  }

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        setLoading(true);
        try {
          const response2 = await boxContract.allowance(account, openBoxContract.address)
          setLoading(false);
          return response2.gt(0)
        } catch (error) {
          setLoading(false);
          return false
        }
      },
      onApprove: async (requireApprove) => {
        store.transaction.showTransaction(true, t("start transaction message"));
        const tx = callWithGasPrice(boxContract, 'approve', [openBoxContract.address, ethers.constants.MaxUint256])
        store.transaction.startTransaction(true, t("transaction started"));
        return tx;
      },
      onApproveSuccess: async ({ receipt }) => {
        store.transaction.update(receipt.transactionHash);
      },
      onConfirm: () => {
      },
      onSuccess: async ({ receipt }) => {
      },
    })

  const resetApproved = async () => {
    await callWithGasPrice(boxContract, 'approve', [openBoxContract.address, 0])
  }

  const claimNftBox = async () => {

  }


  if (loading) { return null }

  return (
    <>
      <div className="w-full">
        {!isApproved ? (
          <div className="flex flex-col text-center">
            <button className="btn !text-sm relative mx-auto btn-default btn-default-lg btn-primary" disabled="" id="swap-button" width="100%" scale="md"
              onClick={handleApprove}
            >
              Enable {pool.token_name}
            </button>
            <p className="mt-4 text-xs">You must enable {pool.token_name} to open</p>
          </div>
        ) : (
          <>
            <div className="mx-auto">
              <div className="flex justify-center items-center relative">
                <div className="w-2/6 flex-shrink-0">
                  <select id="box" name="amount" defaultValue={numberBox} onChange={handleChangeNumberBox} className="select-custom w-full ">
                    <option className="text-gray-300" value={0}>---</option>
                    {Array((maxOpenBox)).fill(null).map((_, i) => {
                      return (
                        <option key={i} className="text-gray-300" value={(i + 1)}>{i + 1}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="w-4/6">
                  <button className={`text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-4 ${(numberBox == 0 || isConfirming) ? "disabled" : ""} flex justify-center`}
                    onClick={handleOpenBox}>
                    Open box {pool.token_name}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* {auctionSwapInfo.info.ended && auctionSwapInfo.stat.totalSold > 0 && (
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`}  
          onClick={claimNftBox}>
            {t("Claim")}
          </button>
        )} */}
        {/* {account === "0xC0129E7E233d6D9D4f2717Ba3e1837A4FE6C03af" &&
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
        } */}
      </div>
      {isApproved && 
      <div className="mt-4 flex flex-shrink-0">
        <span className="font-normal">Your balance:</span>
        <div className="ml-2">
          <span className="badge !text-sm !px-2">
            <strong className="font-semibold mr-1">{accountBalance.boxBalance}</strong>
            {pool.token_name} 
          </span>
        </div>
      </div>
      }
    </>
    
  )
}
export default OpenBox