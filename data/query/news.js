import {gql} from '@apollo/client';
import getClient from "../client";

const newsGql = gql`
    query newsFeed($skip : Int!, $take : Int!, $orderBy: ItemOrderInput, $query : String!){
        newsFeed (skip : $skip, take : $take, orderBy: $orderBy, query : $query){
            id
            title
            description
            thumbnailUri
            source
            content
            keywords
            createdAt
            websiteUri
        }
    }
`

const relatedNewsGql = gql`
    query newsRelated($skip : Int!, $take : Int!, $id : String!){
        newsRelated (skip : $skip, take : $take, id : $id){
            id
            title
            description
            thumbnailUri
            source
            content
            keywords
            createdAt
            websiteUri
        }
    }
`

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

export async function getNewsRelated({take,skip,id}){
  const client = getClient()
  return await client.query({
    query: relatedNewsGql,
    variables: {
      skip: skip,
      take: take,
      id : id
    }
  })
}