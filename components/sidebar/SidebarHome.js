// Widgets Comp
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetEvents } from "../widgets/WidgetEvents";
import { WidgetStats } from "../widgets/WidgetStats";
import { WidgetInfluencers } from "../widgets/WidgetInfluencers";
import { WidgetPosts } from "../widgets/concepts/WidgetPosts";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";


export default function SidebarHome({className, extraClass}) {
  return (
    <>
    <ResponsiveMasonry columnsCountBreakPoints={{640: 1, 1280: 2}}>
      <Masonry gutter="1rem">
        <WidgetPricing
          title="Market Insights"
          text="Lorem Ipsum Dolor sit Amet"
          projectPlatformShort="ada"
        />
        <WidgetPosts
          title="Trending News"
          widgetIcon="newspaper"
        />
        <WidgetPosts
          title="Hot Media"
          widgetIcon="icons"
        />
        <WidgetPosts
          title="Social Signals"
          widgetIcon="fire-alt"
        />
        <WidgetPosts
          title="Top Projects"
          widgetIcon="code"
        />
        <WidgetEvents
          title="Cardano Events"
          widgetIcon="calendar-day"
        />
        <WidgetStats
          title="Network Information"
          widgetIcon="chart-pie-alt"
        />
        <WidgetInfluencers
          title="Influencers"
          widgetIcon="user-secret"
        />
      </Masonry>
      </ResponsiveMasonry>
    </>
  );
};