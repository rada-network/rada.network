import {gql} from '@apollo/client';
import getClient from "../client";

const topicGql = gql`
    query {
        itemTypeCount{
            title
            itemType
            ideaCount
            description
        }
    }
`
export default topicGql

export async function getTopic(){
  const client = getClient()
  return await client.query({
    query: topicGql
  })
}