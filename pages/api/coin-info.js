export default async(req, res) => {
    const {fsym, tsym} = req.query
    const url = `https://www.blockchain.com/prices/api/coin-data?fsym=${fsym}&tsym=${tsym}`
    const result = await fetch(url, {mode:'no-cors'})
    res.status(200).json(await result.json())
}
