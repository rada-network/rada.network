import {CardProject} from "../cards/Project";


export default function ProjectsList({title, extraClass}){

  return (
    <>

    <div className="projects-section">

      <div className="projects-section--subheader">
        <h3 className="">Open Pools</h3>
      </div>

      <div className="projects-list">
        <CardProject
          title="The Paralell - Open IDO" 
          img="./../../placeholders/parallel-cover.jpg"
          tokenLogo="./../../token-logos/theparallel.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="2%"
          type="public"
          token="PRL"
          countdown="2 hours"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
        />
        <CardProject
          title="The Paralell - Community" 
          img="./../../placeholders/parallel-cover.jpg"
          tokenLogo="./../../token-logos/theparallel.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="2%"
          type="public"
          token="PRL"
          countdown="2 hours"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
        />
        <CardProject
          title="DefiHorse - VIP"
          img="https://media.rada.network/assets/23115282-3877-4f7a-a794-04d709e30b35?format=webp&width=1080"
          tokenLogo="./../../token-logos/pegaxy.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="50%"
          type="vip"
          token="DFH"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Racing game with futuristic mythological styling"
        />
      </div>

    </div>
    </>
  )
}