import Timeline from "./Timeline";
import Countdown from "./Countdown";
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";

const LaunchpadActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <Timeline step="1" />
            </div>

            <div className="global-padding-lg min-h-full">

              <div className="">
                <h3 class="text-3xl text-center mb-8 font-normal">
                  <span className="text-color-title">Danh sách đăng ký mua Parallel sẽ được mở trong</span>
                </h3>
                <Countdown />
              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default LaunchpadActions