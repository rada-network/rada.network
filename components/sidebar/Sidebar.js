// Widgets Comp
import { Widget } from "../widgets/Widget";
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetEvents } from "../widgets/WidgetEvents";
import { WidgetInfluencers } from "../widgets/WidgetInfluencers";


export const Sidebar = ({extraClass}) => {
  return (
    <div className={`sidebar ${extraClass || ''}`}>
      <WidgetPricing
        title="Market Insights"
        text="Lorem Ipsum Dolor sit Amet"
        projectPlatformShort="ada"
      />
      <WidgetEvents
        title="Cardano Events"
        widgetIcon="calendar-day"
      />
      <WidgetInfluencers
        title="Influencers"
        widgetIcon="street-view"
      />
    </div>
  );
};

