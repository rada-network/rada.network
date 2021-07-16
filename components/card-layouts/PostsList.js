import React, {useCallback, useEffect, useMemo, useState} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {TabButton} from "../button/tabButton";
import WidgetTitle from "../text/widgetTitle";
import {CardPost} from "../cards/Post";
import ContentLoader from "react-content-loader";

export const PostsList = ({extraClass}) => {

  return (
    <div className={`section section-news ${extraClass || ''}`}>
      <div className={`section-inner`}>

        <div className={`section-body no-padding`}>
          <div className={`grid gap-0`}>

            <CardPost
              title="Republican Senator Highlights Bitcoin’s Battle in Shedding Criminal Baggage"
              mediaUri="https://picsum.photos/80/80?random=1"
            />

            <CardPost
              title="DeFi Yield Farming Aggregator ApeRocket Suffers $1.26M ‘Flash Loan’ Attack"
              mediaUri="https://picsum.photos/80/80?random=2"
            />

          </div>
        </div>

      </div>
    </div>
  )
}