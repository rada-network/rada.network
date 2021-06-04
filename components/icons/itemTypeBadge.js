export default function ItemTypeBadge({item}){
    return (
        <a href={`/explore/${item.itemType}`} className={`metadata badge project-metadata_type ` + `badge-${item.itemType}` }>
            <span className="metadata-value">{item.itemType}</span>
        </a>
    )
}