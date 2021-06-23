import React from "react";
import Link from "next/link"
export default function ItemTypeIcon({projectType}){
    return (
        <>
        { projectType &&
        <Link href={`/explore/${projectType}`}>
          <a className={`metadata project-metadata_type project-metadata_type_${projectType.toLowerCase() || ""} `} > <span className="metadata-value">{projectType}</span> </a>
        </Link>
        }
        </>
    )
}