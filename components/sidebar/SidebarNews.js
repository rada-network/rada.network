// Widgets Comp
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetPosts } from "../widgets/WidgetPosts";
import { useEffect, useState, useRef } from "react";

export const Sidebar = ({className, extraClass}) => {
  const [fixSidebar, setFixSidebar] = useState(false)
  const sidebar = useRef()

  const sidebarScroll = () => {
    console.log(sidebar.current)
  }

  useEffect(() => {
    console.log('xxx')
    function watchScroll() {
      window.addEventListener("scroll", sidebarScroll)
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", sidebarScroll)
    }
  }, [sidebar])

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

