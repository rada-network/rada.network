import {gql} from '@apollo/client';

export default gql`
    query tweetFeed($skip : Int!, $take : Int!, $orderBy: ItemOrderInput){
        tweetFeed (skip : $skip, take : $take, orderBy: $orderBy){
            id
            favoriteCount
            retweetCount
            replyCount
            quoteCount
            source
            createdAt
            item {
                id
            }
        }
    }
`