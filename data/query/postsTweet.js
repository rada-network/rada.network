import {gql} from '@apollo/client';
import getClient from "../client";

const postTweetGql = gql`
    query tweetFeed($skip : Int!, $take : Int!, $day: Int!, $orderBy: TweetOrderInput,$lang: String!){
        tweetFeed (skip : $skip, take : $take, day: $day, orderBy: $orderBy,lang: $lang){
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

export async function getTweet({socialOrder,skip,take}){
  const client = getClient()
  return await client.query({
    query: postTweetGql,
    variables: {
      skip: skip,
      take: take,
      day: socialOrder === 'popular' ? 0 : 1,
      orderBy: socialOrder === 'popular' ? {favoriteCount: "desc"} : {createdAt: "desc"},
      lang: "en"
    }
  })
}