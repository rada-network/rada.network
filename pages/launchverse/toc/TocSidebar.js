import React from "react";
import { useRef, useState, useEffect } from "react";
import { isMobile, isBrowser } from "react-device-detect";

const TocSideBar = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);
  const refToc = useRef();
  useEffect(() => {
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
        let id = "h" + h2Index.toString();
        heading.setAttribute("id", id);
        nestedHeadings.push({ id, title, items: [] });
        h2Index += 1;
        h3Index = 1;
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        let id = "h" + h2Index.toString() + "" + h3Index.toString();
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

  const handleClickToc = (parentId, myId) => {
    let element = document.getElementById(myId);
    console.log(myId);
    console.log(parentId)
    
    var currentActive = document.querySelectorAll(".toc--active")
    console.log(currentActive.length);
    for (var i = 0; i < currentActive.length; i++) {
      currentActive[i].className = currentActive[i].className.replace(" toc--active", "");
    }

    // set active for parent
    if (parentId) {
      console.log(" co parent")
      const parent = document.getElementById(parentId);
      parent.className += " toc--active";
    } else {
      console.log("Khong co parent")
    }

    element.className += " toc--active";
  };

  // const handleScroll = function (e) {
  //   refToc.current.style.position = "absolute";
  //   refToc.current.style.top = mainScroll.current.scrollTop + "px";
  //   const right =
  //     document.querySelector(".pane-content--sec--main").clientWidth -
  //     document.querySelector(".post-body").clientWidth;
  //   refToc.current.style.right =
  //     (right / 2 - refToc.current.clientWidth) / 2 + "px";
  // };

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

  useEffect(() => {
    // if (nestedHeadings.length > 0) {
    //   document.querySelector(".parent").setAttribute("class", "toc--active");
    // }
  }, [nestedHeadings])

  return (
    <>
      <div
        ref={refToc}
        className="article-toc toc-sidebar"
        role="navigation"
      >
        <div className="toc-list">
          <h5 className="text-color-title">ON this page</h5>

          <ol>
            {nestedHeadings.map(
              (heading) =>
                heading.title && (
                  <li key={heading.id} className="">
                    <a
                      id={"parent" + heading.id}
                      className="parent menu"
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        handleClickToc(null, "parent" + heading.id)
                        e.preventDefault();
                        document.querySelector(`#${heading.id}`).scrollIntoView({
                          behavior: "smooth"
                        });
                      }}
                    >
                      {heading.title}
                    </a>
                    {heading.items.length > 0 && (
                      <ol>
                        {heading.items.map((child) => (
                          <li key={child.id}>
                            <a
                              id={"child" + child.id} 
                              href={`#${child.id}`}
                              className="menu"
                              onClick={(e) => {
                                handleClickToc("parent" + heading.id, "child" + child.id);
                                e.preventDefault();
                                document.querySelector(`#${child.id}`).scrollIntoView({
                                  behavior: "smooth"
                                });
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
