import { getTickets } from "../../../data/directus/getTickets";
//import { getSession } from "next-auth"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    const tickets = await getTickets(session.user)
    res.status(200).json(tickets)
  } else {
    // Not Signed in
    res.status(401).json({error: 'not login'})
  }
  res.end()
}