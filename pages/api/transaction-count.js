import fetchJson from "@lib/fetchJson"

export default async (req, res) => {
  const walletAddress = req.query.wallet || ''
  const network = process.env.NODE_ENV === "production" ? "mainnet" : "testnet"
  const data = await fetchJson(`https://scan-svc.rada.network/api/v1/getTransactions/${network}/${walletAddress}`)
  res.status(200).json(data)
}
