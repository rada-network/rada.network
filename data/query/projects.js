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
    open_date
    end_date
    cover_embed
    thumbnail_embed
    thumbnail_embed
    type
    status
    swap_contract
    raise
    price
    is_kyc
    is_allow_rir
    is_whitelist
    token{
      name
      logo
      symbol
      link{
        url
        name
        group
      }
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
      createdAt
      author {
        name
        id
        image
        description
        facebook
        twitter
        linkedin
      }
    }
    content{
      title
      description
    }
    share_campaign{
      id
      lang
      title
      logo
      banner_library
      participation_guide
      facebook_banner
      linkedin_banner
      twitter_banner
      avatar_frame
      incentive_level1
      incentive_level2
      share_message
      share2earn_contract
      program_id
      referral_admin_contract
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
    open_date
    cover_embed
    thumbnail_embed
    thumbnail_embed
    type
    status
    raise
    price
    is_kyc
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
    content{
      title
      description
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
