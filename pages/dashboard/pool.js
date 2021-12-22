import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
function Pool() {
  return (
    <>
      <a href="link to claim tab" className="block md:flex px-4 py-4 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 hover:bg-gray-200 dark:hover:bg-gray-700">
        <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
          <div className="mr-4 flex items-center">
            <img src="/placeholders/parallel-token.png" className="w-8 h-8 mr-2 rounded-full" />
            <label className="font-semibold">
              The Parallel
            </label>
          </div>

          <div className="ml-auto">
            <label className="label label--neutral">
              Public
            </label>
          </div>
        </div>

        <div className="flex md:w-1/2 md:ml-2">
          <div className="">
            <label className="text-sm">
              <div>October 28th 2021</div>
              <span className="opacity-60 text-xs block md:mt-0"> 1:00 PM UTC </span>
            </label>
          </div>
          <div className="ml-auto">
            <label className="lg:ml-auto label label--success">
              Success
            </label>
          </div>
        </div>
      </a>
    </>
  );
}

export default Pool
