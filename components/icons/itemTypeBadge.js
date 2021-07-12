import Link from "next/link"
export default function ItemTypeBadge({item}){
    return (
        <Link href={`/explore/${item.ideaType}`}>
          <a  className={`metadata badge project-metadata_type ` + `badge-${item.ideaType}` } >
            <span className="metadata-value">{item.ideaType}</span>
          </a>
        </Link>
    )
}