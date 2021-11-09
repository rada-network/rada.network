const CountDownLg = ({}) => {
  return (
    <>
      <div className="">

        <div className="text-6xl text-center flex w-full items-center justify-center">

            <div className="text-2xl mr-1 opacity-50 font-light"></div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="days">6</div>
              <div className="font-mono uppercase text-xs leading-none">days</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="hours">14</div>
              <div className="font-mono uppercase text-xs leading-none">hours</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="minutes">20</div>
              <div className="font-mono uppercase text-xs leading-none">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="seconds">45</div>
              <div className="font-mono uppercase text-xs leading-none">seconds</div>
            </div>

        </div>

        <p className="text-sm text-center mt-8 leading-7">
          <span className="text-color-desc">Open Day:</span> <strong>6:00 PM 28 Jan, 2022 (GMT +7)</strong>
        </p>

      </div>

    </>
  )
}

export default CountDownLg