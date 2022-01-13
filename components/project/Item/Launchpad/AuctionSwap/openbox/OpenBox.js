import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import NftList from "./NftList"

const OpenBox = ({ pool, project, accountBalance, setStep, fetchAccountBalance, auctionSwapInfo }) => {
  const store = useStore()
  const { t } = useTranslation("launchpad")
  const { account } = useActiveWeb3React()
  const launchpadContract = useAuctionSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const radaNftContract = useErc721('0x6e1aa924a1882b7c1122290e11a9fe94f63af52d')
  const boxContract = useERC20(pool.box_contract)
  const openBoxContract = useOpenBoxContract(pool.openbox_contract)
  const { callWithGasPrice } = useCallWithGasPrice()
  const [numberBox, setNumberBox] = useState(0);
  const handleChangeNumberBox = function (e) {
    setNumberBox(e.currentTarget.value)
  }
  const [loading, setLoading] = useState(true);

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
        store.transaction.showTransaction(true, t("start transaction message"));
        const tx = callWithGasPrice(openBoxContract, 'openBox', [pool.id, numberBox]);
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

  const claimNftBox = async () => {
    
  }
  

  if (loading) { return null }

  return (
    <>
      <div className="p-2 md:p-6">
        {!isApproved ? (
          <div className="flex flex-col text-center">
            <button className="btn relative w-full  md:w-1/2 mx-auto btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md"
              onClick={handleApprove}
            >
              Enable {pool.token_name}
            </button>
            <p className="pt-4">You must enable {pool.token_name} to open</p>
          </div>
        ) : (
          <>
            <div className="flex  items-center relative">
              <div className="w-3/6 pr-2 flex-shrink-0">
                <select id="box" name="amount" defaultValue={numberBox} onChange={handleChangeNumberBox} className="select-custom w-full ">
                  <option className="text-gray-300" value="0">---</option>
                  {Array(accountBalance.boxBalance).fill(null).map((_, i) => {
                    return (
                      <option key={i} className="text-gray-300" value={(i + 1)}>{i + 1}</option>
                    )
                  })}
                </select>
              </div>
              <div className="w-3/6 pr-2 flex-shrink-0">
                <button className={`text-sm ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 ${(numberBox == 0) ? "disabled" : ""} flex justify-center`}
                  onClick={handleConfirm}>
                  <i className="fas fa-plus-circle mr-1"></i>Open box {pool.token_name}
                </button>
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
        {/* {account === "walletaddress" &&
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
        } */}
      </div>
      <NftList auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} setStep={setStep} project={project} pool={pool} />
    </>
  )
}
export default OpenBox