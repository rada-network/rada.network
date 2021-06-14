import styles from '../../styles/modules/Widget.module.css'
import stylesPricing from '../../styles/modules/Widget.pricing.module.css'
import stylesStats from '../../styles/modules/Widget.stats.module.css'

import {useEffect, useState} from 'react'
import fetchJson from "../../lib/fetchJson"
import LineChart from "../chart/LineChart"

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetPricing = ({title, text, footer, projectPlatformShort}) => {

  const [size, setSize] = useState({w: 300, h: 150})
  const [duration, setDuration] = useState(24)
  const [data, setData] = useState({})
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - duration * 60 * 60 * 1000)
  const fdate = d => d.toISOString().substr(0, 16)
  
  let limit = duration 
  let interval = 'hour'
  if (limit < 100) {
    // convert interval to minute
    interval = 'minute'
    limit *= 60
  } else if (limit > 2000) {
    // convert interval to day
    interval = 'day'
    limit /= 24
  }

  const url = `/api/chart-data?limit=${limit}&interval=${interval}`
  // const url = `https://production.api.coindesk.com/v2/price/values/ADA?start_date=${fdate(startDate)}&end_date=${fdate(endDate)}&ohlc=false`
  
  const fd = d => {
    const date = new Date(d)
    if (duration <= 24) {
      return date.toTimeString().substr(0, 5)
    } else {
      return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
    }
  }

  useEffect(() => {
    fetchJson(url).then(res => {
      const entries = [];
      let count = 0;

      const batch = limit > 1000 ? 15 : limit > 500 ? 6 : 1
      res.entries.forEach((c, idx) => {
        if ((idx-1) % batch == 0) {
          const p = parseFloat(c.close)
          entries.push({
            d: fd(c.time*1000),
            p: p.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            x: count, //previous days
            y: p // numerical price
          });
          count++;
        }
      })

      setData({entries, price: res.price, change: res.change})
    })

    // get widget size
    const w = document.getElementById('chart-box').clientWidth
    const h = Math.round(w/2)
    setSize({w, h})
  }, [duration])

  const Duration = () => {
    const times = [
      // ['1h', 1],
      ['1d', 24],
      ['1w', 24*7],
      ['1m', 24*30],
      ['3m', 24*90],
      ['1y', 24*365],
    ]

    return (
      <div className="btn-group flex px-1 py-1 bg-gray-100 text-xs rounded">
        { times.map(t => (<span className={`btn rounded bg-white text-gray-400 bg-opacity-0 px-3 w-full justify-center py-1 time${t[1]==duration?' bg-opacity-100 shadow-sm text-gray-900':''}`} onClick={e => setDuration(t[1])}>{t[0]}</span>)) }
      </div>
    )
  }

  const PriceChange = () => {
    const change = data.change || 0
    const type = change >= 0 ? 'price-up' : 'price-down'
    // const Indicator = () => change >= 0 ? <span className={`${stylesPricing.sb__up}`}>+</span> : <span className={`${stylesPricing.sb__down}`}>-</span>

    return (
    <div className={`${stylesPricing.indicator}`} type={type}>
      {/* <Indicator /> */}
      {change > 0 && '+'}{(change * 100).toFixed(2)}%
    </div>
    )
  }

  const Price = () => (<div className={`${stylesPricing.value}`}>{data.price}</div>)

  return (

    <div className={`group ${styles.widget}`}>
      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`cf cf-${projectPlatformShort || 'btc'} ${styles.widget_icon_cf}`}/>
        </span>
      </div> }


      <div className={`${styles.widget_body_p0}`}>

        <div className={`${stylesPricing.title}`}>Cardano Price (ADA)</div>

        <div className={`${stylesPricing.pricing}`}>
          <Price />
          <PriceChange />
        </div>

        {/* Pricing Chart */}
        <div className={`${stylesPricing.chart}`} id="chart-box">
          <Duration />
          {/* <LineChart data={data} onChartHover={ (a,b) => '' } showLabels={true} svgWidth={size.w} svgHeight={size.h} /> */}
          <LineChart data={data.entries} onChartHover={ (a,b) => '' } showLabels={true} svgWidth={size.w} svgHeight={size.h} /> 
        </div>

        {/* Stats */}
        <div className={`${styles.widget_list_sm} ${stylesPricing.widget_list_sm}`}>

          <div className={`group ${styles.widget_list_sm__item}`}>
            <div className={`${stylesStats.stat}`}>
              <div className={`${stylesStats.title}`}>
                <span title="">Market Cap</span>
              </div>
              <div className={`${stylesStats.value}`}>
                <span>$48.83B</span>
              </div>
            </div>
          </div>

          <div className={`group ${styles.widget_list_sm__item}`}>
            <div className={`${stylesStats.stat}`}>
              <div className={`${stylesStats.title}`}>
                <span title="">Volume (24h)</span>
              </div>
              <div className={`${stylesStats.value}`}>
                <span>$8.19M</span>
              </div>
            </div>
          </div>

          <div className={`group ${styles.widget_list_sm__item}`}>
            <div className={`${stylesStats.stat}`}>
              <div className={`${stylesStats.title}`}>
                <span title="">All Time High</span>
              </div>
              <div className={`${stylesStats.value}`}>
                <span>$2.47</span>
              </div>
            </div>
          </div>

          <div className={`group ${styles.widget_list_sm__item}`}>
            <div className={`${stylesStats.stat}`}>
              <div className={`${stylesStats.title}`}>
                <span title="">Volatility (30d)</span>
              </div>
              <div className={`${stylesStats.value}`}>
                <span>1.56</span>
              </div>
            </div>
          </div>

        </div>

      </div> 

      <div className={`${styles.widget_footer}`}>
        <div className={`${styles.widget_footer_text}`}>
          Source: <a href="https://www.coindesk.com/price/cardano">CoinDesk <span className="icon ml-1 -mb-0.5"><RiExternalLinkLine /></span></a>
        </div>
      </div>

    </div>

  );
};