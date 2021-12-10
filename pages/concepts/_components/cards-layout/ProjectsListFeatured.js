import {CardProject} from "../cards/ProjectLarge";

export const ProjectsListFeatured = ({title, extraClass}) => {
  return (

    <div className="projects-section">

      <div className="projects-section--header sr-only">
        <h2>Featured Pool</h2>
      </div>

      <div className="projects-list single">
        <CardProject
          title="The Parallel" 
          img="/placeholders/parallel-thumb.jpg"
          tokenLogo="/placeholders/parallel-token.png"
          raise="360,000 USDT"
          progressToken="72,000"
          target="10,000,000"
          progressPercentage="70%"
          type="public"
          token="PRL"
          countdown="4 days"
          status="open"
          network="BSC"
          link="project"
          tokenPrice="0.036 USDT"
          desc="The Parallel is Infinite Metaverse where players have limitless ability to create magical places - one of the most promising and highest potential upcoming Metaverse projects globally."
        />  
      </div>

    </div>

  )
}