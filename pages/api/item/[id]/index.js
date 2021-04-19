export default async (req, res) => {
    const {id} = req.query
    const result = await fetch(`${process.env.REMOTE_URL}?action=item&id=${id}`)
    const item = await result.json()
    res.status(200).json(item)
  }
  