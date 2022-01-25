import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useNftClaimContract, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import NftItem from "./NftItem"
import SubscribeSwapTokenLoading from "../SubscribeSwapTokenLoading"
import useChainConfig from "@utils/web3/useChainConfig"
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"



//const ITEM_PER_PAGE = 9
const ITEM_PER_PAGE = 20
const NftList = function({auctionSwapInfo, pool, project, accountBalance, setStep, fetchAccountBalance }){
  const store = useStore()
  const { t } = useTranslation("launchpad")
  const { account } = useActiveWeb3React()
  const { getBscScanURL } = useChainConfig()
  const { callWithGasPrice } = useCallWithGasPrice()
  const radaNftContract = useErc721(pool.nft_contract)
  const openBoxContract = useOpenBoxContract(pool.openbox_contract)
  const nftClaimContract = useNftClaimContract(pool.reward_contract)
  const [listNft,setListNft] = useState([]);
  const [loading,setLoading] = useState(true);
  const [totalNft,setTotalNft] = useState(0);
  const [totalPage,setTotalPage] = useState(0);
  const [curPage,setCurPage] = useState(1);
  const [claimData,setClaimData] = useState({});
  const [poolInfo, setPoolInfo] = useState({})
  const [claimDisabled,setClaimDisabled] = useState(false);
  const numberBox = store?.box.numberBox;
  const fetchPoolAccountInfo = async function() {
    let dataPromise = []
    dataPromise.push(radaNftContract.balanceOf(account))
    dataPromise.push(openBoxContract.pools(pool.id))
    let data = await Promise.all(dataPromise)
    return {
      nftBalance : ethers.utils.formatUnits(data[0],0),
      pool : {
        startId : ethers.utils.formatUnits(data[1].startId,0),
        endId : ethers.utils.formatUnits(data[1].endId,0)
      }
    }
  }

  const getClaimable = async function() {
    let poolInfo = await nftClaimContract.getPool(pool.id);
    let dataPromise = []
    const claimAbleNft = listNft.map(item => {
      return item.id
    })
    let claimableToken = 0,claimedToken=0,allocation=0
    if (claimAbleNft.length > 0){
      for (let i = 0; i < claimAbleNft.length; i++){
        dataPromise.push(nftClaimContract.getTokenInfo(pool.id,claimAbleNft[i]));
      }
      let data = await Promise.all(dataPromise)
      claimableToken = data.reduce(function(sum,item){
        return sum + parseInt(ethers.utils.formatEther(item._claimable))
      },0)
      claimedToken = data.reduce(function(sum,item){
        return sum + parseInt(ethers.utils.formatEther(item._claimed))
      },0)
      allocation = data.reduce(function(sum,item){
        return sum + parseInt(ethers.utils.formatEther(item._allocation))
      },0)
    }
    
    return { 
      poolInfo,claimableToken,allocation,claimedToken
    }
  }

  const getPercentageClaimToken = function(){
    if (claimData.allocation === 0){
      return 0
    }
    return ((claimData.claimedToken / claimData.allocation * 100).toFixed(1))
  }

  const fetchListNft = async function() {
    let data = []
    if (totalNft == 0){
      return data;
    }
    const start = totalNft - 1 - (curPage-1) * ITEM_PER_PAGE
    const end = totalNft - 1 - curPage * ITEM_PER_PAGE > -1 ? totalNft - 1 - curPage * ITEM_PER_PAGE : -1
    let loadData = []
    for (let i = 0;i < totalNft;i++) {
      loadData.push(radaNftContract.tokenOfOwnerByIndex(account,i))
    }
    const all = await Promise.all(loadData)
    data = all.filter(item => {
      const id = parseInt(ethers.utils.formatUnits(item,0));
      return (id >= poolInfo.startId && id <= poolInfo.endId)
    }).map(item => {
      {
        return {
          id : parseInt(ethers.utils.formatUnits(item,0)),
          rarity : 'loading'
        }
      }
    })
    return data;
  }

  const handleClaimToken = async function (e) {
    try {
      setClaimDisabled(true)
      const claimAbleNft = listNft.map(item => {
        return item.id
      })
      const tx = await callWithGasPrice(nftClaimContract, "claim", [pool.id,claimAbleNft])
      const receipt = await tx.wait()
      if (receipt.status) {
        toast.success(t("Claim success!"))
      }
      setClaimDisabled(false)
      fetchAccountBalance()
      getClaimable().then(res => {
        setClaimData(res)
      })
    } catch (error) {
      setClaimDisabled(false)
      if (!!error?.data?.message){
        toast.error(t(error?.data?.message?.replace("execution reverted: ","")))
      }
      else if (!!error?.message){
        toast.error(t(error?.message))
      }
      else{
        toast.error(t(error))
      }
    }
  }
  useEffect(() => {
    setTotalNft(0)
    fetchPoolAccountInfo().then((res) =>{
      setTotalNft(res.nftBalance)
      setCurPage(1)
      setTotalPage(Math.floor(res.nftBalance/ITEM_PER_PAGE) + 1)
      setPoolInfo(res.pool)
    })
  },[accountBalance.boxBalance,account])

  useEffect(() => {
    if (!!poolInfo.startId){
      setListNft([])
      setLoading(true)
      fetchListNft().then((res) =>{
        setLoading(false)
        setListNft(res)
      })
    }
  },[totalNft,account,poolInfo,curPage,store.loadPoolContent])

  useEffect(() => {
    if (listNft.length > 0 && pool.is_nft_reward){
      getClaimable().then(res => {
        console.log(res)
        setClaimData(res)
      })
    }
  },[listNft,account,store.loadPoolContent])

  const handleChangePage = (i) => {
    if (loading) return false;
    setLoading(true)
    setCurPage(i)
  }
  const handleCopy = () => {
    toast.success("Copied to clipboard", {});
  };
  return (
    <>
      {loading && 
      <div className="mt-4">
        <SubscribeSwapTokenLoading />
      </div>
      }
      {!loading && pool.is_nft_reward && 
      <div className="card card-default card--project-info mt-4">
        <div className="card-header items-end">
          <div>
            <span class="text-2xs uppercase opacity-60 tracking-wide">{t("Claim")} </span>
            <h3>{t("Claim your reward")}</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <div className="box box--transparent">
              <div className="box-header !pl-0">
                {t("investment")}
              </div> 
              <ul className="mt-4 mb-2 flex-shrink-0 flex-grow">
                <li className="list-pair mb-2">
                  <span className="list-key !w-1/2">{t("Total token")}</span>
                  <span className="ml-auto list-value font-semibold">
                    {claimData.allocation} {project.token.symbol}
                  </span>
                </li>
                
                <li className="list-pair mb-2">
                  <span className="list-key !w-1/2">{t("Claimed token")}</span>
                  <span className="ml-auto list-value font-semibold">
                  {claimData.claimedToken} {project.token.symbol}
                  </span>
                </li>
                <li className="list-pair mb-2">
                  <span className="list-key !w-1/2">{project.token.symbol} Contract</span>
                  <div className="ml-auto p-2 rounded-lg flex bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                    <a target="_blank" href={getBscScanURL(claimData?.poolInfo?.tokenAddress)}>
                      {`${claimData?.poolInfo?.tokenAddress.substr(0, 5)}...${claimData?.poolInfo?.tokenAddress.substr(-4)}`}
                    </a>
                    <CopyToClipboard
                      onCopy={handleCopy}
                      text={claimData?.poolInfo?.tokenAddress}
                    >
                      <button className="btn ml-2">
                        <i className="fa-duotone fa-copy text-2xs"></i>
                      </button>
                    </CopyToClipboard>
                  </div>
                </li>
              </ul>
              
            </div>
            <div className="box box--gray -mx-4 -mb-6 md:m-0">
              <div className="box-header flex">
                <h4>{t("Claimable token")}</h4>
                {!!claimData && claimData.claimableToken > 0 &&
                <div className="ml-auto text-right">{claimData.claimableToken.toFixed(2).toLocaleString()} {project.token.symbol}</div>
                }
              </div> 
              <div className="p-6">
                
                <button onClick={e => { handleClaimToken(e) }} className={`w-full btn-primary py-2 px-4 rounded-md` + (claimDisabled || claimData.claimableToken == 0 ? " disabled" : "")}>{t("Claim")}</button>
              
                <div className="text-center">
                  <div className="progress-bar mt-6 bg-gray-300 dark:bg-gray-600 w-full h-4 rounded-full">
                    <div className="text-2xs font-semibold flex px-2 text-white items-center progress-bar--percentage h-4 bg-green-500 rounded-full" style={{width:getPercentageClaimToken() +"%"}}>{getPercentageClaimToken()}%</div>
                  </div>
                  <div className="text-sm mt-2 opacity-60">{t("token claim note",{tokenPercentage : getPercentageClaimToken()})}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {!loading && 
      <div className="card card-default card--project-info mt-4">
        <div className="card-header items-end">
          <div>
            <span class="text-2xs uppercase opacity-60 tracking-wide">{t("Preview")} </span>
            <h3>{t("Your Inventory")}</h3>
          </div>
        </div>
        <div className="card-body">

          {/* NFT Cards Slideshow */}
          {listNft.length > 0 ? 
          <div className="flex flex-wrap">
            {/* NFT Card */}
            {listNft.map(function(item){
              if (!!item){
                return <NftItem key={item.id}  item={item} />
              }
            })}
            {/* END: NFT Card */}
            
          </div>
          :
          <div className="">
            {t("Your inventory is empty")}
          </div>
          }

          {/* {totalNft > ITEM_PER_PAGE &&
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mt-4 text-xs opacity-60">
              <p>{t("Showing")} {ITEM_PER_PAGE} / <strong>{totalNft}</strong> items</p>
            </div>
            <div className="flex space-x-2 mt-4 justify-center">
              <ul className="pagination">
                {curPage > 1 && 
                <li><a href="#" onClick={e => {handleChangePage(curPage-1)}}  className="">{curPage - 1}</a></li>
                }
                <li><a href="#" className="current">{curPage}</a></li>
                {(curPage+1) <= totalPage && 
                <li><a href="#" onClick={e => {handleChangePage(curPage+1)}} className="">{curPage+1}</a></li>
                }
                {(curPage+2) <= totalPage && 
                <li><a href="#" onClick={e => {handleChangePage(curPage+2)}} className="">{curPage + 2}</a></li>
                }
                
                {Math.floor((totalNft)/ITEM_PER_PAGE) + 1 > curPage + 2 && 
                <li><a>...</a></li>
                }
                {Math.floor((totalNft)/ITEM_PER_PAGE) + 1 > curPage + 2 && 
                <li><a href="#" onClick={e => {handleChangePage(Math.floor((totalNft)/50) + 1)}} className="">{Math.floor(totalNft/ITEM_PER_PAGE) + 1}</a></li>
                }
              </ul>
            </div>
          </div>
          } */}
          {/* NFT Cards Slideshow */}

        </div>
      </div>
      }
      
    </>
  )
}

export default NftList