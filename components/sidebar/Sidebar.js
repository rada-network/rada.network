// Widgets Comp
import { Widget } from "../widgets/Widget";
import { WidgetPricing } from "../widgets/WidgetPricing";


export const Sidebar = ({extraClass}) => {
  return (
    <div className={`sidebar ${extraClass || ''}`}>
      <WidgetPricing
        title="Market Insights"
        text="Lorem Ipsum Dolor sit Amet"
        projectPlatformShort="ada"
      />
    </div>
  );
};

