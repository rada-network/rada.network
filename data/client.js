import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export default function getClient() {
    return new ApolloClient({
        uri: process.env.GRAPHQL_URL,
        cache: new InMemoryCache()
    });
}