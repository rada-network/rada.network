import Countdown from "react-countdown";

const ProjectCountdown = ({ project, setCountdownDone ,pool,isEndDate}) => {

  const renderer = ({ formatted: { days, hours, minutes, seconds }, completed }) => {
    if (completed) {
      // Render a completed state
      // reload page
      setCountdownDone(true)
      return <span>Opening for whitelist now!</span>;
    } else {
      // Render a countdown
      return (
        <>
          <div className="text-3xl md:text-4xl lg:text-5xl text-center flex w-full items-center justify-center">

            <div className="w-16 md:w-20 mx-1 p-2 text-gray-700 dark:text-white rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="days">{days}</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">days</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 text-gray-700 dark:text-white rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="hours">{hours}</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">hours</div>
            </div>

            <div className="w-16 md:w-20 mx-1 p-2 text-gray-700 dark:text-white rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="minutes">{minutes}</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-16 md:w-20 mx-1 p-2 text-gray-700 dark:text-white rounded-lg">
              <div className="slashed-zero tabular-nums leading-none" x-text="seconds">{seconds}</div>
              <div className="uppercase text-xs leading-none opacity-70 mt-2">seconds</div>
            </div>

          </div>

        </>
      )
    }
  };
  return (
    <>
      {isEndDate && <div className="test">
        <Countdown renderer={renderer} date={new Date(pool.end_date)} />
      </div>}

      {!isEndDate && <div className="test">
        <Countdown renderer={renderer} date={new Date(pool.open_date)} />
      </div>}

    </>
  )
}

export default ProjectCountdown