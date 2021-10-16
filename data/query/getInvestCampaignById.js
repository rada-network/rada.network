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
            tge_date
            tge_unlock
            invest_log{
                user_id
                number_rir
            }
            invest_allocation{
                user_id
                total_allocation
            }
        }
    }
`

export default investCampaignByIdGql

export async function getInvestCampaignById({id}){
  const client = getClient()
  return await client.query({
    query: investCampaignByIdGql,
    variables: {
      id : id,
    }
  })
}