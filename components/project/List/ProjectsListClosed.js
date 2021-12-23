import { CardProject } from "@components/project/List/CardProjectSmall";
import { poll } from "@ethersproject/web";
import { useEffect } from "react";
export default function ProjectsListClosed({ title, extraClass, projects }) {
  let pools = [];
  for (let project of projects) {
    pools.push(...project.project_pool)
  }
  useEffect(() => {
    
  }, [])
  return (
    <>
      {pools.length > 0 && (

        <div className="projects-section">

          <div className="projects-section--subheader">
            <h3 className="">Funded Pools</h3>
          </div>

          <div className="projects-table">
            {projects.map((project, index) => (
              <div key={index} className="">
                {project.project_pool.length > 0 &&
                  <>
                    {project.project_pool.map((pool) => (
                      <CardProject key={project.slug + pool.slug}
                        project={project}
                        pool={pool}
                        title={project.content.title + " " + pool.title}
                        img={project.thumbnail_uri}
                        tokenLogo={project.thumbnail_uri}
                        raise={pool.raise}
                        progressToken={pool.raise}
                        target={pool.raise}
                        status="claimable"
                        participian="N/A"
                      />
                    ))}
                  </>
                }
              </div>
            ))}

          </div>

        </div>
      )}

    </>
  )
}