import {gql} from '@apollo/client';

export default gql`
    query commentFeed($itemId : String!, $orderBy : CommentOrderInput){
        commentFeed(itemId : $itemId,orderBy : $orderBy){
            id
            itemId
            content
            parent
            createdAt
            user{
                name
                email
                id
                walletAddress
            }
        }
    }
`


