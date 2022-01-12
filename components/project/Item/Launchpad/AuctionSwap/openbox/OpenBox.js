import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"

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
  const [listNft,setListNft] = useState([]);
  const [totalNft,setTotalNft] = useState(0);
  const handleChangeNumberBox = function (e) {
    setNumberBox(e.currentTarget.value)
  }

  const fetchNftBalance = async function() {
    const nftBalance = await radaNftContract.balanceOf(account)
    return parseInt(ethers.utils.formatUnits(nftBalance,0))
  }
  const fetchListNft = async function() {
    let data = []
    for (let i = 0;i < totalNft;i++) {
      const tokenId = await radaNftContract.tokenOfOwnerByIndex(account,i)
      const item = await radaNftContract.items(ethers.utils.formatUnits(tokenId,0))
      data.push( {
        id : parseInt(ethers.utils.formatUnits(tokenId,0)),
        rarity : ethers.utils.formatUnits(item.typeNft,0)
      } )
    }
    return data;
  }

  useEffect(() => {
    fetchNftBalance().then((index) =>{
      setTotalNft(index)
    })
  },[accountBalance.boxBalance,account])
  useEffect(() => {
    fetchListNft().then((res) =>{
      console.log(res)
      setListNft(res)
    })
  },[totalNft,account])
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await boxContract.allowance(account, openBoxContract.address)
          return response2.gt(0)
        } catch (error) {
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

  const claimNftBox = () => {

  }

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
      <div className="project-card--container">
        <div className="max-w-md mx-auto">
          <ul className="mb-4 mt-auto flex-shrink-0 flex-grow">
            <li className="list-pair mb-2">
              <span className="list-key !opacity-100">List Rada NFT</span>
            </li>
          </ul>

          <div className="box p-4">
            <div className="flex items-baseline border-b pb-2  border-gray-200 dark:border-gray-800">
              <h4 className="text-md items-baseline font-semibold">
                Token Id
              </h4>
              <span className="ml-auto font-semibold">
                Rarity
              </span>
            </div>
            <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
              {listNft.map(function(item){
                return (
                  <li className="list-pair py-2 border-b border-gray-200 dark:border-gray-800">
                    <span className="list-key text-semibold !text-gray-800 dark:!text-gray-200">
                      {item.id}
                    </span>
                    <div className="ml-auto font-semibold list-value">
                    {item.rarity}
                    </div>
                  </li>
                )  
              })}
              
            </ul>
          </div>
        </div>
        
      </div>
    </>
  )
}
export default OpenBox