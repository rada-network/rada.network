import { useState, useEffect } from "react";
import { getBidRankingByBidValue } from "@data/query/getRaking";

const BidRanking = ({pool, bid_value,bid_index}) => {
  const [ranking, setRanking] = useState(0);
  const [raise, setRaise] = useState(0);

  useEffect(() => {
    if (!!pool) {
      setRaise(pool.raise);
      const pool_id = pool.id.toString();
      const contract = pool.contract
      
      getBidRankingByBidValue({pool_id: pool_id, contract: contract, bid_value: bid_value, bid_index}).then(function (res) {
        setRanking(res.data.estimateBidRanking)
      });
    }
    
  }, [pool,bid_value,bid_index])

  return (
    <>
      <div className="w-1/5 pl-2 flex-shrink-0 text-right">
        {ranking == 0 ? (
          <>
            na / {raise}
          </>
        ) :
        (
          <>
            {ranking}<span className="opacity-60">/{raise} </span>
          </>
        )}
        
      </div>
    </>
  )
}

export default BidRanking;