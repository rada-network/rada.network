const CountDownLg = ({}) => {
  return (
    <>
      <div className="">

        <div className="text-3xl md:text-4xl  lg:text-5xl text-center flex w-full items-center justify-center">


            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="days">6</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">days</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="hours">14</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">hours</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="minutes">20</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="seconds">45</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">seconds</div>
            </div>

        </div>

        <div className="flex flex-col md:flex-row mt-8 max-w-lg justify-evenly mx-auto">
          <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-primary-700 text-white rounded-lg flex items-center cursor-pointer">
            <span className="icon text-xl opacity-70 w-12 h-12 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4">
              <i class="fa-duotone fa-hand-holding-heart"></i>
            </span>
            <div>
              <p className="mb-1">Get more RIR with Share2Earn</p>
              <a href="/launchverse/parallel/share2earn" class="group text-secondary-400">
                <span class="text-sm">Joint now</span>
                <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-gray-700 text-white rounded-lg flex items-center cursor-pointer">
            <span className="icon text-xl opacity-70 w-12 h-12 !flex items-center justify-center bg-gray-900 rounded-full flex-shrink-0 mr-4">
              <i class="fad fa-info"></i>
            </span>
            <div>
              <p className="mb-1">Joint the launchverse is really simple</p>
              <a href="/launchverse/parallel/share2earn" class="group text-white">
                <span class="text-sm">Learn more</span>
                <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default CountDownLg