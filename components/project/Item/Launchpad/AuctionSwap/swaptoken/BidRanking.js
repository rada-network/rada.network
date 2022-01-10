import { useState, useEffect } from "react";
import { getBidRankingByBidValue } from "@data/query/getRaking";

const BidRanking = ({pool, bid_value}) => {
  const [ranking, setRanking] = useState(0);
  const [raise, setRaise] = useState(0);

  useEffect(() => {
    if (!!pool) {
      setRaise(pool.raise);
      const pool_id = pool.id.toString();
      const contract = pool.contract
      // getBidRankingByBidValue({pool_id: pool_id, contract: contract, bid_value: 160}).then(function (res) {

      // });
    }
    
  }, [pool])

  return (
    <>
      <div className="w-1/5 pl-2 flex-shrink-0 text-right">
        {ranking == 0 ? (
          <>
            NA/{raise}
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