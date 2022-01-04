import Countdown from "react-countdown";

const MiniCountdown = ({ pool, isEndDate }) => {
  const renderer = ({
    formatted: { days, hours, minutes, seconds },
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
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
  };

  return (
    <Countdown
      renderer={renderer}
      date={isEndDate ? pool.end_date : pool.open_date}
    />
  );
};

export default MiniCountdown;
