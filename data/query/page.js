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

const getField = (page, field, lang) => {
  return page[field + '_' + lang] || page[field]
}

export async function getPage({slug, lang}){
  const client = getClient()
  const page = await client.query({
    query: pageSql,
    variables: {
      slug: slug
    }
  })

  let title = '', content = ''
  if (page.data.pageBySlug !== null) {
    title = getField(page.data.pageBySlug, 'title', lang)
    content = getField(page.data.pageBySlug, 'content', lang)
  }
  else { 
    return null
  }

  return {slug, title, content}
}
