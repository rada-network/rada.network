import { gql } from "@apollo/client";
import getClient from "../clientShorten";

const createGql = gql`
mutation createShortenLink($url : String!){
  createShortenLink(url : $url){
    key
  }
} 
`;
export async function createShortenLink(url) {
  const client = getClient();
  return await client.mutate({
    mutation: createGql,
    variables: {
      url
    },
  });
}


