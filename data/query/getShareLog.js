import { gql } from "@apollo/client";
import getClient from "../client";

const shareLogByGql = gql`
    query getShareLog($campaignId: Int!){
        getShareLog(campaignId :$campaignId){
            id
            twitter
            linkedin
            facebook
        }
    } 
`;

export default shareLogByGql;

export async function getShareLogById({ campaignId }) {
  const client = getClient();
  return await client.query({
    query: shareLogByGql,
    variables: {
        campaignId: campaignId,
    },
  });
}



