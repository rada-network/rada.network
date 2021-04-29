import {gql} from '@apollo/client';

export default gql`
    mutation createComment($itemId : String!,
                            $walletAddress : String!, 
                            $content: String!,
                            $parentId: String){
        createComment(itemId: $itemId,walletAddress: $walletAddress,content: $content,parentId: $parentId){
            itemId
            content
            parentId
            user{
                walletAddress
            }
        }
    }
`


