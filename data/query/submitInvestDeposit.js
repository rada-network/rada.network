import { gql } from "@apollo/client";

export default gql`
  mutation submitInvestDeposit($txid: String!, $number_rir: Int!) {
    submitInvestDeposit(txid: $txid, number_rir: $number_rir) {
      status
      msg
    }
  }
`;
