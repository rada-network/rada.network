import { CardProject } from "@components/project/List/CardProject";
const ProjectPool = function({project}){
  let pools = project.project_pool.slice(0)
  pools.sort(function(a, b){
    return a.sort - b.sort
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-8">
      {pools.map((pool) => (
        <CardProject 
          key={pool.slug}
          project={project}
          pool={pool}
          status={project}
        />
      ))}
    </div>
  )
}
export default ProjectPool