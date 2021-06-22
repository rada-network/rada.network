import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
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

    <div className={`${styles.widget}`}>

      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} ${styles.widget_icon_fa}`}/>
        </span>
      </div> }

      <div className={`${styles.widget_body_p0}`}>

        <div className={`${styles.widget_list}`}>
          {_list.map(function (item) {

            return (
              <Influencer key={item.id} item={item} />
              )
          })}
        </div>

      </div>
      {(skip * take) < listInfluencers.length ?
        <div className={`${styles.widget_footer}`}>
          <a className="btn btn-nav block" onClick={() => setSkip(skip+1)}>
            <span className="btn-text">Show {take} more</span>
          </a>
        </div>
        :
        ""
      }


    </div>

  );
};