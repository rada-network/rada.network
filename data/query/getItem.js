import {gql} from '@apollo/client';
import getClient from "../client";

const itemFeedGql = gql`
    query itemFeed($skip : Int!, $take : Int!, $orderBy: ItemOrderInput, $query : String!,$t : String!,$lang : String!){
        itemFeed (skip : $skip, take : $take, orderBy: $orderBy, query: $query,t : $t,lang : $lang){
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
                token{
                    name
                    symbol
                }
            }
            news{
                id
                title
                slug
                slug_en
                title_en
                description
                thumbnailUri
                source
                isshowcontent
                keywords
                createdAt
                websiteUri
                lang
                grabTopic{
                    name
                    url
                    website{
                        name
                        url
                    }
                }
                author {
                    name
                    id
                }
                token{
                    name
                    symbol
                }
                is_footnote
            }
            video{
                id
                title
                slug
                description
                videoType
                content
                thumbnailUri
                youtubeId
                url
                source
                keywords
                createdAt
                grabTopic{
                    name
                    url
                    website{
                        name
                        url
                    }
                }
                token{
                    name
                    symbol
                }
                is_footnote
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
                    id
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
                token{
                    name
                    symbol
                }
            }
            news{
                id
                title
                title_en
                slug
                slug_en
                description
                thumbnailUri
                source
                content
                isshowcontent
                contentDisplay
                content_en_display
                keywords
                createdAt
                websiteUri
                lang
                grabTopic{
                    name
                    url
                    website{
                        name
                        url
                    }
                }
                author {
                    name
                    id
                }
                token{
                    id
                    name
                    symbol
                    slug
                }
                is_footnote
            }
            video{
                id
                title
                slug
                description
                content
                videoType
                thumbnailUri
                youtubeId
                url
                keywords
                createdAt
                grabTopic{
                    name
                    url
                    website{
                        name
                        url
                    }
                }
                token{
                    id
                    name
                    symbol
                    slug
                }
                is_footnote
            }
            media{
                id
            }
        }
    }
`

export async function getItems({take,skip, orderBy,query,type,lang}){
    type = type || "all"
    lang = lang || "vi"
    query = query || ""
  const client = getClient()
  return await client.query({
    query: itemFeedGql,
    variables: {
      skip: skip,
      take: take,
      orderBy : orderBy,
      query : query,
      t : type,
      lang : lang
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