import {gql} from '@apollo/client';
import getClient from "../client";

const postTweetGql = gql`
    query tweetFeed($skip : Int!, $take : Int!, $day: Int!, $orderBy: TweetOrderInput,$lang: String!,$query : String!){
        tweetFeed (skip : $skip, take : $take, day: $day, orderBy: $orderBy,lang: $lang, query: $query){
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
            item {
                id
            }
        }
    }
`
export default postTweetGql

export async function getTweet({socialOrder,skip,take,query,day}){
  const client = getClient()
  query = query || ""
  day = day || 1
  return await client.query({
    query: postTweetGql,
    variables: {
      skip: skip,
      take: take,
      query: query,
      day: day,
      orderBy: socialOrder === 'popular' ? {favoriteCount: "desc"} : {createdAt: "desc"},
      lang: "en"
    }
  })
}