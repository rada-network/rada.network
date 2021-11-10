import { useEffect, useState } from "react";
import fetchJson from "../../lib/fetchJson";
import Link from "next/link";
import { Layout } from "../../components/page-layouts/Global";

export default function ConceptsIndex() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    fetchJson("/api/concept-pages").then((data) => {
      setLinks(data);
    });
  }, []);

  return (
    <Layout extraClass="page-home">
      <div className={`pane-content`}>
        <div className="pane-content--sec pane-content-active !w-full">
          <div className="pane-content--sec--top !hidden"></div>

          <div className="pane-content--sec--main grid scrollbar">
            <div className="page page-full">
              <ul className="">
                {links.map((uri) => (
                  <li className="px-2 py-4 border-b border-gray-400 border-opacity-20 text-sm font-medium">
                    <Link href={uri}>
                      <a className="flex justify-between hover:text-primary-500">
                        {uri}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
