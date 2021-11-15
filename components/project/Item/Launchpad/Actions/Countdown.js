import Countdown from "react-countdown";

const ProjectCountdown = ({ project, setCountdownDone }) => {
  const OpenDate = ({ time }) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(time)

    return <strong>{date.toLocaleDateString("en-US", options)}</strong>
  }

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
          <h3 class="text-2xl text-center mb-8 font-normal">
            <span className="text-color-title">Danh sách đăng ký mua {project.token.name} sẽ được mở trong</span>
          </h3>
          <div className="text-6xl text-center flex w-full items-center justify-center">

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="days">{days}</div>
              <div className="font-mono uppercase text-xs leading-none">days</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="hours">{hours}</div>
              <div className="font-mono uppercase text-xs leading-none">hours</div>
            </div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="minutes">{minutes}</div>
              <div className="font-mono uppercase text-xs leading-none">minutes</div>
            </div>

            <div className="text-2xl mx-1 opacity-50 font-light">:</div>

            <div className="w-24 mx-1 p-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-white dark:text-opacity-90 rounded-lg">
              <div className="font-mono leading-none" x-text="seconds">{seconds}</div>
              <div className="font-mono uppercase text-xs leading-none">seconds</div>
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
        <p className="text-sm text-center mt-8 leading-7">
          <span className="text-color-desc">Bạn vui lòng chờ cho đến khi danh sách được mở!</span><br />
          <span className="text-color-desc">Bạn cần đăng ký để tham gia mua.</span><br />
          <span className="text-color-desc">Ngày mở: </span> <OpenDate time={project.open_date} />
        </p>
      </div>

    </>
  )
}

export default ProjectCountdown