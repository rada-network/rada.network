import { getSession } from "next-auth/client"
import {getAccessToken} from "data/query/user"

export default async (req, res) => {
  
  try{
    const session = await getSession({ req })
    if (session == null) return res.status(200).json({access_token: ""})
    const access_token = await getAccessToken({user_id : session.user.id})
    return res.status(200).json({access_token})
  }
  catch(e){
    console.log(e)
    return res.status(200).json({})
  }
  
}
