import { gql } from "@apollo/client";
import getClient from "../client";

const tokenByIdGql = gql`
  query tokenById($id: String!, $lang: String!) {
    tokenById(id: $id, lang: $lang) {
      id
      name
      symbol
      contract_address
      max_supply
      total_supply
      logo
      cover
      platform {
        name
        networkName
        description
      }
      team {
        id
        headquarter
        headquarter_url
        location
        founded
        employees
        last_funding
        author {
          id
          name
          image
          position
          file
          facebook
          twitter
          linkedin
          team_id
          description
        }
      }
      partner {
        id
        name
        image
        url
      }
      link {
        id
        url
        group
        name
      }
      token_description {
        content
        lang
      }
      tag {
        id
        name
        slug
      }
      wallet_provider {
        name
        url
      }
      market {
        name
        url
      }
      airdrop {
        title
        code
        description
        status
        gleam_tracking_code
      }
      invest_campaign {
        id
        total_rir
        tge_unlock
        invest_status
        status
        title
        tge_date
        max_rir_per_user
      }
      share_campaign {
        id
        status
        facebook_banner
        twitter_banner
        linkedin_banner
      }
    }
  }
`;

export default tokenByIdGql;

export async function getTokenById({ id, lang }) {
  const client = getClient();
  return await client.query({
    query: tokenByIdGql,
    variables: {
      id: id,
      lang: lang,
    },
  });
}
