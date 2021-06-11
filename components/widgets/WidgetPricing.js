import styles from '../../styles/modules/Widget.module.css'
import stylesPricing from '../../styles/modules/Widget.pricing.module.css'

import {useEffect, useState} from 'react'
import fetchJson from "../../lib/fetchJson"
import LineChart from "../chart/LineChart"


export const WidgetPricing = ({title, text, footer, projectPlatformShort}) => {

  const [duration, setDuration] = useState(24)
  const [data, setData] = useState([])
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - duration * 60 * 60 * 1000)
  const fdate = d => d.toISOString().substr(0, 16)
  const url = `https://production.api.coindesk.com/v2/price/values/ADA?start_date=${fdate(startDate)}&end_date=${fdate(endDate)}&ohlc=false`
  
  useEffect(() => {
    fetchJson(url).then(res => {
      const sortedData = [];
      let count = 0;
      res.data.entries.forEach((c, idx) => {
        sortedData.push({
          d: '', //new Date(c[0]).toISOString(),
          p: c[1].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
          x: count, //previous days
          y: c[1] // numerical price
        });
        count++;
      })

      setData(sortedData)
    })
  }, [duration])

  const Duration = () => {
    const times = [
      ['1h', 1],
      ['1d', 24],
      ['1w', 24*7],
      ['1m', 24*7*30],
      ['3m', 24*7*90],
      ['1y', 24*7*365],
    ]

    return (
      <div className="times">
        { times.map(t => (<span className={`time${t[1]==duration?' active':''}`} onClick={e => setDuration(t[1])}>{t[0]}</span>)) }
      </div>
    )
  }

  return (

    <div className={`group ${styles.widget}`}>
      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`cf cf-${projectPlatformShort || 'btc'} ${styles.widget_icon_cf}`}/>
        </span>
      </div> }
      { text &&
      <div className={`${styles.widget_body}`}>

        <div className={`${stylesPricing.title}`}>Cardano Price (ADA)</div>

        <div className={`${stylesPricing.pricing}`}>
          <div className={`${stylesPricing.value}`}>$1.58</div>
          <div className={`${stylesPricing.indicator}`} type="price-up">
            <span className={`${stylesPricing.sb__up}`}>+</span>0.45%
          </div>
          {/* <div className={`${stylesPricing.indicator}`} type="price-down">
            <span className={`${stylesPricing.sb__down}`}>-</span>0.45%
          </div> */}
        </div>

        {/* Pricing Chart */}
        <div className={`${stylesPricing.chart}`}>
          <Duration />
          <LineChart data={data} onChartHover={ (a,b) => '' } showLabels={false} svgWidth={400} /> 
        </div>


      </div> }
      { footer &&
      <div className={`${styles.widget_footer}`}>
        <div className={`${styles.widget_text}`}>{footer}</div>
      </div> }
    </div>

  );
};