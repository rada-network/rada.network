import Link from "next/link"
export default function ItemTypeBadge({item}){
    return (
        <Link href={`/explore/${item.itemType}`}>
          <a  className={`metadata badge project-metadata_type ` + `badge-${item.itemType}` } >
            <span className="metadata-value">{item.itemType}</span>
          </a>
        </Link>
    )
}