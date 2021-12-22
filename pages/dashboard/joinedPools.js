import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import Pool from "./pool";
function JoinedPools() {
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
            <Pool />
            <Pool />
            <Pool />
            {/* End pool */}

          </div>
        </div>
      </div>
    </>
  );
}

export default JoinedPools
