import { useRouter } from "next/router";
import Countdown from "react-countdown";

const ProjectCountdown = ({ project, setCountdownDone ,pool,isEndDate}) => {
  const router = useRouter()
  const renderer = ({ formatted: { days, hours, minutes, seconds }, completed }) => {
    if (completed) {
      // Render a completed state
      // reload page
      router.reload()
      return <span></span>;
    } else {
      // Render a countdown
      return (
        <>
          <div className="text-base text-center flex w-full items-center justify-center space-x-2">

            <div className="flex">
              <div className="slashed-zero tabular-nums leading-none" x-text="days">{days}</div>
              <div className="uppercase leading-none opacity-60">d</div>
            </div>

            <div className="flex">
              <div className="slashed-zero tabular-nums leading-none" x-text="hours">{hours}</div>
              <div className="uppercase leading-none opacity-60">h</div>
            </div>

            <div className="flex">
              <div className="slashed-zero tabular-nums leading-none" x-text="minutes">{minutes}</div>
              <div className="uppercase leading-none opacity-60">m</div>
            </div>

            <div className="flex">
              <div className="slashed-zero tabular-nums leading-none" x-text="seconds">{seconds}</div>
              <div className="uppercase leading-none opacity-60">s</div>
            </div>

          </div>

        </>
      )
    }
  };
  return (
    <>
      {isEndDate && <div>
        <Countdown renderer={renderer} date={new Date(pool.end_date)} />
      </div>}

      {!isEndDate && <div>
        <Countdown renderer={renderer} date={new Date(pool.open_date)} />
      </div>}

    </>
  )
}

export default ProjectCountdown