import {gql} from '@apollo/client';

export default gql`
    query itemById($id : String!){
        itemById (id : $id){
            id
            title
            description
            thumbnail
            imageUri
            websiteUri
            itemType
            contentJson
            createdAt
            platform{
                name
                websiteUri
                networkName
            }
            token{
                name
                id
                symbol
            }
            totalVote
            totalComment
            ideaUser{
                name
                avatarUri
                description
                url
            }
        }
    }
`