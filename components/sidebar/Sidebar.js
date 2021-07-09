// Widgets Comp
import dynamic from 'next/dynamic'
import { useEffect, useRef } from "react";

export const Sidebar = ({className, extraClass, type}) => {

  const sidebarRef = useRef()

  useEffect(() => {

    let fixSidebar = false
    let offsetTop = 0
    let kickoffPoint = 0
    let deltaH = 0
    let lastY = 0

    const initFixedPoint = () => {
      const paddingTop = parseInt(window.getComputedStyle(document.body).paddingTop)
      const sidebar = sidebarRef.current
      if (!sidebar) return
      const rect = sidebar.getBoundingClientRect()
      const sidebarTop = rect.top + window.scrollY - paddingTop
      const innerHeight = rect.height + 30
      // calculate offsetTop
      if (innerHeight + sidebarTop < window.innerHeight) {
        kickoffPoint = sidebarTop
        offsetTop = paddingTop
      } else {
        kickoffPoint = sidebarTop + innerHeight - window.innerHeight + paddingTop
        offsetTop = window.innerHeight - innerHeight
      }

      // sidebar diff height
      deltaH = sidebar.parentNode.clientHeight - rect.height - paddingTop
    }
  
    const sidebarScroll = () => {
      if (!fixSidebar) initFixedPoint()
        // update DOM css
      if (deltaH && window.scrollY > kickoffPoint + deltaH) {
        fixSidebar = true
        sidebarRef.current.style.position = 'fixed'
        sidebarRef.current.style.top = (offsetTop + kickoffPoint + deltaH - window.scrollY) + 'px'
      } else if (window.scrollY > kickoffPoint) {
        if (!fixSidebar) {
          fixSidebar = true
          sidebarRef.current.style.position = 'fixed'
          sidebarRef.current.style.top = offsetTop + 'px'
        }
      } else {
        if (fixSidebar) {
          fixSidebar = false
          sidebarRef.current.style.position = ''
          sidebarRef.current.style.top = ''
        }
      }

      // add scroll direction class
      if (window.scrollY > lastY) {
        document.body.classList.remove('scroll-up')
        document.body.classList.add('scroll-down')
      } else {
        document.body.classList.add('scroll-up')
        document.body.classList.remove('scroll-down')
      }
      lastY = window.scrollY
    }
  

    window.addEventListener("scroll", sidebarScroll)
    // sidebarScroll();
    return () => {
      window.removeEventListener("scroll", sidebarScroll)
    }
  }, [])

  // Dynamic load sidebar content
  const SidebarWidgets = dynamic(() => import(`./Sidebar${type || 'Home'}`))

  return (
    <div className={`${className} ${extraClass || ''}`}>
      <div ref={sidebarRef} className='sidebar-inner'>
        <SidebarWidgets />
      </div>
    </div>
  );
};

