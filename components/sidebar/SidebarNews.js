// Widgets Comp
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetPosts } from "../widgets/WidgetPosts";

export const Sidebar = ({className, extraClass}) => {
  return (
    <div className={`${className} ${extraClass || ''}`}>
      <WidgetPricing
        title="Market Insights"
        text="Lorem Ipsum Dolor sit Amet"
        projectPlatformShort="ada"
      />
      <WidgetPosts
        title="Top Projects"
        widgetIcon="code-branch"
      />
    </div>
  );
};

