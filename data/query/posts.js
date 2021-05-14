import {gql} from '@apollo/client';

export default gql`
  query itemFeed($skip : Int!, $take : Int!, $itemType: String!, $orderBy: ItemOrderInput){
    itemFeed (skip : $skip, take : $take, itemType: $itemType, orderBy: $orderBy){
      id
      title
      description
      imageUri
      imagesUri
      itemType
      platform{
        name
        networkName
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
      createdAt
    }
  }
  `