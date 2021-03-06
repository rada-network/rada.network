import { submitKycStatus } from "@data/query/user"
import fetchJson from "@lib/fetchJson"

export default async (req, res) => {
  // Signed in
  let status = ''
  const refId = req.query.refId || ''
  if (refId) {
    const clientId = process.env.NEXT_PUBLIC_BLOCKPASS_CLIENTID
    const data = await fetchJson(`https://kyc.blockpass.org/kyc/1.0/connect/${clientId}/refId/${refId}`, {
      headers: {
        Authorization: process.env.BLOCKPASS_API,
        'cache-control': 'no-cache'
      }
    })
    if (data) {
      await submitKycStatus({id : refId,kyc_status  : data.data.status})
      status = data.data.status
    }
  }
  res.status(200).json({status})
}
