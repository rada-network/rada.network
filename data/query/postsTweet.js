import {gql} from '@apollo/client';

export default gql`
    query tweetFeed($skip : Int!, $take : Int!, $day: Int!, $orderBy: TweetOrderInput){
        tweetFeed (skip : $skip, take : $take, day: $day, orderBy: $orderBy){
            id
            favoriteCount
            retweetCount
            replyCount
            quoteCount
            source
            createdAt
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