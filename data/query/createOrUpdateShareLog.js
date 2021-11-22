import { gql } from "@apollo/client";
import getClient from "../client";

const createOrUpdateShareLog = gql`
    mutation createOrUpdateShareLog($campaignId: Int!, $walletAddress: String!, $twitter: String!, $facebook: String!, $linkedin: String!){
        createOrUpdateShareLog(campaignId :$campaignId,  walletAddress: $walletAddress, twitter: $twitter, facebook: $facebook, linkedin: $linkedin){
            id
            twitter
            linkedin
            facebook
        }
    } 
`;

export default createOrUpdateShareLog;

export async function createOrUpdateShareLogById({ campaignId, walletAddress, twitter, facebook, linkedin }) {
  const client = getClient();
  return await client.mutate({
    mutation: createOrUpdateShareLog,
    variables: {
        campaignId: campaignId,
        walletAddress: walletAddress,
        twitter: twitter, 
        facebook: facebook, 
        linkedin: linkedin
    },
  });
}


