import React from "react";

export default function ItemTypeIcon({projectType}){
    return (
        <>
        { projectType &&
        <a
            href={`/explore/${projectType}`}
            // className={`metadata project-metadata_type project-metadata_type_${
            className={`metadata project-metadata_type project-metadata_type_${
                projectType.toLowerCase() || ""
            } `}
        >
            <span className="metadata-value">{projectType}</span>
        </a> }
        </>
    )
}