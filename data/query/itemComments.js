import {gql} from '@apollo/client';

export default gql`
    query commentFeed($itemId : String!, $orderBy : CommentOrderInput){
        commentFeed(itemId : $itemId,orderBy : $orderBy){
            itemId
            content
            parentId
            createdAt
            user{
                walletAddress
            }
        }
    }
`


