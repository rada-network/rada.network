import {gql} from '@apollo/client';

export default gql`
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