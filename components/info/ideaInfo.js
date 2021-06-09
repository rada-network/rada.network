import timeDifference from "../../lib/util";
import utils from "../../lib/util";

export default function IdeaInfo({item}){
  return (

    <div className="list-group-sm list-group-v project-info">

      <div className="list-group-item border-none">
        <a className="list-media w-px-64 h-px-64 rounded-full overflow-hidden">
          <img src={item.ideaUser.avatarUri}/>
        </a>
      </div>

      <div className="list-group-item">
        <span className="list-name">Owner</span>
        <a href={item.ideaUser.url} className="list-value" target="_blank" rel="nofollow">
          <span className="">
            {item.ideaUser.name}
          </span>
        </a>
      </div>

      <div className="list-group-item">
        <span className="list-name">Date</span>
        <span className="list-value">
          {utils.timeDifference(new Date().getTime(),new Date(item.createdAt).getTime())}
        </span>
      </div>

      <div className="list-group-item border-none">
        <span className="hidden">Owner description</span>
        <span className="list-value" dangerouslySetInnerHTML={{__html: item.ideaUser.description}} />
      </div>

    </div>

  )
}