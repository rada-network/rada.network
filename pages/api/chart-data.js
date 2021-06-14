export default async(req, res) => {
    const {limit, interval} = req.query
    const url = `https://www.blockchain.com/prices/api/coin-chart-data-${interval}?fsym=ADA&tsym=USD&limit=${limit}&aggregate=1&format=json`
    const result = await fetch(url)
    const data = await result.json()
    const entries = data.Data.Data
    const price = entries[entries.length-1].close
    const price1 = entries[0].open
    const change = (price - price1) / price1
    res.status(200).json({
        price,
        change,
        entries
    })
}