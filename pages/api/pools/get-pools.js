import fetchJson from "@lib/fetchJson"

export default async (req, res) => {
  const slug = req.query.slug || ''
  const network = process.env.NEXT_PUBLIC_CHAIN === "production" ? "production" : "dev"
  try{
    const data = await fetchJson(`${process.env.POOL_CONTRACT_API_URL}/${network}/${slug}`)
    return res.status(200).json(data)
  }
  catch(e){
    return res.status(200).json({})
  }
  
}
