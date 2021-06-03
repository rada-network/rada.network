export default function TokenIcon({item,badge}){
    const projectPlatformShort = item.platform.name.substr(0,3)
    return (
        <a className={`metadata project-metadata_platform project-metadata_platform_${projectPlatformShort || ""} ` + (badge? `badge badge-${projectPlatformShort}` : "")}
        >
            <span className="icon"><i className={`cf cf-${item.token.symbol.toLowerCase()}`}/></span>
            <span className="metadata-value">{item.token.symbol}</span>
        </a>
    )
}