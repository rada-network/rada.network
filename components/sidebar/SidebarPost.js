// Widgets Comp
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetEvents } from "../widgets/WidgetEvents";
import { WidgetStats } from "../widgets/WidgetStats";
import { WidgetInfluencers } from "../widgets/WidgetInfluencers";
import { WidgetPosts } from "../widgets/concepts/WidgetPosts";

export default function SidebarPost ({className,extraClass}) {
  return (
    <>
      <WidgetPosts
        title="Related Projects"
        widgetIcon="code-branch"
      />
    </>
  );
};

