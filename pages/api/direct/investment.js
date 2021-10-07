import { getTickets } from "../../../data/directus/getTickets";

export default async(req, res) => {
    //const {fsym, tsym} = req.query
    const tickets = await getTickets()
    res.status(200).json(tickets)
}
