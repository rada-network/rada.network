import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
import stylesEvent from '../../styles/modules/Widget.events.module.css'

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
    <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-important">
      {word}
    </span>
  )
}

const EventItem = ({item}) => {
  const startDate = new Date(item.startedAt)
  const currentDate = new Date()
  const day = Math.round((startDate.getTime() - currentDate.getTime())/(1000*24*60*60))

  const url = item.website ? item.website : item.twitter
  const keywords = item.keywords !== null ? item.keywords.split(",") : []
  return (
    <a href={url} className={`${styles.widget_list__link}`} rel={'nofollow'} target="_blank">
      <div className={`group ${styles.widget_list__item}`}>
        <div className={`${styles.widget_list}`}>

          {/* Even Item */}
          <Link href="#" target="_blank">
          <div className={`group ${styles.widget_list__item} ${styles.widget_list__link}`}>

        <div className={`${stylesEvent.title}`}>
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
                <span>{item.title}</span>
          <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine/></span>
              </a>
        </div>
        <div className={`${stylesEvent.info_wrapper}`}>
          {keywords.map(function (word) {
            return (
              <EventKeyword key={uuid()} word={word}/>
            )
          })}
          {day > 0 ?
            <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="00:00, 30, Sep 2021">
                  <strong>{day}d</strong> to go
              </span>
            : ""
          }
        </div>
        <div className={`${stylesEvent.text}`}>
          {item.description}
        </div>

      </div>
    </Link>
  )
}

export const WidgetEvents = ({title, widgetIcon, widgetIconColor}) => {
          {/* Even Item */}
          <Link href="#" target="_blank">
          <div className={`group ${styles.widget_list__item} ${styles.widget_list__link}`}>

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
    <div className={`${styles.widget}`}>

      {title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} ${styles.widget_icon_fa}`}/>
            <div className={`${stylesEvent.title}`}>
              <a className={`${styles.widget_list__link}`} href="#" target="_blank">
                <span>Cardano First Ever Airdrop</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </a>
            </div>
            <div className={`${stylesEvent.info_wrapper}`}>
              <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-airdrop">
                Airdrop
        </span>
      </div>}

      <div className={`${styles.widget_body_p0}`}>
          </div>
          </Link>

        <div className={`${styles.widget_list}`}>
          {_list.map(function (item) {
            return (
              <EventItem key={item.id} item={item}/>
            )
          })}
          {/* Even Item */}
          <Link href="#" target="_blank">
          <div className={`group ${styles.widget_list__item} ${styles.widget_list__link}`}>

            <div className={`${stylesEvent.title}`}>
              <a className={`${styles.widget_list__link}`} href="#" target="_blank">
                <span>Cardano First Ever Launchpad</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </a>
            </div>
            <div className={`${stylesEvent.info_wrapper}`}>
              <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-launchpad">
                Launchpad
              </span>
              <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="19:00, 30, Sep 2021">
                <strong>5d 23h</strong> to go
              </span>
            </div>
            <div className={`${stylesEvent.text}`}>
              "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
        </div>

      </div>
          </Link>

          {/* Even Item */}
          <Link href="#" target="_blank">
          <div className={`group ${styles.widget_list__item} ${styles.widget_list__link}`}>

      {(skip * take) < listEvents.length ?
            <div className={`${stylesEvent.title}`}>
              <a className={`${styles.widget_list__link}`} href="#" target="_blank">
                <span>Cardano First Ever Launchpad</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </a>
            </div>
            <div className={`${stylesEvent.info_wrapper}`}>
              <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-launchpad">
                Launchpad
              </span>
              <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-expired">
                Expired
              </span>
              <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="19:00, 30, Sep 2021">
                <strong>25d</strong> ago
              </span>
            </div>
            <div className={`${stylesEvent.text}`}>
              "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
            </div>

          </div>
          </Link>

        </div>

      </div>

        <div className={`${styles.widget_footer}`}>
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