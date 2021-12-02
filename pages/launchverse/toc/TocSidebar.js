import React from "react";
import { useRef, useState, useEffect } from "react";
import { isMobile, isBrowser } from "react-device-detect";

const TocSideBar = ({ mainScroll,closeChooser }) => {
  const [nestedHeadings, setNestedHeadings] = useState([]);
  const refToc = useRef();
  useEffect(() => {
    // Add id to element
    const h2Elements = Array.from(document.querySelectorAll("h2, h3"));

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
    let h2Index = 1;
    let h3Index = 1;
    headingElements.forEach((heading, index) => {
      const { innerText: title } = heading;
      if (heading.nodeName === "H2") {
        let id = h2Index.toString();
        heading.setAttribute("id", id);
        nestedHeadings.push({ id, title, items: [] });
        h2Index += 1;
        h3Index = 1;
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        let id = h2Index.toString() + "." + h3Index.toString();
        heading.setAttribute("id", id);
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
        h3Index += 1;
      }
    });
    return nestedHeadings;
  };
  const handleClickToc = function (e, id) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById(id).setAttribute("class", "toc--active");
    if (typeof closeChooser == "function") closeChooser()
    mainScroll.current.scroll({
      top: document.getElementById(id).offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = function (e) {
    refToc.current.style.position = "absolute";
    refToc.current.style.top = mainScroll.current.scrollTop + "px";
    const right =
      document.querySelector(".pane-content--sec--main").clientWidth -
      document.querySelector(".post-body").clientWidth;
    refToc.current.style.right =
      (right / 2 - refToc.current.clientWidth) / 2 + "px";
  };
  useEffect(() => {
    // refToc.current.style.display = "block"
    // refToc.current.style.position = "absolute";
    // refToc.current.style.top = mainScroll.current.scrollTop + "px"
    // const right = document.querySelector(".pane-content--sec--main").clientWidth - document.querySelector(".post-body").clientWidth
    // refToc.current.style.right = (right/2 - refToc.current.clientWidth)/2 + "px"
    // mainScroll.current.addEventListener('scroll',handleScroll)
    // return () => {
    //   mainScroll.current.removeEventListener('scroll',handleScroll)
    // }
  }, []);
  return (
    <>
      <div
        ref={refToc}
        className="article-toc toc-sidebar"
        role="navigation"
      >
        <div className="toc-list">
          <h5 className="text-color-title">On this page</h5>

          <ol>
            {nestedHeadings.map(
              (heading) =>
                heading.title && (
                  <li key={heading.id} className="">
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        handleClickToc(e, heading.id);
                      }}
                    >
                      {heading.title}
                    </a>
                    {heading.items.length > 0 && (
                      <ol>
                        {heading.items.map((child) => (
                          <li key={child.id}>
                            <a href={`#${child.id}`}
                              onClick={(e) => {
                                handleClickToc(e, child.id);
                              }}
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                )
            )}
          </ol>
        </div>
      </div>
    </>
  );
};

export default TocSideBar;
