// Widgets Comp
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetPosts } from "../widgets/WidgetPosts";

export default function SidebarNews ({className, extraClass}) {

  return (
    <>
      <WidgetPricing
        title="Market Insights"
        text="Lorem Ipsum Dolor sit Amet"
        projectPlatformShort="ada"
      />
      <WidgetPosts
        title="Top Projects"
        widgetIcon="code-branch"
      />
    </>
  );
};

