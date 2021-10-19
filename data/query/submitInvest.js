import {gql} from '@apollo/client';

export default gql`
    mutation submitInvest($invest_campaign_id : Int!,
                            $number_rir: Float!,
                            $wallet_address: String!){
        submitInvest(invest_campaign_id: $invest_campaign_id,number_rir: $number_rir,wallet_address: $wallet_address){
            status
            msg
        }
    }
`