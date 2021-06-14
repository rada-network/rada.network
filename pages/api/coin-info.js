export default async(req, res) => {
    const url = `https://www.blockchain.com/prices/api/coin-data?fsym=ADA&tsym=USD`
    const result = await fetch(url)
    res.status(200).json(await result.json())
}
