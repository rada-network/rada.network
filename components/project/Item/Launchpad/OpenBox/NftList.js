import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import NftItem from "./NftItem"
import SubscribeSwapTokenLoading from "../SubscribeSwapTokenLoading"
//const ITEM_PER_PAGE = 9
const ITEM_PER_PAGE = 6
const NftList = function({ pool, project, accountBalance, setStep, fetchAccountBalance, auctionSwapInfo }){
  const store = useStore()
  const { t } = useTranslation("launchpad")
  const { account } = useActiveWeb3React()
  const radaNftContract = useErc721('0x6e1aa924a1882b7c1122290e11a9fe94f63af52d')
  const [listNft,setListNft] = useState([]);
  const [loading,setLoading] = useState(true);
  const [totalNft,setTotalNft] = useState(0);
  const [curPage,setCurPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const fetchNftBalance = async function() {
    const nftBalance = await radaNftContract.balanceOf(account)
    return parseInt(ethers.utils.formatUnits(nftBalance,0))
  }
  const fetchListNft = async function() {
    let data = []
    if (totalNft == 0){
      return data;
    }
    const start = totalNft - 1 - (curPage-1) * ITEM_PER_PAGE
    const end = totalNft - 1 - curPage * ITEM_PER_PAGE > -1 ? totalNft - 1 - curPage * ITEM_PER_PAGE : -1
    let loadData = []
    for (let i = start;i > end;i--) {
      loadData.push(radaNftContract.tokenOfOwnerByIndex(account,i))
    }
    const all = await Promise.all(loadData)
    data = all.map(item => {
      return {
        id : parseInt(ethers.utils.formatUnits(item,0)),
        rarity : 'loading'
      }
    })
    return data;
  }

  useEffect(() => {
    setTotalNft(0)
    fetchNftBalance().then((index) =>{
      setTotalNft(index)
      setCurPage(1)
      setTotalPage(Math.floor(index/ITEM_PER_PAGE) + 1)
    })
  },[accountBalance.boxBalance,account])

  useEffect(() => {
    setListNft([])
    setLoading(true)
    fetchListNft().then((res) =>{
      setLoading(false)
      setListNft(res)
    })
  },[totalNft,account,curPage])

  const handleChangePage = (i) => {
    if (loading) return false;
    setLoading(true)
    setCurPage(i)
  }
  return (
    <>
      {loading && 
      <div className="mt-4">
        <SubscribeSwapTokenLoading />
      </div>
      }
      {!loading && <div className="card card-default card--project-info mt-4">
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
              return <NftItem key={item.id}  item={item} />
            })}
            {/* END: NFT Card */}
            
          </div>
          :
          <div className="">
            {t("Your inventory is empty")}
          </div>
          }

          {totalNft > ITEM_PER_PAGE &&
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mt-4 opacity-60 test-sm">
              <p>Showing
              6 / <strong>200</strong> items</p>
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
          }
          {/* NFT Cards Slideshow */}

        </div>
      </div>
      }
    </>
  )
}

export default NftList