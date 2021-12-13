import {CardProject} from "@components/project/List/CardProjectSmall";
export default function ProjectsListClosed({title, extraClass}){

  return (
    <>

    <div className="projects-section">

      <div className="projects-section--subheader">
        <h3 className="">Funded Pools</h3>
      </div>

      <div className="projects-table">
        <CardProject
          title="Moniwar - Community" 
          img="https://media.rada.network/assets/026f4bd5-9741-4b9c-a075-0acfe7c86cb7?format=webp&width=1080"
          tokenLogo="./../../token-logos/moniwar.png"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="vip"
          token="MOWA"
          endedin="Jan 28, 2022"
          status="claimable"
          tokenPrice="0.035 USDT"
          participian="325,000"
        />
        <CardProject
          title="Thetan - Private"
          img="https://media.rada.network/assets/1659ec6e-3c7f-4da9-9edc-aa779726e58c?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/021fa100-b616-42be-8009-deea259d1db9?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="vip"
          token="THG"
          endedin="Jan 28, 2022"
          status="claimable"
          tokenPrice="0.035 USDT"
          participian="2,000,000"
        />

        <CardProject
          title="Heroverse - VIP" 
          img="https://media.rada.network/assets/5a380cca-fbd9-4cf5-9667-d1a85949bc9f?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/4f62c6d6-b3b3-4f07-85cc-e9b15c8676b8?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="community"
          token="HER"
          endedin="Jan 28, 2022"
          status="claimable"
          tokenPrice="0.035 USDT"
          participian="100"
        />

        <CardProject
          title="Elemon - Community"
          img="https://media.rada.network/assets/1648aeef-10de-44b5-a2a1-b3c9835ad63c?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/171ff579-8dcf-4751-be36-553a6a434021?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="community"
          token="ELMON"
          endedin="Jan 28, 2022"
          status="claimable"
          tokenPrice="0.035 USDT"
          participian="320,2500"
        />
        <CardProject
          title="My Mastery War - Community"
          img="https://media.rada.network/assets/a91592b5-a77c-44fd-9010-2740665e5006?format=webp&width=1080"
          tokenLogo="https://media.rada.network/assets/7b7b721f-9b6a-4d65-b54c-4aa14e42c4f2?format=webp&width=128"
          raise="45,000 USDT"
          progressToken="100,000"
          target="100,000"
          progressPercentage="100%"
          type="community"
          token="MAT"
          endedin="Jan 28, 2022"
          status="claimable"
          tokenPrice="0.035 USDT"
          participian="125,000"
        />
      </div>

    </div>
    </>
  )
}