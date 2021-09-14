import {gql} from '@apollo/client';
import getClient from "../client";

const mutation =  gql`
  mutation createOrUpdateUser($profile: JSONObject!, $account: JSONObject!,$oauthProfile : JSONObject!){
    createOrUpdateUser(profile: $profile, account: $account, oauthProfile : $oauthProfile){
      id
      access_token
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
    return data.createOrUpdateUser
}