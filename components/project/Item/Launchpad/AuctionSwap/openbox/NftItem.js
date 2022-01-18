import {useState, useEffect} from "react"
import fetcher from "@lib/fetchJson";
import {isEmpty} from "lodash";
import { useTranslation } from "react-i18next";

const MAX_FETCH = 60
const NftItem = function({item, boxID}){
  const {t} = useTranslation("launchpad")
  const [metadata,setMetadata] = useState({})
  const [curFetchCount,setCurFetchCount] = useState(0)
  let timeout

  const rarityDic = {
    "1":"Common",
    "2":"Common",
    "3":"Common",
    "4":"Rare",
    "5":"Rare",
    "6":"Rare",
    "7":"Super Rare",
    "8":"Super Rare",
    "9":"Super Rare",
    "10":"Legendary",
    "11":"Legendary",
    "12":"Legendary"
  }

  const fetchMetaData = function(){
    const env = process.env.NEXT_PUBLIC_CHAIN === "dev" ? "dev" : "prod"
    const url = `https://nft-meta.rada.network/static/meta/${env}/${item.id}`
    setCurFetchCount(curFetchCount + 1)
    fetcher(url).then(function(res){
      if (isEmpty(res) && curFetchCount < MAX_FETCH){
        timeout = setTimeout(function(){
          fetchMetaData()
        },1000)
      } else {
        let rarityName = rarityDic[res.rarity.toString()];
        setMetadata({...res, rarityName: rarityName})
      }
    })
  }

  useEffect(() => {
    if (!!item) {
      fetchMetaData()
    }
    return () => {
      clearTimeout(timeout)
    }
  },[])

  if (boxID) {
    return (
      <div className={`card card-nftthumb`}>
        <div>
          <div>
            <img className="w-full object-cover rounded-lg" src="https://d14zibwblxxd02.cloudfront.net/box-square.png" />
          </div>

          <div className="flex justify-between items-center p-2">
            <div>
              <span className="text-xs font-medium text-yellow-500">
                <OpeningText />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    {item && (
      <div className={`card card-nftthumb`}>
        <div>
          <div>
            {metadata?.image ? 
            <img className="w-full object-cover rounded-lg" src={metadata?.image} />
            :
            <img className="w-full object-cover rounded-lg" src="https://d14zibwblxxd02.cloudfront.net/box-square.png" />
            }
          </div>

          <div className="flex justify-between items-center p-2">
            <div>
              <h5 className="font-medium">
                #{item.id}
              </h5>
              {!!metadata?.rarityName ?
              <span className="text-xs font-medium text-yellow-500">
                Rarity: {metadata?.rarityName}
              </span>
              :
              <span className="text-xs font-medium text-yellow-500">
                <OpeningText />
              </span>
              }
            </div>

            {!!metadata?.name  && 
              <div className="text-right">
                <span className="block text-xs opacity-60">
                  {t("name")}
                </span>
                <span className="text-xs font-medium">
                  {metadata?.name}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
      )}
    </>
    
  )
}

const OpeningText = function(){
  const [counter,setCounter] = useState(0);
  const [text,setText] = useState("Opening ")
  let interval
  useEffect(() => {
    interval = setInterval(() =>{
      setCounter(prevCount => prevCount + 1)
    },500)

    return () => {
      clearInterval(interval)
    }
  },[])
  useEffect(() => {
    if (counter % 4 === 0){
      setText("Opening")
    }
    if (counter % 4 === 1){
      setText("Opening .")
    }
    if (counter % 4 === 2){
      setText("Opening . . ")
    }
    if (counter % 4 === 3){
      setText("Opening . . .")
    }
  },[counter])
  return (
    <>
      {text}
    </>
  )
}

export default NftItem