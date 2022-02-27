import { useState, useEffect } from "react";
import { getBidRankingByBidValue } from "@data/query/getRaking";

const BidInfo = ({pool, bid_value, bid_index, quantity}) => {
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
    <div>- {quantity} box&nbsp;&nbsp;&nbsp;{bid_value}BUSD/Box&nbsp;&nbsp;&nbsp;Ranked {ranking}/{raise}</div>
  )
}

export default BidInfo;