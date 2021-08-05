import {gql} from '@apollo/client';
import getClient from "../client";

const itemFeedGql = gql`
    query itemFeed($skip : Int!, $take : Int!, $orderBy: ItemOrderInput, $query : String!,$t : String!){
        itemFeed (skip : $skip, take : $take, orderBy: $orderBy, query: $query,t : $t){
            id
            totalComment
            totalVote
            idea{
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
                createdAt
                keywords
            }
            tweet{
                id
                favoriteCount
                retweetCount
                replyCount
                quoteCount
                source
                createdAt
                lang
                tweetUser {
                    id
                    source
                }
            }
            news{
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
            video{
                id
                title
                description
                videoType
                thumbnailUri
                youtubeId
                url
                source
                keywords
                createdAt
            }
            media{
                id
            }
        }
    }
`

const itemByIdGql = gql`
    query itemById($id : String!){
        itemById (id : $id){
            id
            totalComment
            totalVote
            idea{
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
                createdAt
                keywords
            }
            tweet{
                id
                favoriteCount
                retweetCount
                replyCount
                quoteCount
                source
                createdAt
                lang
                tweetUser {
                    id
                    source
                }
            }
            news{
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
            video{
                id
                title
                description
                videoType
                thumbnailUri
                youtubeId
                url
                keywords
                createdAt
            }
            media{
                id
            }
        }
    }
`

export async function getItems({take,skip, orderBy,query,type}){
    type = type || "all"
  const client = getClient()
  return await client.query({
    query: itemFeedGql,
    variables: {
      skip: skip,
      take: take,
      orderBy : orderBy,
      query : query,
      t : type
    }
  })
}

export async function getItemById({id}){
    const client = getClient()
    return await client.query({
        query: itemByIdGql,
        variables: {
            id : id
        }
    })
}