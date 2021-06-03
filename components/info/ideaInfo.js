import timeDifference from "../../lib/util";
import utils from "../../lib/util";

export default function IdeaInfo({item}){
  return (
    <div className="col-span-3">

      <div className="list-group-sm list-group-v project-info">

        <div className="list-group-item">
          <a className="mb-4 w-px-80 h-px-80 rounded-full overflow-hidden">
            <img src={item.ideaUser.avatarUri}/>
          </a>
          <span className="list-name">Owner</span>
          <a href={item.ideaUser.url} className="list-value" target="_blank" rel="nofollow">
            <span className="">
              {item.ideaUser.name}
            </span>
          </a>
        </div>

        <div className="list-group-item">
          <span className="list-name">Created at</span>
          <span className="list-value">
            {utils.timeDifference(new Date().getTime(),new Date(item.createdAt).getTime())}
          </span>
        </div>

        <div className="border-none list-group-item">
          <span className="hidden">Owner description</span>
          <span className="list-value" dangerouslySetInnerHTML={{__html: item.ideaUser.description}} />
        </div>

      </div>

    </div>
  )
}