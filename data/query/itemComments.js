import {gql} from '@apollo/client';

export default gql`
    query commentFeed($itemId : String!){
        commentFeed(itemId : $itemId){
            itemId
            content
            parentId
            user{
                walletAddress
            }
        }
    }
`


