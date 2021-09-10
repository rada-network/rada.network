import {useEffect, useState} from 'react'
import fetchJson from "../../lib/fetchJson"
import LineChart from "../chart/LineChart"

import styles from '../../styles/modules/Widget.pricing.module.css'


import {RiExternalLinkLine} from "react-icons/ri";

import utils from "../../lib/util"

export const WidgetPricing = ({title, text, footer, projectPlatformShort}) => {

  //return <div className={`group ${styles.widget}`}><div className={`widget-header`}><div className={`widget-title`}>Pricing - temporary hide</div></div></div>

  const [loading, setLoading] = useState(false)
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
    const onResize = () => {
      // get widget size
      const box = document.getElementById('chart-box')
      const style = getComputedStyle(box)
      const w = box.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight)
      const h = Math.round(w/2)
      setSize({w, h})    
    };
    window.addEventListener("resize", onResize);
    onResize()

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  useEffect(() => {
    const loadData = () => {
      //setLoading(true)
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
        //setLoading(false)      
      })
    }
    let ti = setInterval(loadData, 60000)
    loadData()

    return () => clearInterval(ti)
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
      <div className="btn-group btn-group-filter">
        { times.map(t => (<span key={t} className={`btn w-full btn-filter time${t[1]==duration?' btn-filter-active':''}`} onClick={e => setDuration(t[1])}>{t[0]}</span>)) }
      </div>
    )
  }

  const PriceChange = () => {
    const change = data.change || 0
    const type = change >= 0 ? 'price-up' : 'price-down'
    // const Indicator = () => change >= 0 ? <span className={`${styles.sb__up}`}>+</span> : <span className={`${styles.sb__down}`}>-</span>

    return (
    <div className={`${styles.indicator}`} type={type}>
      {/* <Indicator /> */}
      {change > 0 && '+'}{(change * 100).toFixed(2)}%
    </div>
    )
  }

  const Price = () => (<div className={`${styles.value}`}>{data.price?.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>)

  const Loading = () => loading ? <p>Loading...</p> : ''

  // Token infomation
  const [info, setInfo] = useState({})
  useEffect(() => {

    // get token info
    fetchJson('/api/coin-info').then(res => {
      setInfo({
        Name: res.Data.CoinInfo.Name,
        MaxSupply: res.Data.CoinInfo.MaxSupply,
        AssetLaunchDate: res.Data.CoinInfo.AssetLaunchDate,
        Price: res.Data.AggregatedData.PRICE.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
        Change24h: res.Data.AggregatedData.CHANGE24HOUR,
        MacketCap: res.Data.AggregatedData.MKTCAP,
        Volume24h: res.Data.AggregatedData.TOTALVOLUME24H
      })
    })
  }, [])

  return (

    <div className={`widget widget-pricing`}>
      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`cf cf-${projectPlatformShort || 'btc'} widget-icon-cf`}/>
        </span>
      </div> }


      <div className={`widget-body-p0`}>

        <div className={`${styles.title}`}>Cardano Price (ADA)</div>

        <div className={`${styles.pricing}`}>
          <Price />
          <PriceChange />
        </div>
        {/* <Loading /> */}
        {/* Pricing Chart */}
        <div className={`${styles.chart}`} id="chart-box">
          <Duration />
          {/* <LineChart data={data} onChartHover={ (a,b) => '' } showLabels={true} svgWidth={size.w} svgHeight={size.h} /> */}
          <LineChart data={data.entries} showLabels={true} svgWidth={size.w} svgHeight={size.h} /> 
        </div>

        {/* Stats */}
        <div className={`widget-list-sm ${styles.widget_list_sm}`}>

          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Market Cap</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>{utils.currencyFormat(info.MacketCap)}</span>
              </div>
            </div>
          </div>

          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Volume (24h)</span>
              </div>
              <div className={`text-color-title info-row--value`}>
              <span>{utils.currencyFormat(info.Volume24h)}</span>
              </div>
            </div>
          </div>

          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">All Time High</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>$2.47</span>
              </div>
            </div>
          </div>

          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Volatility (30d)</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>1.56</span>
              </div>
            </div>
          </div>

        </div>

      </div> 

      <div className={`widget-footer`}>
        <div className={`widget-footer--text`}>
          Source: <a className="link" target={"_blank"} href="https://www.coindesk.com/price/cardano" rel="noreferrer">CoinDesk <span className="icon ml-1 -mb-0.5"><RiExternalLinkLine /></span></a>
        </div>
      </div>

    </div>

  );
};