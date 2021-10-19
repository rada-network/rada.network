import { gql } from "@apollo/client";
import getClient from "../client";

const investLogGql = gql`
  query {
    investLog {
      id
      is_approved
      is_rejected
      note
      number_rir
      date_created
      invest_campaign {
        title
        total_rir
        invest_status
        token {
          name
        }
      }
    }
  }
`;

export default investLogGql;

export async function getInvestLog() {
  const client = getClient();
  return await client.query({
    query: investLogGql,
  });
}
