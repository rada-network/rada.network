import fetchJson from "@lib/fetchJson"

export default async (req, res) => {
  const slug = req.query.slug || ''
  const contractAddress = req.query.address || ""
  const poolID = req.query.poolID || ""
  const network = process.env.NEXT_PUBLIC_CHAIN === "production" ? "production" : "dev"
  try{
    const data = await fetchJson(`${process.env.POOL_SLUG_API_URL}/${network}/${contractAddress}/${poolID}`)
    return res.status(200).json(data)
  }
  catch(e){
    return res.status(200).json({})
  }
  
}
