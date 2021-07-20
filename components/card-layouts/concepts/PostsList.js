import React, {useCallback, useEffect, useMemo, useState, createRef} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../../button/tabButton";
import WidgetTitle from "../../text/widgetTitle";
import {CardPost} from "../../cards/concepts/Post";
import ContentLoader from "react-content-loader";

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

const scrollBox = createRef();
let ps;

export const PostsList = ({title, extraClass}) => {

  const [scrollbar] = useState('')

  useEffect(() => {
    // make scrollbar
    ps = new PerfectScrollbar(scrollBox.current, {
    });

    return () => {
      ps.destroy();
    }
  }, [scrollBox]);

  return (
    <div className={`section ${extraClass || ''}`}>

      <div className={`section-header`}>
        <div className={`section-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <div class="section-cta">
          <div className="btn-group btn-group-filter">
            <a className="btn btn-filter">Popular</a>
            <a className="btn btn-filter-active">Latest</a>
          </div>
        </div>
      </div>

      <div className={`section-body no-padding scrollbar`} ref={scrollBox}>
        <div className={`grid gap-0`}>

        <CardPost
            title="Republican Senator Highlights Bitcoin’s Battle in Shedding Criminal Baggage"
            mediaUri="https://picsum.photos/80/80?random=1"
            type="fab fa-youtube"
            source="Benson Crypto"
            commentCount="3"
            voteCount="4"
          />

          <CardPost
            title="DeFi Yield Farming Aggregator ApeRocket Suffers $1.26M ‘Flash Loan’ Attack"
            mediaUri="https://picsum.photos/80/80?random=2"
            type="fad fa-code"
            source="Project Catalyst"
            commentCount="2"
            voteCount="2"
          />

          <CardPost
            title="This Group of Investors Drives Bitcoin Bull Markets, According to Analyst Willy Woo – And It’s Not Whales"
            mediaUri="https://picsum.photos/80/80?random=3"
            type="fad fa-newspaper"
            source="DailyHodl"
            commentCount="0"
            voteCount="0"
          />

          <CardPost
            title="Whales Are Quietly Pouncing on Ethereum As Crypto Market Meanders, According to Analytics Firm Santiment"
            mediaUri="https://picsum.photos/80/80?random=4"
            type="fab fa-twitter"
            source="@Grayscale"
            commentCount="99"
            voteCount="12"
          />

          <CardPost
            title="DeFi Yield Farming Aggregator ApeRocket Suffers $1.26M ‘Flash Loan’ Attack"
            mediaUri="https://picsum.photos/80/80?random=5"
            type="fab fa-spotify"
            source="CRYPTO 101"
            commentCount="2"
            voteCount="3"
          />

          <CardPost
            title="Ethereum Co-Founder to Sell Firm, Quit Cryptocurrency: Report"
            mediaUri="https://picsum.photos/80/80?random=6"
            type="fad fa-newspaper"
            source="CryptoTalk"
            commentCount="4"
            voteCount="0"
          />

          <CardPost
            title="China’s Digital Yuan Will Utilize Smart Contracts"
            mediaUri="https://picsum.photos/80/80?random=7"
            type="fad fa-newspaper"
            source="CoinDesk"
            commentCount="22"
            voteCount="35"
          />

          <CardPost
            title="The future will be decentralized | Charles Hoskinson | TEDxBermuda’ Attack"
            mediaUri="https://picsum.photos/80/80?random=8"
            type="fab fa-youtube"
            source="Coin Bureau"
            commentCount="5"
            voteCount="8"
          />

          <CardPost
            title="Bitcoin: Is this a point of maximum financial opportunity?"
            mediaUri="https://picsum.photos/80/80?random=9"
            type="fad fa-newspaper"
            source="U.Today"
            commentCount="15"
            voteCount="57"
          />

          <CardPost
            title="Tokenized ADA for Yield Farming"
            mediaUri="https://picsum.photos/80/80?random=10"
            type="fad fa-code"
            source="Project Catalyst"
            commentCount="0"
            voteCount="4"
          />

          <CardPost
            title="Gauntlets of Catalyst Courts"
            mediaUri="https://picsum.photos/80/80?random=11"
            type="fad fa-code"
            source="Project Catalyst"
            commentCount="0"
            voteCount="2"
          />

          <CardPost
            title="$31.5K Bitcoin price on track for lowest weekly close of 2021"
            mediaUri="https://picsum.photos/80/80?random=12"
            type="fad fa-newspaper"
            source="CoinTelegraph"
            commentCount="1"
            voteCount="2"
          />

          <CardPost
            title="Republican Senator Highlights Bitcoin’s Battle in Shedding Criminal Baggage"
            mediaUri="https://picsum.photos/80/80?random=1"
            type="fab fa-youtube"
            source="TEDx Talks"
            commentCount="3"
            voteCount="4"
          />

          <CardPost
            title="DeFi Yield Farming Aggregator ApeRocket Suffers $1.26M ‘Flash Loan’ Attack"
            mediaUri="https://picsum.photos/80/80?random=2"
            type="fad fa-code"
            source="Project Catalyst"
            commentCount="2"
            voteCount="2"
          />

          <CardPost
            title="This Group of Investors Drives Bitcoin Bull Markets, According to Analyst Willy Woo – And It’s Not Whales"
            mediaUri="https://picsum.photos/80/80?random=3"
            type="fad fa-newspaper"
            source="DailyHodl"
            commentCount="0"
            voteCount="0"
          />

          <CardPost
            title="Whales Are Quietly Pouncing on Ethereum As Crypto Market Meanders, According to Analytics Firm Santiment"
            mediaUri="https://picsum.photos/80/80?random=4"
            type="fad fa-newspaper"
            source="CoinDesk"
            commentCount="99"
            voteCount="12"
          />

          <CardPost
            title="DeFi Yield Farming Aggregator ApeRocket Suffers $1.26M ‘Flash Loan’ Attack"
            mediaUri="https://picsum.photos/80/80?random=5"
            type="fab fa-spotify"
            source="Spotify"
            commentCount="2"
            voteCount="3"
          />

          <CardPost
            title="Ethereum Co-Founder to Sell Firm, Quit Cryptocurrency: Report"
            mediaUri="https://picsum.photos/80/80?random=6"
            type="fad fa-newspaper"
            source="CryptoTalk"
            commentCount="4"
            voteCount="0"
          />

          <CardPost
            title="China’s Digital Yuan Will Utilize Smart Contracts"
            mediaUri="https://picsum.photos/80/80?random=7"
            type="fad fa-newspaper"
            source="CoinDesk"
            commentCount="22"
            voteCount="35"
          />

          <CardPost
            title="The future will be decentralized | Charles Hoskinson | TEDxBermuda’ Attack"
            mediaUri="https://picsum.photos/80/80?random=8"
            type="fab fa-youtube"
            source="Crypto Capital Venture"
            commentCount="5"
            voteCount="8"
          />

          <CardPost
            title="Bitcoin: Is this a point of maximum financial opportunity?"
            mediaUri="https://picsum.photos/80/80?random=9"
            type="fad fa-newspaper"
            source="U.Today"
            commentCount="15"
            voteCount="57"
          />

          <CardPost
            title="Tokenized ADA for Yield Farming"
            mediaUri="https://picsum.photos/80/80?random=10"
            type="fad fa-code"
            source="Project Catalyst"
            commentCount="0"
            voteCount="4"
          />

          <CardPost
            title="Missed the #BinanceTurns4 concert experience? The video is still available for a few more days!"
            mediaUri="https://picsum.photos/80/80?random=11"
            type="fab fa-twitter"
            source="@binance"
            commentCount="0"
            voteCount="2"
          />

          <CardPost
            title="$31.5K Bitcoin price on track for lowest weekly close of 2021"
            mediaUri="https://picsum.photos/80/80?random=12"
            type="fad fa-newspaper"
            source="CoinTelegraph"
            commentCount="1"
            voteCount="2"
          />

        </div>
      </div>

    </div>
  )
}