import {gql} from '@apollo/client';
import getClient from "../client";

const isVotes = gql`
  query isVotes($ids: [String], $walletAddress: String!) {
      isVotes(ids: $ids, walletAddress: $walletAddress){
          itemId
      }
  }
`

export default isVotes

export async function getIsVotes(walletAddress,ids) {
    const client = getClient()
    const isVote_ = await client.query({
        query: isVotes,
        variables: {ids : ids,walletAddress: walletAddress}
    })
    return isVote_.data.isVotes
}