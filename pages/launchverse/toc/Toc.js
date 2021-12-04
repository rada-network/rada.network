import React from "react";
import { useRef, useState, useEffect } from "react";
import { isMobile, isBrowser } from "react-device-detect";

const Toc = ({ mainScroll }) => {
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

  useEffect(() => {
    if (mainScroll.current != null && mainScroll.current != undefined) {
      mainScroll.current.addEventListener("scroll", scrollActiveToc);
    }
    return () => {
      if (mainScroll.current != null && mainScroll.current != undefined) {
        mainScroll.current.removeEventListener("scroll", scrollActiveToc);
      }
    };
  }, []);

  const scrollActiveToc = () => {
    setTimeout(handleScroll, 500);
  }

  const handleScroll = () => {
    if (!mainScroll.current) return false;
    var toc = mainScroll.current.querySelectorAll("h2, h3");
    var visibleElements = [];
    toc.forEach((element) => {
      if (isVisible(element)) {
        visibleElements.push(element);
      }
    });
    if (visibleElements.length > 0) {
      if (visibleElements[0].tagName == "H2") {
        handleClickToc(null, "parent" + visibleElements[0].id);
      } else if (visibleElements[0].tagName == "H3") {
        const h3Elements = document.querySelectorAll("h3");
        for (var i = 0; i < h3Elements.length; i++) {
          document
            .getElementById("child" + h3Elements[i].id)
            .classList.remove("toc--active");
        }

        const elementChild = document.getElementById(
          "child" + visibleElements[0].id
        );

        const parentElement = elementChild.parentElement.parentElement.previousSibling;
        const curentParentActive = document.querySelector("a.toc--active.parent");
        if (curentParentActive && curentParentActive !== parentElement && curentParentActive) {
          curentParentActive.classList.remove("toc--active")
        }

        if (parentElement && !parentElement.classList.contains("toc--active")) {
          parentElement.classList.add("toc--active")
        }

        if (elementChild && !elementChild.classList.contains("toc--active")) {
          elementChild.classList.add("toc--active");
        }
      }
    }

    if (toc && toc.scrollHeight > toc.clientHeight) {
      var activeItem = toc.querySelector(".toc--active");
      if (activeItem) {
        toc.scrollTop = activeItem.offsetTop;
      }
    }
  };

  function isVisible(elem) {
    if (!(elem instanceof Element))
      throw Error("DomUtil: elem is not an element.");
    const style = getComputedStyle(elem);
    if (style.display === "none") return false;
    if (style.visibility !== "visible") return false;
    if (style.opacity < 0.1) return false;
    if (
      elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
      0
    ) {
      return false;
    }
    const elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
    };
    if (elemCenter.x < 0) return false;
    if (
      elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
    )
      return false;
    if (elemCenter.y < 0) return false;
    if (
      elemCenter.y >
      (document.documentElement.clientHeight || window.innerHeight)
    )
      return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
      if (pointContainer === elem) return true;
    } while (pointContainer && (pointContainer = pointContainer.parentNode));
    return false;
  }

  const handleClickToc = (parentId, myId) => {
    let element = document.getElementById(myId);
    if (!element) {
      return false;
    }
    var currentActive = document.querySelectorAll(".toc--active")
    for (var i = 0; i < currentActive.length; i++) {
      currentActive[i].className = currentActive[i].classList.remove("toc--active");
    }

    // set active for parent
    if (parentId) {
      const parent = document.getElementById(parentId);
      parent.classList += " toc--active";
    }
    element.classList += " toc--active";
  };
  return (
    <>
      <div
        ref={refToc}
        className="article-toc"
        role="navigation"
      >
        <h5 className="text-color-title">On this page</h5>

        <ol>
          {nestedHeadings.map(
            (heading, index) =>
              heading.title && (
                <li key={heading.id} className={heading.items.length > 0 ? "has-child" : ""}>
                  <a
                    className={(index == 0) ? "toc--active parent menu" : "parent menu"}
                    id={"parent" + heading.id}
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
    </>
  );
};

export default Toc;
