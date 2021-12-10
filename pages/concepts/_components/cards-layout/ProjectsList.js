import {CardProject} from "../cards/Project";


export const ProjectsList = ({title, extraClass}) => {

  return (
    <>

    <div className="projects-section">

      <div className="projects-section--header">
        <h2 className="">Open Projects</h2>
      </div>

      <div className="projects-section--subheader">
        <h3 className="">Pool IDO</h3>
      </div>

      <div className="projects-list">
        <CardProject
          title="Moniwar" 
          img="https://media.rada.network/assets/026f4bd5-9741-4b9c-a075-0acfe7c86cb7?format=webp&width=1080"
          tokenLogo="./../../token-logos/moniwar.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="2%"
          type="public"
          token="MOWA"
          countdown="2 hours"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
        />
        <CardProject
          title="Thetan"
          img="https://media.rada.network/assets/1659ec6e-3c7f-4da9-9edc-aa779726e58c?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/021fa100-b616-42be-8009-deea259d1db9?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="80%"
          type="public"
          token="THG"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Form a team and battle with others while you earn token rewards based on your skills"
        />
        <CardProject
          title="Pegaxy"
          img="https://media.rada.network/assets/23115282-3877-4f7a-a794-04d709e30b35?format=webp&width=1080"
          tokenLogo="./../../token-logos/pegaxy.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="50%"
          type="public"
          token="PGX"
          status="open"
          desc="Racing game with futuristic mythological styling"
        />
      </div>

      <div className="projects-section--subheader">
        <h3 className="">Pool Community</h3>
      </div>

      <div className="projects-list">
        <CardProject
          title="Heroverse" 
          img="https://media.rada.network/assets/5a380cca-fbd9-4cf5-9667-d1a85949bc9f?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/4f62c6d6-b3b3-4f07-85cc-e9b15c8676b8?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="50%"
          type="community"
          token="HER"
          countdown="2 hours"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Pioneering #gamefi by integrating the mobile game category called Match-3 Games into blockchain and #gamefi"
        />

        <CardProject
          title="Elemon"
          img="https://media.rada.network/assets/1648aeef-10de-44b5-a2a1-b3c9835ad63c?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/171ff579-8dcf-4751-be36-553a6a434021?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="community"
          token="Elmon"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Elemon seeks to improve the limitations of the traditional gaming industry with transparency, inclusion, governance, and Play2Earn (P2E)"
        />
        <CardProject
          title="My Mastery War"
          img="https://media.rada.network/assets/a91592b5-a77c-44fd-9010-2740665e5006?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/7b7b721f-9b6a-4d65-b54c-4aa14e42c4f2?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="72%"
          type="community"
          token="MAT"
          status="open"
          tokenPrice="0.035 USDT"
          desc="Reminiscent of the long lost Three Kingdoms period, MyMasterWar enables Players to build their own empire in the MMW MetaVerse"
        />
      </div>

    </div>
    </>
  )
}