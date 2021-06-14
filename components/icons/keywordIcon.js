import Link from "next/link"
export default function KeywordIcon({keyword,weight}){
  weight = parseFloat(weight)
  if (weight < 2.5 ){
    return ""
  }
  return (
    <Link href={`/tags/${keyword}`}>
      <a  className={`metadata badge project-metadata_type ` + `badge-${keyword}` } >
        <span className="metadata-value">{keyword}</span>
      </a>
    </Link>
  )
}