import {gql} from '@apollo/client';

export default gql`
    query itemById($id : String!){
        itemById (id : $id){
            id
            title
            description
            imageUri
            itemType
            contentJson
            platform{
                name
                websiteUri
            }
            token{
                name
                id
                symbol
            }
            totalVote
            totalComment
        }
    }
`