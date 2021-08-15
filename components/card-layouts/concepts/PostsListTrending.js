import React, {useCallback, useEffect, useMemo, useState} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../../button/tabButton";
import WidgetTitle from "../../text/widgetTitle";
import {CardPost} from "../../cards/concepts/Post";
import ContentLoader from "react-content-loader";

export const PostsListTrending = ({title, extraClass}) => {

  return (
    <div className={`section ${extraClass || ''}`}>

      <div className={`section-header`}>
        <div className={`section-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <div class="section-cta">
          <a class="btn">
            <span classname="btn--text text-color-desc">
              More
            </span>
            <span class="btn--caret-right"></span>
          </a>
        </div>
      </div>

      <div className={`section-body no-padding`}>
        <div className={`grid gap-0`}>

          <CardPost
            title="Whales Are Quietly Pouncing on Ethereum As Crypto Market Meanders, According to Analytics Firm Santiment"
            mediaUri="https://picsum.photos/80/80?random=4"
            type="fab fa-twitter"
            source="@Grayscale"
            commentCount="99"
            voteCount="12"
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
            title="Whales Are Quietly Pouncing on Ethereum As Crypto Market Meanders, According to Analytics Firm Santiment"
            mediaUri="https://picsum.photos/80/80?random=4"
            type="fad fa-newspaper"
            source="CoinDesk"
            commentCount="99"
            voteCount="12"
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
            title="Bitcoin: Is this a point of maximum financial opportunity?"
            mediaUri="https://picsum.photos/80/80?random=9"
            type="fad fa-newspaper"
            source="U.Today"
            commentCount="15"
            voteCount="57"
          />

        </div>
      </div>

    </div>
  )
}