import {gql} from '@apollo/client';

export default gql`
    query itemFeed($skip : Int!, $take : Int!){
        itemFeed (skip : $skip, take : $take){
            id
        }
    }
`