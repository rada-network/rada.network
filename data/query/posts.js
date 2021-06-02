import {gql} from '@apollo/client';
import getClient from "../client";

const postsGql = gql`
  query itemFeed($skip : Int!, $take : Int!, $itemType: String!, $orderBy: ItemOrderInput){
    itemFeed (skip : $skip, take : $take, itemType: $itemType, orderBy: $orderBy){
      id
      title
      description
      imageUri
      imagesUri
      itemType
      platform{
        name
        networkName
        websiteUri
      }
      token{
        name
      }
      categoryId
      category{
        id
        slug
        title
      }
      totalVote
      totalComment
      createdAt
    }
  }
  `
export default postsGql

export async function getPosts({type,take,skip, socialOrder}){
  const client = getClient()
  let orderBy = {createdAt : "desc"}
  if (socialOrder === "popular" || socialOrder === "topvote"){
    orderBy = {totalVote : "desc"}
  }
  else if (socialOrder === "topcomment"){
    orderBy = {totalComment : "desc"}
  }
  return await client.query({
    query: postsGql,
    variables: {
      skip: skip,
      take: take,
      itemType: type,
      orderBy : orderBy
    }
  })
}