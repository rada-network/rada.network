
export default async (req, res) => {
    const {id} = req.query
    if (req.method === 'POST') {
        // Build comment
        const vote = req.body
        if (!vote?.owner) return res.status(401).json({error: 'Connect wallet to vote'})

        const result = await fetch(`${process.env.REMOTE_URL}?action=vote`,
                {
                    body: JSON.stringify(vote),
                    header: {'Content-Type': 'application/json'},
                    method: 'POST'
                }
            )
        const output = await result.json()
        res.status(200).json(output)    
    } else {
        // Handle any other HTTP method
        const {owner} = req.body
        const result = await fetch(`${process.env.REMOTE_URL}?action=votes&id=${id}&owner=${owner}`)
        const votes = await result.json()
        res.status(200).json(votes)
    }

}
  