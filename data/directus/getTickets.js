import {gql} from '@apollo/client';
import getClientDirectus from './clientDirectus';

const sql = gql`
query Ticket($id: String!) {
	investment_right(filter: {user: {id: {_eq: $id}}}) {
		allocation
        status
        user {
            id,
            name,
            email
        }
        campaign {
            title
        }
	}
}
`

export async function getTickets({id}) {
  const client = getClientDirectus()
  const res = await client.query({
    query: sql,
    variables: {
      // userId: '8b67c429-c0ac-46de-9cb6-d2fd8da06298'
      //id: '8b67c429-c0ac-46de-9cb6-d2fd8da06298'
      id
    }
  })
  console.log ('data: ', res.data)
  return res.data.investment_right
}
