import { useState, useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2, useERC20, useErc721, useOpenBoxContract, useRIRContract } from "@utils/hooks/useContracts"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import NftItem from "./NftItem"
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
  console.log(radaNftContract)
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
    for (let i = start;i > end;i--) {
      const tokenId = await radaNftContract.tokenOfOwnerByIndex(account,i)
      data.push( {
        id : parseInt(ethers.utils.formatUnits(tokenId,0)),
        rarity : "Loading"
      } )
    }
    return data;
  }

  useEffect(() => {
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
      <div className="card card-default card--project-info">
        <div className="card-header items-end">
          <div>
            <span class="text-2xs uppercase opacity-60 tracking-wide">PREVIEW </span>
            <h3>Your Inventory</h3>
          </div>
        </div>
        <div className="card-body">

          {/* NFT Cards Slideshow */}
          <div className="grid grid-cols-3 gap-4">
            {/* NFT Card */}
            {listNft.map(function(item){
              return <NftItem key={item.id}  item={item} />
            })}
            
            {/* END: NFT Card */}
            
          </div>
          {loading && 
          <div className="flex space-x-2 mt-4 justify-center">
            <div className="mx-auto">
              <p className="relative mb-4 "><span className="spinner left-0 top-0"></span></p>
            </div>
          </div>
          }
          <div className="flex space-x-2 mt-4 justify-center">
          {totalNft > ITEM_PER_PAGE &&
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
            }
        </div>
          {/* NFT Cards Slideshow */}

        </div>
      </div>
    </>
  )
}

export default NftList