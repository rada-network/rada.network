import { gql } from "@apollo/client";
import getClient from "../client";

const createOrUpdateShareLog = gql`
    mutation createOrUpdateShareLog($campaignId: Int!, $walletAddress: String!, $twitter: String!, $facebook: String!, $telegram: String!,  $linkedin: String!){
        createOrUpdateShareLog(campaignId :$campaignId,  walletAddress: $walletAddress, twitter: $twitter, facebook: $facebook, telegram: $telegram, linkedin: $linkedin){
            id
            twitter
            linkedin
            facebook
            telegram
        }
    } 
`;

export default createOrUpdateShareLog;

export async function createOrUpdateShareLogById({ campaignId, walletAddress, twitter, facebook,telegram, linkedin }) {
  const client = getClient();
  return await client.mutate({
    mutation: createOrUpdateShareLog,
    variables: {
        campaignId: campaignId,
        walletAddress: walletAddress,
        twitter: twitter, 
        facebook: facebook,
        telegram: telegram,
        linkedin: linkedin
    },
  });
}

