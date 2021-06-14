export default async(req, res) => {
    const {limit, interval} = req.query
    const url = `https://www.blockchain.com/prices/api/coin-chart-data-${interval}?fsym=ADA&tsym=USD&limit=${limit}&aggregate=1&format=json`
    const result = await fetch(url)
    res.status(200).json(await result.json())
}