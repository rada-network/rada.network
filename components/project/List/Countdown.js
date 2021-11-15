import Countdown from "react-countdown";

const MiniCountdown = ({ project }) => {

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
                            <time>{days}</time> <span>days</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--body--hour">
                            <time>{hours}</time>
                            <span>hrs</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--body--minute">
                            <time>{minutes}</time>
                            <span>min</span>
                        </div>
                        <div className="countdown--mini--body countdown--mini--second">
                            <time>{seconds}</time>
                            <span>sec</span>
                        </div>
                    </div>
                </>
            )
        }
    };

    return <Countdown renderer={renderer} date={project.open_date} />
}

export default MiniCountdown