import { gql } from "@apollo/client";
import getClient from "../client";

const investDepositGql = gql`
  query {
    investDeposit {
      id
      is_approved
      is_rejected
      note
      pending_rir
      approved_rir
      date_created
    }
  }
`;

export default investDepositGql;

export async function getInvestDeposit() {
  const client = getClient();
  return await client.query({
    query: investDepositGql,
  });
}
