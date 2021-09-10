import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
 
export default function getClient() {
    return new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        cache: new InMemoryCache({
        })
    });
}