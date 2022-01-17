import {useState, useEffect} from "react"
import fetcher from "@lib/fetchJson";
import {isEmpty} from "lodash";
const MAX_FETCH = 60
const NftItem = function({item}){
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
    fetchMetaData()
    return () => {
      clearTimeout(timeout)
    }
  },[])

  return (
    <div className="rounded-lg bg-primary-50 dark:bg-primary-700">
      <div>
        {metadata?.image ? 
        <img className="w-full object-cover rounded-lg" src={metadata?.image} />
        :
        <img className="w-full object-cover rounded-lg" src="https://d14zibwblxxd02.cloudfront.net/Open%20the%20box.jpg" />
        }
      </div>

      <div className="flex justify-between items-center p-2">
        <div>
          <h5 className="font-medium">
            {item.id}
          </h5>
          <span className="text-xs font-medium text-yellow-500">
            Rarity: {metadata?.rarityName || "Opening"}
          </span>
        </div>

        <div className="text-right">
          <span className="block text-xs opacity-60">
            Name
          </span>
          <span className="text-xs font-medium">
            {metadata?.name || "Opening"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NftItem