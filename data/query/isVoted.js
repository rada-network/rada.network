import {gql} from '@apollo/client';

export default gql`
  query isVote($itemId: String!, $walletAddress: String!) {
      isVote(itemId: $itemId, walletAddress: $walletAddress){
          userId
          cnt
          itemId
          user {
              id
              walletAddress
          }
      }
  }
`