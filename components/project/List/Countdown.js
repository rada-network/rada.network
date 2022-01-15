import Countdown from "react-countdown";

const MiniCountdown = ({ pool, isEndDate,style }) => {
  style = style || "simple";
  const renderer = ({
    formatted: { days, hours, minutes, seconds },
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      if (style === 'simple'){
        return (
          <>
            <div className="countdown--mini">
              <div className="countdown--mini--body !py-0 countdown--mini--body--day">
                <time>{days}</time>
                <span className="">d</span>
              </div>
              <div className="countdown--mini--body !py-0 countdown--mini--body--hour">
                <time>{hours}</time>
                <span className="">h</span>
              </div>
              <div className="countdown--mini--body !py-0 countdown--mini--body--minute">
                <time>{minutes}</time>
                <span className="">m</span>
              </div>
              <div className="countdown--mini--body !py-0 countdown--mini--second">
                <time>{seconds}</time>
                <span className="">s</span>
              </div>
            </div>
          </>
        );
      }
      return (
        <>
        <div className="text-3xl text-center justify-evenly flex space-x-4">
          <div className="w-16 md:w-20 p-2 bg-white text-gray-700 rounded-lg">
            <div className="slashed-zero tabular-nums leading-none" x-text="days">{days}</div>
            <div className="uppercase text-2xs leading-none opacity-70 mt-2">days</div>
          </div>
          <div className="text-2xl mx-1 opacity-50 font-light mt-2">:</div>
          <div className="w-16 md:w-20 p-2 bg-white text-gray-700 rounded-lg">
            <div className="slashed-zero tabular-nums leading-none" x-text="hours">{hours}</div>
            <div className="uppercase text-2xs leading-none opacity-70 mt-2">hours</div>
          </div>
          <div className="text-2xl mx-1 opacity-50 font-light mt-2">:</div>
          <div className="w-16 md:w-20 p-2 bg-white text-gray-700 rounded-lg">
            <div className="slashed-zero tabular-nums leading-none" x-text="minutes">{minutes}</div>
            <div className="uppercase text-2xs leading-none opacity-70 mt-2">minutes</div>
          </div>

          <div className="text-2xl mx-1 opacity-50 font-light mt-2">:</div>

          <div className="w-16 md:w-20 p-2 bg-white text-gray-700 rounded-lg">
            <div className="slashed-zero tabular-nums leading-none" x-text="seconds">{seconds}</div>
            <div className="uppercase text-2xs leading-none opacity-70 mt-2">seconds</div>
          </div>
        </div>
        </>
      )
      
    }
  };

  return (
    <Countdown
      renderer={renderer}
      date={isEndDate ? pool.end_date : pool.open_date}
    />
  );
};

export default MiniCountdown;
