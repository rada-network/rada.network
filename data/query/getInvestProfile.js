import { gql } from "@apollo/client";
import getClient from "../client";

const investProfileGql = gql`
  query {
    investProfile {
      user_id
      max_rir
      locked_rir
      pending_rir
      approved_rir
      used_rir
    }
  }
`;

export default investProfileGql;

export async function getInvestProfile() {
  const client = getClient();
  return await client.query({
    query: investProfileGql,
  });
}
