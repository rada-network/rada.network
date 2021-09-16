import {gql} from '@apollo/client';
import getClient from "../client";
import isVote from "./isVoted";

export default gql`
  mutation toggleVote($itemId: String!, $walletAddress: String!){
    toggleVote(itemId: $itemId, walletAddress: $walletAddress){
      totalVote
      isVoted
    }
  }
`

export const toogleUserVoteGql = gql`
  mutation toggleVote($itemId: String!){
    toggleUserVote(itemId: $itemId){
      totalVote
      isVoted
    }
  }
`

export async function toggleUserVote(itemId){
  const client = getClient();
  const res = await client.mutate({
    mutation : toogleUserVoteGql,
    variables : {itemId: itemId}
  });
  return res;
}