import {gql} from '@apollo/client';
import getClient from "../client";

const newsByIdGql = gql`
    query newsById($id : String!){
        newsById (id : $id){
            id
            title
            description
            thumbnailUri
            source
            content
            keywords
            createdAt
            websiteUri
            item{
                id
                totalComment
                totalVote
            }
        }
    }
`
export default newsByIdGql

export async function getNews({id}){
  const client = getClient()
  return await client.query({
    query: newsByIdGql,
    variables: {
      id : id
    }
  })
}