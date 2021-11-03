import React, { useCallback, useEffect, useMemo, useState, createRef } from 'react';

//ReactIcons
import { IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import Link from "next/link"
import { observer } from "mobx-react";
import { CardProject } from "../cards/Project";
import ContentLoader from "react-content-loader";


export const ProjectsList = ({ projects }) => {

  return (
    <div className="page page-full page-projects-list scrollbar">
      <div className="mt-4">
        <div className="section-header ml-2">
          <h2 className="p-2 font-semibold">Closed Projects</h2>
        </div>
        <div className="projects--wrapper">
          {
            projects.map(project => <CardProject project={project} />)
          }
        </div>
      </div>
    </div>
  )
}