// Widgets Comp
import {WidgetNews} from "../widgets/WidgetNews";

export default function SidebarNewsDetail ({className,extraClass,context}) {
  return (
    <>
      <WidgetNews context={context}
        title="Related News"
        widgetIcon="code-branch"
      />
    </>
  );
};

