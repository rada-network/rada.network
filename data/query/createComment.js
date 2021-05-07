import {gql} from '@apollo/client';

export default gql`
    mutation createComment($itemId : String!,
                            $walletAddress : String!, 
                            $content: String!,
                            $parentId: String){
        createComment(itemId: $itemId,walletAddress: $walletAddress,content: $content,parentId: $parentId){
            id
            itemId
            content
            createdAt
            parent
            user{
                id
                walletAddress
            }
        }
    }
`


