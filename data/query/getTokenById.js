import {gql} from '@apollo/client';
import getClient from "../client";

const tokenByIdGql = gql`
    query tokenById($id : String!, $lang:String!){
        tokenById (id : $id, lang: $lang){
          id
          name
          symbol
          contract_address
          max_supply
          total_supply
          logo
          cover
          team{
            id
            headquarter
            headquarter_url
            location
            founded
            employees
            last_funding
            author{
              id
              name
              image
              position
              file
              facebook
              twitter
              linkedin
              team_id
            }
          }
          partner{
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
          market{
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
        }
    }
`

export default tokenByIdGql

export async function getTokenById({id, lang}){
  const client = getClient()
  return await client.query({
    query: tokenByIdGql,
    variables: {
      id : id,
      lang: lang
    }
  })
}