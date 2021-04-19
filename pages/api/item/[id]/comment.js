

const validateComment = comment => {
    return true
}

export default async (req, res) => {
    const {id} = req.query

    if (req.method === 'POST') {
        // Build comment
        const comment = req.body
        if (!comment?.owner) return res.status(401).json({error: 'Connect wallet to post comment'})
        const result = await fetch(`${process.env.REMOTE_URL}?action=comment`,
                {
                    body: JSON.stringify(comment),
                    header: {'Content-Type': 'application/json'},
                    method: 'POST'
                }
            )
        const output = await result.json()
        res.status(200).json(output)    
    } else {
        // Handle any other HTTP method
        const result = await fetch(`${process.env.REMOTE_URL}?action=comments&id=${id}`)
        const comments = await result.json()
        res.status(200).json(comments)
    }

}
  