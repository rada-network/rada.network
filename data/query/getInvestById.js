import {gql} from '@apollo/client';
import getClient from "../client";

const investCampaignByIdGql = gql`
    query investCampaignById($id : Int!){
        investCampaignById (id : $id){
            id
            invest_status
            total_rir
            total_rir_approved
            max_rir_per_user
            min_rir_per_user
            block_step
            tge_date
            tge_unlock
            end_date
            start_date
            price
            invest_log{
                wallet_address
                number_rir
            }
        }
    }
`

export default investCampaignByIdGql

export async function getInvestById({id}){
  const client = getClient()
  return client.query({
    query: investCampaignByIdGql,
    variables: {
      id : id,
    }
  })
}