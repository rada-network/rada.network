import Link from "next/link"
import {useEffect, useState} from 'react'

import {RiExternalLinkLine} from "react-icons/ri";
import fetchJson from "../../lib/fetchJson"

import ReactTooltip from 'react-tooltip'

export const WidgetStats = ({title, widgetIcon, widgetIconColor}) => {
  // const [info, setInfo] = useState({})
  // useEffect(() => {
  //   // get token info
  //   fetchJson('/api/coin-info').then(res => {
  //     setInfo({
  //       Name: res.Data.CoinInfo.Name,
  //       MaxSupply: res.Data.CoinInfo.MaxSupply,
  //       AssetLaunchDate: res.Data.CoinInfo.AssetLaunchDate,
  //       Price: res.Data.AggregatedData.PRICE.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
  //       Change24h: res.Data.AggregatedData.CHANGE24HOUR,
  //       MacketCap: res.Data.AggregatedData.MKTCAP
  //     })
  //   })
  // }, [])

  return (

    <div className={`widget widget-stats`}>

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

        <div className={`widget-list-sm`}>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Blocks</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>5,836,414</span>
              </div>
            </div>
          </div>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Transactions</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>8,760,241</span>
              </div>
            </div>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="Transactions Amount">Total Amount</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>10,531,106,458,046</span>
                <span className={`currency-ada`}>
                  <svg width="1em" height="1em" viewBox="0 0 37.042 44.185" xmlns="http://www.w3.org/2000/svg" data-svg="ada"><g transform="translate(0 -252.81)" fill="none" stroke="" strokeLinecap="round" strokeWidth="3.9688"><path d="m2.0126 279.93h33.016"></path><path d="m3.1099 294.84 15.411-40.045 15.789 40.191" strokeLinejoin="round"></path><path d="m5.7168 272h25.608"></path></g></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Staking Pools</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>2,576</span>
              </div>
            </div>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Total Stake</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>23,028,019,601</span>
                <span className={`currency-ada`}>
                  <svg width="1em" height="1em" viewBox="0 0 37.042 44.185" xmlns="http://www.w3.org/2000/svg" data-svg="ada"><g transform="translate(0 -252.81)" fill="none" stroke="" strokeLinecap="round" strokeWidth="3.9688"><path d="m2.0126 279.93h33.016"></path><path d="m3.1099 294.84 15.411-40.045 15.789 40.191" strokeLinejoin="round"></path><path d="m5.7168 272h25.608"></path></g></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Delegators</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>631,472</span>
              </div>
            </div>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Total Rewards</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>839,164,436</span>
                <span className={`currency-ada`}>
                  <svg width="1em" height="1em" viewBox="0 0 37.042 44.185" xmlns="http://www.w3.org/2000/svg" data-svg="ada"><g transform="translate(0 -252.81)" fill="none" stroke="" strokeLinecap="round" strokeWidth="3.9688"><path d="m2.0126 279.93h33.016"></path><path d="m3.1099 294.84 15.411-40.045 15.789 40.191" strokeLinejoin="round"></path><path d="m5.7168 272h25.608"></path></g></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Accounts</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>1,098,824</span>
              </div>
            </div>
          </div>

          {/* Stat Item */}
          <div className={`group widget-list-sm--item`}>
            <div className={`info-row`}>
              <div className={`text-color-desc info-row--title`}>
                <span title="">Nondelegated Tokens</span>
              </div>
              <div className={`text-color-title info-row--value`}>
                <span>8,771,086,790</span>
                <span className={`currency-ada`}>
                  <svg width="1em" height="1em" viewBox="0 0 37.042 44.185" xmlns="http://www.w3.org/2000/svg" data-svg="ada"><g transform="translate(0 -252.81)" fill="none" stroke="" strokeLinecap="round" strokeWidth="3.9688"><path d="m2.0126 279.93h33.016"></path><path d="m3.1099 294.84 15.411-40.045 15.789 40.191" strokeLinejoin="round"></path><path d="m5.7168 272h25.608"></path></g></svg>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className={`widget-footer`}>
        <div className={`widget-footer--text`}>
          Source: <a className="link" target={"_blank"} href="https://adastat.net/">AdaStat <span className="icon ml-1 -mb-0.5"><RiExternalLinkLine /></span></a>
        </div>
      </div>

    </div>

  );
};