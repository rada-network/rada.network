import { gql } from "@apollo/client";
import getClient from "../client";

const getBidRanking = gql`
  query estimateBidRanking($pool_id : String!, $contract : String!, $bid_value: Int!){
    estimateBidRanking(pool_id : $pool_id, contract : $contract, bid_value: $bid_value)
  }
`;

export default getBidRanking;

export async function getBidRankingByBidValue({pool_id, contract, bid_value}) {
  const client = getClient();
  return await client.query({
    query: getBidRanking,
    variables: {
      pool_id: pool_id,
      contract: contract,
      bid_value: bid_value,
    },
  });
}
