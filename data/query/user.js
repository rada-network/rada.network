import {gql} from '@apollo/client';
import getClient from "../client";

const mutation =  gql`
  mutation createOrUpdateUser($profile: JSONObject!, $account: JSONObject!,$oauthProfile : JSONObject!,$key : String!){
    createOrUpdateUser(profile: $profile, account: $account, oauthProfile : $oauthProfile,key: $key){
      id
      access_token
      name
      image
      is_kyc
    }
  }
`

const getUserGql =  gql`
  query{
    me {
      id
      name
      image
      is_kyc
      kyc_status
      email
      account {
        id
        provider
        oauth_profile
        sort
        date_created
        userid
        type
        provider
        provider_account_id
        token_type
        scope
      }
    }

  }
`

const submitKycStatusGql =  gql`
  mutation submitKycStatus($id : String!,$key : String!,$kyc_status : String!){
    submitKycStatus (id : $id,key : $key,kyc_status : $kyc_status) {
      id
    }
  }
`

const getAccessTokenGql =  gql`
  query getAccessToken($user_id : String!,$key : String!){
    getAccessToken (user_id : $user_id,key : $key)
  }
`

export async function getTokenFromYourAPIServer(profile, account, oauthProfile) {
  const key = process.env.LOGIN_KEY || ""
    const client = getClient();
    let data = await client.mutate({
      mutation : mutation,
      variables : {
        key : key,
        profile : profile,
        account : account,
        oauthProfile : oauthProfile
      }
    })
    return data.data.createOrUpdateUser
}

export async function getCurrentUser() {
  const client = getClient();
  let data = await client.query({
    query : getUserGql
  })
  return data.data.me
}

export async function submitKycStatus({id,kyc_status}) {
  const client = getClient();
  const key = process.env.LOGIN_KEY || ""
  let data = await client.mutate({
    mutation : submitKycStatusGql,
    variables: {
      key,id,kyc_status
    }
  })
  return data.data.submitKycStatus
}

export async function getAccessToken({user_id}) {
  const client = getClient();
  const key = process.env.LOGIN_KEY || ""
  let data = await client.query({
    query : getAccessTokenGql,
    variables: {
      key : key,
      user_id : user_id
    }
  })
  return data.data.getAccessToken
}