import {gql} from '@apollo/client';

export default gql`
  mutation toggleVote($itemId: String!, $walletAddress: String!){
    toggleVote(itemId: $itemId, walletAddress: $walletAddress){
      cnt
      user{
        id
        walletAddress
      }
    }
  }
`