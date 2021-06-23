import {gql} from '@apollo/client';
import getClient from "../client";

const suggestUserGql = gql`
    query suggestUserFeed{
        suggestUserFeed{
            id
            name
            description
            twitter
            facebook
            website
            linkedin
            keywords
            image
        }
    }
`
export default suggestUserGql

export async function getInfluencers({}){
  const client = getClient()

  return client.query({
    query: suggestUserGql,
  })
}