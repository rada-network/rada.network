import {gql} from '@apollo/client';
import getClient from "../client";

const cardanoEventGql = gql`
    query {
        cardanoEventFeed{
            id
            title
            description
            twitter
            facebook
            website
            keywords
            createdAt
            endedAt
            startedAt
        }
    }
`
export default cardanoEventGql

export async function getCardanoEvents({}){
  const client = getClient()

  return client.query({
    query: cardanoEventGql,
  })
}