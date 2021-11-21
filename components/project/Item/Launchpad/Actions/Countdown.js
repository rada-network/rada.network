import Countdown from "react-countdown";

const ProjectCountdown = ({ project, setCountdownDone }) => {

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
          <div className="text-6xl text-center flex w-full items-center justify-center">

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="days">{days}</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">days</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="hours">{hours}</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">hours</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="minutes">{minutes}</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="seconds">{seconds}</div>
              <div className="font-mono uppercase text-xs leading-none opacity-70 mt-2">seconds</div>
            </div>

          </div>

        </>
      )
    }
  };
  return (
    <>
      <div className="test">
        <Countdown renderer={renderer} date={new Date(project.open_date)} />
      </div>

    </>
  )
}

export default ProjectCountdown