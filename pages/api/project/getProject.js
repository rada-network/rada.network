import { getProject } from "@data/query/projects"

export default async (req, res) => {
  const slug = req.query.slug || ''
  const lang = req.query.lang || ''
  try{
    const data = await getProject({slug : slug, lang: lang})
    return res.status(200).json(data)
  }
  catch(e){
    return res.status(200).json({})
  }
  
}
