import {submitPrefundLog} from "data/query/projects"
import { ethers } from "ethers"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  
  try{
    const session = await getSession({ req })
    if (session == null) return res.status(200).json({})
    if (!!req.body &&
      !!req.body.pool_id &&
      !!req.body.project_id &&
      !!req.body.wallet_address &&
      !!req.body.contract_address)
    {
      if (!ethers.utils.getAddress(req.body.wallet_address)){
        return res.status(200).json({})
      }
      if (!ethers.utils.getAddress(req.body.contract_address)){
        return res.status(200).json({})
      }
      let data = await submitPrefundLog({
        user_id : session.user.id,
        pool_id : req.body.pool_id,
        project_id : req.body.project_id,
        wallet_address : req.body.wallet_address,
        contract_address : req.body.contract_address,
      })
      return res.status(200).json(data)
    }
    return res.status(200).json({})
  }
  catch(e){
    return res.status(200).json({})
  }
  
}
