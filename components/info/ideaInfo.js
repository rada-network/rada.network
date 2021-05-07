import timeDifference from "../../lib/util";

export default function IdeaInfo({item}){
  return (
    <div className="w-full mt-4 text-sm text-gray-900 text-opacity-50 md:w-64 md:pl-8 md:-mt-1 list-group-sm project-info">
      <div className="list-group-item">
        <strong className="uppercas">Idea User Info</strong>
      </div>
      <div className="pb-1 list-group-item">
        <a className="ml-2 font-medium text-gray-900 text-opacity-90">
          <img src={item.ideaUser.avatarUri}/>
        </a>
      </div>
      <div className="list-group-item">
        <span className="flex-1 w-20">Created at</span>
        <strong className="ml-2 font-medium text-right text-gray-900 text-opacity-90">{timeDifference(new Date().getTime(),new Date(item.createdAt).getTime())}</strong>
      </div>
      <div className="pb-1 list-group-item">
        <span className="flex-1 w-20">Owner</span>
        <a href={item.ideaUser.url} target="_blank" rel="nofollow"><strong className="ml-2 font-medium text-gray-900 text-opacity-90">
          {item.ideaUser.name}
        </strong></a>
      </div>
      <div className="pb-1 border-none list-group-item">
        <span className="flex-1 w-20">Owner description</span>
        <strong className="ml-2 font-medium text-gray-900 text-opacity-90">
          <div  dangerouslySetInnerHTML={{__html: item.ideaUser.description}} />
        </strong>
      </div>

    </div>
  )
}