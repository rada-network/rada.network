import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import PoolWrapper from "./poolWrapper";
import { getPoolByWallet } from "@data/query/projects";
import { useEffect, useState } from "react";
import fetcher from "@lib/fetchJson";

function JoinedPools() {
  const [projects, setProjects] = useState([]);  

  useEffect(() => {
    getPoolByWallet({ lang: "en", wallet_address: "0x82a0c5334F177649C48f1cC04245F57f4540148E" }).then(function (res) {
      console.log(res);
      setProjects(res);
    })
  }, [])

  return (
    <>
      <div className="mt-4">
        <div className="card--wrapper  mb-4 md:mb-0">
          {/* Start header */}
          <div className="card--header pb-1">
            Launchverse
          </div>
          <div className="card--body">
            <div className="invisible h-0 md:h-auto md:visible md:flex px-4 md:py-4 py-0 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 text-xs uppercase font-semibold text-opacity-50 tracking-wider">
              <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
                <div className="mr-4">
                  <label className="font-semibold">
                    Project
                  </label>
                </div>

                <div className="ml-auto">Type

                </div>
              </div>

              <div className="flex md:w-1/2 md:ml-2">
                <div className="">
                  Date
                </div>
                <div className="ml-auto">
                  Status
                </div>
              </div>
            </div>
            {/* End header */}

            {/* Start pool */}
            {projects.length > 0 && (
              <div>
                {projects.map((project, key) => (
                  <PoolWrapper project={project}/>
                ))}
              </div>
            )}
            {/* End pool */}

          </div>
        </div>
      </div>
    </>
  );
}

export default JoinedPools
