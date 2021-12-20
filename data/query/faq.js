import {gql} from '@apollo/client';
import getClient from "../client";

const faqFeedGql = gql`
query faqFeed($lang : String!, $page_slug : String!){
  faqFeed(lang :$lang,page_slug: $page_slug){
    id
    sort
    question
    answer
  }
}
`
export async function getFaqFeed({lang,page_slug}){
  const client = getClient()

  const data = await client.query({
    query: faqFeedGql,
    variables : {lang: lang,page_slug: page_slug}
  })
  return data.data.faqFeed
}