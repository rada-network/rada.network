import {gql} from '@apollo/client';

export default gql`
    mutation createUserComment($itemId : String!,
                            $content: String!,
                            $parentId: String){
        createUserComment(itemId: $itemId,content: $content,parentId: $parentId){
            id
            itemId
            content
            createdAt
            parent
            user{
                id
                name
                email
                image
                walletAddress
            }
        }
    }
`


