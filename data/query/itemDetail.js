import {gql} from '@apollo/client';

export default gql`
    query ideaById($id : String!){
        ideaById (id : $id){
            id
            title
            description
            thumbnail
            imageUri
            imagesUri
            images
            websiteUri
            ideaType
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
            item{
                id
                totalComment
                totalVote
            }
            ideaUser{
                name
                avatarUri
                description
                url
            }
        }
    }
`