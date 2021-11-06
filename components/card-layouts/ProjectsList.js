import React, { useCallback, useEffect, useMemo, useState, createRef } from 'react';

//ReactIcons
import { IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import Link from "next/link"
import { observer } from "mobx-react";
import { CardProject } from "../cards/Project";
import ContentLoader from "react-content-loader";


export const ProjectsList = ({ projects }) => {
  // sort project by open date
  // projects.sort((a,b) => a.open_date >= b.open_date ? -1 : 1)
  const list = {
    active: [],
    closed: [],
    upcoming: []
  }
  projects.forEach(p => {
    if (list[p.status]) list[p.status].push(p)
  })

  // sort desc by open_date
  for (var name in list) {
    list[name].sort((a, b) => a.open_date >= b.open_date ? -1 : 1)
  }
  useEffect(() => {
  }, [])
  return (
    <div className="page page-full page-projects-list scrollbar">
      <div className="">
        <div className="">
          <div className="projects--wrapper single">
            {list.active.map(project => <CardProject key={project.id} project={project} />)}
          </div>
        </div>

        <div className="mt-4">
          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Upcoming Projects</h2>
          </div>

          <div className="projects--wrapper">
            {list.upcoming.map(project => <CardProject key={project.id} project={project} />)}
          </div>
        </div>

        <div className="mt-4">
          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Closed Projects</h2>
          </div>

          <div className="projects--wrapper">
            {list.closed.map(project => <CardProject key={project.id} project={project} />)}
          </div>
        </div>

        
      </div>
    </div>
  )
}