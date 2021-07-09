// Widgets Comp
import { Widget } from "../widgets/Widget";
import { WidgetPricing } from "../widgets/WidgetPricing";
import { WidgetEvents } from "../widgets/WidgetEvents";
import { WidgetStats } from "../widgets/WidgetStats";
import { WidgetInfluencers } from "../widgets/WidgetInfluencers";
import { WidgetPosts } from "../widgets/WidgetPosts";
import { useEffect, useState, useRef } from "react";

export const Sidebar = ({className, extraClass}) => {
  const [fixSidebar, setFixSidebar] = useState(false)
  const [offsetTop, setOffsetTop] = useState(0)
  const [kickoffPoint, setKickoffPoint] = useState(0)
  const sidebarRef = useRef()


  const initFixedPoint = () => {
    const paddingTop = parseInt(window.getComputedStyle(document.body).paddingTop)
    const sidebar = sidebarRef.current
    const rect = sidebar.getBoundingClientRect()
    const sidebarTop = rect.top + window.scrollY - paddingTop
    // calculate offsetTop
    let kickoffPoint_ = 0
    if (rect.height + sidebarTop < window.innerHeight) {
      kickoffPoint_ = sidebarTop
      setOffsetTop(paddingTop)
    } else {
      kickoffPoint_ = sidebarTop + rect.height - window.innerHeight
      setOffsetTop(window.innerHeight - rect.height)
    }
    setKickoffPoint(kickoffPoint_)
  }

  const sidebarScroll = () => {
    if (!fixSidebar) initFixedPoint()

    if (window.scrollY > kickoffPoint) {
      if (!fixSidebar) {
        setFixSidebar(true)
      }
    } else {
      if (fixSidebar) {
        setFixSidebar(false)
      }
    }
  }

  useEffect(() => {
    function watchEvents() {
      window.addEventListener("scroll", sidebarScroll)
    }
    watchEvents();
    return () => {
      window.removeEventListener("scroll", sidebarScroll)
    }
  }, [fixSidebar, offsetTop, kickoffPoint])

  const styles = fixSidebar ? {position: "fixed", top: offsetTop+'px'} : {}

  return (
    <div className={`${className} ${extraClass || ''}`}>
      <div ref={sidebarRef} className='sidebar-inner' style={styles}>
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
    </div>
  );
};

