import Link from "next/link"

import {useEffect, useState} from "react";
import {getInfluencers} from "../../data/query/getSuggestUser";
import {Influencer} from "./influencer";

export const WidgetInfluencers = ({title, widgetIcon, widgetIconColor}) => {
  const [listInfluencers,setListInfluencers] = useState([])
  const [skip,setSkip] = useState(1)
  const take = 4
  useEffect(() => {
    getInfluencers({}).then(function(res){
      setListInfluencers(res.data.suggestUserFeed)
    })
  },[])
  const _list = listInfluencers.slice(0,skip * take)

  return (

    <div className={`widget widget-influencers`}>

      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>{title}</div>
        <span className={`widget-icon`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} widget-icon-fa`}/>
        </span>
      </div> }

      <div className={`widget-body-p0`}>

        <div className={`widget-list`}>
          {_list.map(function (item) {
            return (
              <Influencer key={item.id} item={item} />
              )
          })}
        </div>

      </div>
      {(skip * take) < listInfluencers.length ?
        <div className={`widget-footer`}>
          <a className="btn btn-nav block" onClick={() => setSkip(skip+1)}>
            <span className="btn__text">Show {take} more</span>
            <span className="btn__caret_down"></span>
          </a>
        </div>
        :
        ""
      }

    </div>

  );
};