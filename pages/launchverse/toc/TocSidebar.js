import React from "react";
import { useRef, useState, useEffect } from "react";

const TocSideBar = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    // Add id to element
    const h2Elements = Array.from(
      document.querySelectorAll("h2")
    );

    const headingElements = Array.from(
      document.querySelectorAll("h2, h3")
    );
    const newNestedHeadings = getNestedHeadings(headingElements);
    console.log(newNestedHeadings)
    setNestedHeadings(newNestedHeadings);

  }, []);

  

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
    let h2Index = 1
    let h3Index = 1
    headingElements.forEach((heading, index) => {
      const { innerText: title } = heading;
      if (heading.nodeName === "H2") {
        let id = h2Index.toString()
        heading.setAttribute("id", id)
        nestedHeadings.push({ id, title, items: [] })
        h2Index += 1;
        h3Index = 1;
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        let id = h2Index.toString() + "." + h3Index.toString()
        heading.setAttribute("id", id)
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title
        });
        h3Index += 1;
      }
    });
    return nestedHeadings;
  };

  return (
    <>
      <div className="article-toc toc-sidebar" role="navigation">
        <h5 className="text-color-title">ON this page</h5>

        <ol>
          {nestedHeadings.map(heading => (
            <li key={heading.id} className="">
              <a href={`#${heading.id}`}>
                {heading.title}
              </a>
              {heading.items.length > 0 && (
                <ol>
                  {heading.items.map((child) => (
                    <li key={child.id}>
                      <a href={`#${child.id}`}>{child.title}</a>
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
  )
}

export default TocSideBar