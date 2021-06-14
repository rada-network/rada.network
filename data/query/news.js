import {gql} from '@apollo/client';
import getClient from "../client";

const newsGql = gql`
    query newsFeed($skip : Int!, $take : Int!, $orderBy: ItemOrderInput, $query : String!){
        newsFeed (skip : $skip, take : $take, orderBy: $orderBy, query : $query){
            id
            title
            description
            thumbnailUri
            content
            keywords
            createdAt
            websiteUri
        }
    }
`
export default newsGql

export async function getNews({take,skip,query,orderBy}){
  const client = getClient()
  query = query || ""
  return await client.query({
    query: newsGql,
    variables: {
      skip: skip,
      take: take,
      orderBy : orderBy,
      query : query
    }
  })
}