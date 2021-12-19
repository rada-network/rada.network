const CountDownLg = ({}) => {
  return (
    <>
      <div className="">

        <div className="text-3xl md:text-4xl  lg:text-5xl text-center flex w-full items-center justify-center">


            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="days">6</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">days</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="hours">14</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">hours</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="minutes">20</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-16 md:w-20 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="seconds">45</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">seconds</div>
            </div>

        </div>

      </div>

    </>
  )
}

export default CountDownLg