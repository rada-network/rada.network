import Countdown from "react-countdown";

const MiniCountdown = ({ project, isEndDate }) => {

    const renderer = ({ formatted: {days, hours, minutes, seconds}, completed }) => {
        if (completed) {
            // Render a completed state
            return '';
        } else {
            // Render a countdown
            return (
                <>
                    <div className="countdown--mini">
                        <div className="countdown--mini--body countdown--mini--body--day">
                            <time>{days}</time> <span>d</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--body--hour">
                            <time>{hours}</time>
                            <span>h</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--body--minute">
                            <time>{minutes}</time>
                            <span>m</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--second">
                            <time>{seconds}</time>
                            <span>s</span>
                        </div>
                    </div>
                </>
            )
        }
    };

    return <Countdown renderer={renderer} date={isEndDate ? project.end_date : project.open_date} />
}

export default MiniCountdown