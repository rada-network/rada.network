import { TrendingStore } from "../../lib/store";
const TokenInfoHeader = function({tokenData,token}){
  const trendingStore = new TrendingStore()
  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <div className="flex flex-0 flex-shrink-0 mb-4 items-center">
        <span className="icon flex-shrink-0 mr-2">
          {token &&
          <img src={token?.logo !== null ? token.logo : `https://cdn.rada.network/static/img/coins/128x128/${token?.slug}.png`} className="h-px-32 w-px-32" alt={token?.name}/>
          }
        </span>
        <h1 className="flex items-center">
          <strong className="text-xl lg:text-2xl font-semibold">{tokenData?.name}</strong>
          <span className="badge badge-coin badge-coin-lg ml-2">{tokenData?.symbol}</span>
        </h1>
      </div>
      <div className="flex flex-wrap space-x-2 mb-4">
        {tokenData?.tag?.map(item => <span key={item.id} className={`badge badge-lg ${trendingStore.data.find(t => t === item.slug) ? 'badge-red':''}`}>{item.name}</span>)}
      </div>
    </div>
  )
}

export default TokenInfoHeader