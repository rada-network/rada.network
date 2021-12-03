import React from "react";
import { useRef, useState, useEffect } from "react";
import { isMobile, isBrowser } from "react-device-detect";

const Toc = () => {
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

  if (process.env.NODE_ENV == "production") {
    return null;
  }

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
                <li key={heading.id} className="">
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
