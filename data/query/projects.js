import { gql } from '@apollo/client';
import getClient from "../client";
import fetcher from "@lib/fetchJson";

const projectBySlugGql = gql`
  query ProjectBySlug($slug: String!, $lang: String!) {
    projectBySlug(slug : $slug,lang : $lang) {
      id
      slug
      thumbnail_uri
      cover_uri
      background_uri
      cover_embed
      thumbnail_embed
      type
      status
      website
      facebook
      twitter
      telegram
      discord
      medium
      token{
        contract_address
        name
        logo
        symbol
        slug
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
        share2earn_url
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
      project_pool{
        open_date
        current_date
        type
        token_sale
        token_name
        token_image_uri
        end_date
        whitelist_date
        tge_date
        next_vesting_date
        raise
        price
        slug
        title
        is_kyc
        sort
        is_allow_rir
        is_whitelist
        is_hidden
        is_openbox
        is_nft_reward
        token_decimal
        price_decimal
        project_pool_nft{
          title
          description
          images
          rarity
          sort
          allocation
          total
          probability
        }
        project_pool_content{
          description
          title
          lang
          learn_more_url
          whitelist_url
          whitelist_title
        }
      }
    }
  }
  `
const projectFeedGql = gql`
  query ProjectFeed($lang: String!) {
    projectFeed(lang: $lang) {
    is_default_open
    slug
    open_date
    end_date
    thumbnail_uri
    cover_uri
    background_uri
    status
    website
    facebook
    twitter
    telegram
    discord
    medium
    date_created
    token{
      name
      logo
      symbol
    }
    content{
      title
      description
    }
    platform{
      name
      networkName
    }
    project_pool{
      sort
      open_date
      current_date
      type
      token_sale
      token_name
      token_image_uri
      end_date
      whitelist_date
      tge_date
      raise
      price
      slug
      title
      is_hidden
    }
  }
}
`
const submitProjectPrefundLogGql = gql`
  mutation submitPrefundLog($user_id : String!,$wallet_address : String!,$contract_address : String!,$project_id : Int!,$pool_id: String!,$key: String!){
    submitPrefundLog(user_id : $user_id,wallet_address : $wallet_address,contract_address : $contract_address,project_id : $project_id,pool_id : $pool_id,key : $key){
      id
    }
  }
`

const poolByWalletAddress = gql`
  query poolByWalletAddress($lang : String!, $wallet_address : String!){
    poolByWalletAddress(lang: $lang, wallet_address: $wallet_address) {
      id
      contract_address
      pool_id
      project{
        slug
        thumbnail_uri
        content{
          title
        }
        project_pool{
          title
          slug
          is_whitelist
          type
          open_date
          end_date
        }
      }
    }
  }
`

const projectPoolWinnerBySlugGgl = gql`
  query projectPoolWinnerBySlug($pool : String!, $slug : String!){
    projectPoolWinnerBySlug(pool :$pool,slug :$slug){
      wallet_address
    }
  }
`

export async function getPoolByWallet({ lang, wallet_address }) {
  const client = getClient()
  const res = await client.query({
    query: poolByWalletAddress,
    variables: {
      lang: lang || 'en',
      wallet_address: wallet_address
    }
  })
  return res.data.poolByWalletAddress || []
}

export async function getProjectPoolWinnerBySlug({ slug, pool }) {
  const client = getClient()
  const res = await client.query({
    query: projectPoolWinnerBySlugGgl,
    variables: {
      slug,pool
    }
  })
  return res.data.projectPoolWinnerBySlug || []
}

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

export async function submitPrefundLog({ user_id, contract_address, wallet_address, project_id, pool_id }) {
  const client = getClient()
  const key = process.env.LOGIN_KEY
  const res = await client.mutate({
    mutation: submitProjectPrefundLogGql,
    variables: {
      key, user_id, wallet_address, contract_address, project_id, pool_id
    }
  })
  return res.data.submitPrefundLog
}

export const submitPrefundLogApi = async ({ pool, project, account }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pool_id: pool.id.toString(),
      project_id: project.id,
      wallet_address: account,
      contract_address: pool.contract
    })
  };
  return await fetcher("/api/logs/prefund", requestOptions)
}
