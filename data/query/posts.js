import {gql} from '@apollo/client';
import getClient from "../client";

const postsGql = gql`
  query ideaFeed($skip : Int!, $take : Int!, $ideaType: String!, $orderBy: IdeaOrderInput, $query : String!){
    ideaFeed (skip : $skip, take : $take, ideaType: $ideaType, orderBy: $orderBy, query: $query){
      id
      title
      description
        
      contentJson
      imageUri
      imagesUri
      ideaType
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
        item{
            id
            totalComment
            totalVote
        }
      createdAt
      keywords
    }
  }
  `
export default postsGql

export async function getPosts({type,take,skip, socialOrder,query}){
  const client = getClient()
  let orderBy = {createdAt : "desc"}
  if (socialOrder === "popular" || socialOrder === "topvote"){
    orderBy = {totalVote : "desc"}
  }
  else if (socialOrder === "topcomment"){
    orderBy = {totalComment : "desc"}
  }
  query = query || ""
  return await client.query({
    query: postsGql,
    variables: {
      skip: skip,
      take: take,
      ideaType: type,
      orderBy : orderBy,
      query : query
    }
  })
}