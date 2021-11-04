import {gql} from '@apollo/client';
import getClient from "../client";

const projectBySlugGql = gql`
    query ProjectBySlug($slug: String!, $lang: String!) {
        projectBySlug(slug : $slug,lang : $lang) {
        id
        slug
        thumbnail_uri
        cover_uri
        background_uri
        title
        description
        open_date
        cover_embed
        thumbnail_embed
        thumbnail_embed
        type
        status
        token{
            name
            logo
            symbol
        }
        platform{
            name
            networkName
        }
        news{
            title
            slug
            thumbnailUri
            content
        }
        multilang{
            project
        }
        }
    }
    `
const projectFeedGql = gql`
    query ProjectFeed($lang: String!) {
        projectFeed(lang: $lang) {
        id
        slug
        thumbnail_uri
        cover_uri
        background_uri
        title
        description
        open_date
        cover_embed
        thumbnail_embed
        thumbnail_embed
        type
        status
        token{
            name
            logo
            symbol
        }
        platform{
            name
            networkName
        }
        news{
            title
            slug
            thumbnailUri
        }
        }
    }
    `

export async function getProjects({ lang }) {
    const client = getClient()
    const res = await client.query({
        query: projectFeedGql,
        variables: {
            lang: lang || 'en'
        }
    })
    return res.data.projectFeed || []
}


export async function getProject({ slug, lang }) {
    const client = getClient()
    const res = await client.query({
        query: projectBySlugGql,
        variables: {
            lang: lang || 'en',
            slug
        }
    })
    return res.data.projectBySlug || {}
}
