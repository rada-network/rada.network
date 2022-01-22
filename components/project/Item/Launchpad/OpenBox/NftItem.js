import {useState, useEffect} from "react"
import fetcher from "@lib/fetchJson";
import {isEmpty} from "lodash";
import { useTranslation } from "react-i18next";
import useStore from "@lib/useStore";

const MAX_FETCH = 60
const NftItem = function({item, boxID}){
  const store = useStore();
  const {t} = useTranslation("launchpad");
  const [metadata,setMetadata] = useState({});
  const [curFetchCount,setCurFetchCount] = useState(0);
  const openSuccessfullyBoxs = store?.box.openSuccessfullyBoxs;
  const [numberBoxOpened, setNumberBoxOpened] = useState([]);
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
        setMetadata({...res, rarityName: rarityName});
        const opened = new Object();
        opened["id"] = parseInt(item.id);
        store.box.updateOpenBoxSuccessfully(opened);
      }
    })
  }

  useEffect(() => {
    setNumberBoxOpened(openSuccessfullyBoxs)
  }, [openSuccessfullyBoxs])

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
      <div className={`card card-nftthumb w-1/2 xl:w-1/3`}>
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
            <img className="w-full object-cover rounded-lg opacity-50" src="https://d14zibwblxxd02.cloudfront.net/box-square.png" />
          </div>

          <div className="absolute top-1/2 right-1/2 -mr-6 -mt-2">
            <span className="flex text-xs font-medium bg-white bg-opacity-80 text-gray-900 text-center w-12 pl-1.5 rounded-full shadow-xl">
              <OpeningText />
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    {item && (
      <div className={`card card-nftthumb w-1/2 xl:w-1/3`}>
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
            {metadata?.image ? 
            <img className="w-full object-cover rounded-lg" src={metadata?.image} />
            :
            <img className="w-full object-cover rounded-lg opacity-50" src="https://d14zibwblxxd02.cloudfront.net/box-square.png" />
            }
            {!!metadata?.rarityName ? null : 
              <div className="absolute top-1/2 right-1/2 -mr-6 -mt-2">
                <span className="flex text-xs font-medium bg-white bg-opacity-80 text-gray-900 text-center w-12 pl-1.5 rounded-full shadow-xl">
                  <OpeningText />
                </span>
              </div>
            }
          </div>

          <div className="flex justify-center items-center pt-2">
            <div className="text-center">
              <h5 className="font-medium">
               {metadata?.name} #{item.id}
              </h5>
              {!!metadata?.rarityName ?
              <span className={`text-xs font-medium nftlabel-${metadata?.rarityName}`}>
                {metadata?.rarityName.toString().toLowerCase()}
              </span>
              : null
              }
            </div>

            {/* {!!metadata?.name  && 
              <div className="text-right">
                <span className="block text-xs opacity-60">
                  {t("name")}
                </span>
                <span className="text-xs font-medium">
                  {metadata?.name}
                </span>
              </div>
            } */}
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
      setText(" •")
    }
    if (counter % 4 === 1){
      setText(" • • ")
    }
    if (counter % 4 === 2){
      setText(" • • •")
    }
    if (counter % 4 === 3){
      setText(" • • • •")
    }
  },[counter])
  return (
    <>
      {text}
    </>
  )
}

export default NftItem