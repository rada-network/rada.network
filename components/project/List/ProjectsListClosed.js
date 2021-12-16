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
              <>
                {project.project_pool.length > 0 &&
                  <>
                    {project.project_pool.map((pool) => (
                      <CardProject
                        project={project}
                        pool={pool}
                        title={project.title}
                        img={project.thumbnail_uri}
                        tokenLogo={project.thumbnail_uri}
                        raise={pool.raise}
                        progressToken="100,000"
                        target="100,000"
                        progressPercentage="100%"
                        type="vip"
                        token=""
                        endedin=""
                        status="claimable"
                        tokenPrice="0.035 USDT"
                        participian="325,000"
                      />
                    ))}
                  </>
                }
              </>
            ))}

          </div>

        </div>
      )}

    </>
  )
}