// Widgets Comp
import { Widget } from "../widgets/Widget";
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetEvents } from "../widgets/WidgetEvents";
import { WidgetStats } from "../widgets/WidgetStats";
import { WidgetInfluencers } from "../widgets/WidgetInfluencers";
import { WidgetPosts } from "../widgets/WidgetPosts";

export const Sidebar = ({className, extraClass}) => {
  return (
    <div className={`sidebar ${className} ${extraClass || ''}`}>
      <WidgetPricing
        title="Market Insights"
        text="Lorem Ipsum Dolor sit Amet"
        projectPlatformShort="ada"
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
      <WidgetPosts
        title="Top Projects"
        widgetIcon="code-branch"
      />
    </div>
  );
};

