import Link from "next/link"

import {RiExternalLinkLine} from "react-icons/ri";
import {useEffect, useState} from "react";
import {getCardanoEvents} from "../../data/query/getEvents";
import {uuid} from "@walletconnect/utils";


const EventKeyword = ({word}) =>{
  const cWord = word.trim().toLowerCase()
  if (cWord === ""){
    return ""
  }
  word = word.charAt(0).toUpperCase() + word.slice(1)
  return (
    <span className={`metadata badge widget-metadata ${cWord}`}>
      {word}
    </span>
  )
}

const EventItem = ({item}) => {
  const startDate = new Date(item.startedAt)
  const endDate = new Date(item.endedAt)
  const currentDate = new Date()
  const day = Math.round((startDate.getTime() - currentDate.getTime()) / (1000 * 24 * 60 * 60))
  const endDay = Math.round((endDate.getTime() - currentDate.getTime()) / (1000 * 24 * 60 * 60))



  const url = item.website ? item.website : item.twitter
  const keywords = item.keywords !== null ? item.keywords.split(",") : []
  return (
    <Link href={url} target="_blank" rel={'nofollow'}>
      <div className={`group widget-list--item widget-list--link`}>

        <div className={`widget-list--item--title`}>
          <a className={`widget-list--link`} rel={'nofollow'} href={url} target="_blank">
            <span className="text-color-title">{item.title}</span>
            <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
          </a>
        </div>

        <div className={`metadata-wrapper widget-metadata-wrapper`}>
          {keywords.map(function (word) {
            return (
              <EventKeyword key={uuid()} word={word}/>
            )
          })}
          {endDay < 0 ?
            <>
              <span className={`metadata widget-metadata badge badge-transparent`} type="event-expired">
                Expired
              </span>
              <span className={`metadata widget-metadata badge badge-transparent`} title={item.startedAt}>
                  <strong className="text-color-title">{Math.abs(endDay)}d</strong>&nbsp;ago
              </span>
            </>
            :
            (day > 0) ?
            <span className={`metadata widget-metadata badge badge-transparent`} title={item.startedAt}>
                <strong className="text-color-title">{day}d</strong>&nbsp;to go
            </span>
            :  <span className={`metadata badge badge-transparent`} title={item.startedAt}>
              Ongoing
            </span>
          }

        </div>

        <div className={`text-color-desc widget-list--item--text`}>
          {item.description}
        </div>

      </div>
    </Link>
  )
}

export const WidgetEvents = ({title, widgetIcon, widgetIconColor}) => {

  const [listEvents, setListEvents] = useState([])
  const [skip, setSkip] = useState(1)
  const take = 4
  useEffect(() => {
    getCardanoEvents({}).then(function (res) {
      let data = res.data.cardanoEventFeed.map(function (item) {
        const item_ = Object.assign({},item)
        item_['time'] = (new Date(item_.startedAt)).getTime()
        return item_;
      })
      data = data.sort(function(x,y){
        return y.time - x.time
      })
      setListEvents(data)
    })
  }, [])
  const _list = listEvents.slice(0, skip * take)

  return (

    <div className={`widget widget-event`}>

      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} widget-icon-fa`}/>
        </span>
      </div> }

      <div className={`widget-body-p0`}>

        <div className={`widget-list`}>

          {/* Even Item */}
          {_list.map(function (item) {
            return (
              <EventItem key={item.id} item={item}/>
            )
          })}

        </div>

      </div>

      {(skip * take) < listEvents.length ?
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