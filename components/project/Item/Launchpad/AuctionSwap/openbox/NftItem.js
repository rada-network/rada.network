import {useState, useEffect} from "react"
import fetcher from "@lib/fetchJson";
import {isEmpty} from "lodash";
const MAX_FETCH = 60
const NftItem = function({item}){
  const [metadata,setMetadata] = useState({})
  const [curFetchCount,setCurFetchCount] = useState(0)
  let timeout
  const fetchMetaData = function(){
    const env = process.env.NEXT_PUBLIC_CHAIN === "dev" ? "dev" : "prod"
    const url = `https://nft-meta.rada.network/static/meta/${env}/${item.id}`
    setCurFetchCount(curFetchCount+1)
    fetcher(url).then(function(res){
      if (isEmpty(res) && curFetchCount < MAX_FETCH){
        timeout = setTimeout(function(){
          fetchMetaData()
        },1000)
      }
      else{
        setMetadata(res)
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
            Rarity: {metadata?.rarity || "Opening"}
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