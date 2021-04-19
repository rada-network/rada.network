import {gql} from '@apollo/client';

export default gql`
  query itemFeed($skip : Int!, $take : Int!){
    itemFeed (skip : $skip, take : $take){
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
        id
      }
    }
  }
  `