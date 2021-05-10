import {gql} from '@apollo/client';

export default gql`
  query itemFeed($skip : Int!, $take : Int!, $itemType: String!){
    itemFeed (skip : $skip, take : $take, itemType: $itemType){
      id
      title
      description
      imageUri
      itemType
      platform{
        name
        websiteUri
      }
      token{
        name
      }
      categoryId
      category{
        id
        slug
        title
      }
      totalVote
      totalComment
    }
  }
  `