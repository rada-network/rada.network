import {gql} from '@apollo/client';
import getClient from "../client";

const isVotes = gql`
  query isUserVotes($ids: [String]) {
    isUserVotes(ids: $ids){
          itemId
      }
  }
`

export default isVotes

export async function getIsVotes(ids) {
    const client = getClient()
    const isVote_ = await client.query({
        query: isVotes,
        variables: {ids : ids}
    })
    return isVote_.data.isUserVotes
}