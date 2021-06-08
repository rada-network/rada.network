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