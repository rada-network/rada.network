import React from "react";

export default function NetworkIcon({projectPlatform,projectPlatformShort,projectWebsiteUri,badge}){
    return (
        <>
            { projectPlatform &&
            <a rel={"nofollow"} target={"_blank"} href={projectWebsiteUri}
               className={`metadata project-metadata_platform project-metadata_platform_${projectPlatformShort || ""} ` + (badge? `badge badge-${projectPlatformShort}` : "")}
            >
              {/* <img className="card-img" src={`./node_modules/cryptocurrency-icons/svg/color/${projectPlatformShort || ''}.svg`} /> */}
              <span className="icon mr-1.5">
                {/*networkName: polkadot, tron, cardano, eth, bsc, solana, ripple,*/}
                {/* available: cf-sol cf-eth cf-car, unavailable: cf-tron cf-bsc cf-polkadot cf-ripple icon*/}
                <i className={`cf cf-${projectPlatformShort || 'btc'} text-base`}/>
              </span>
              <span className="metadata-value">{projectPlatform}</span>
            </a> }
        </>
    )
}