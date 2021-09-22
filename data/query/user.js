import {gql} from '@apollo/client';
import getClient from "../client";

const mutation =  gql`
  mutation createOrUpdateUser($profile: JSONObject!, $account: JSONObject!,$oauthProfile : JSONObject!){
    createOrUpdateUser(profile: $profile, account: $account, oauthProfile : $oauthProfile){
      id
      access_token
      name
      image
    }
  }
`

const getUserGql =  gql`
  query{
    me {
      id
      name
      image
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


export async function getTokenFromYourAPIServer(profile, account, oauthProfile) {
    const client = getClient();
    let data = await client.mutate({
        mutation : mutation,
        variables : {
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