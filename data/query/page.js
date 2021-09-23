import {gql} from '@apollo/client';
import getClient from "../client";

const pageSql = gql`
    query page($slug: String!) {
        pageBySlug(slug : $slug){
            slug
            content
            title
            title_en
            content
            content_en
            status
        }
    }
`

export async function getPage({slug}){
  console.log('get page data: ', slug)    

  const client = getClient()
  return await client.query({
    query: pageSql,
    variables: {
      slug: slug
    }
  })
}
