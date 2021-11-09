import ProjectTimeline from "../../../concepts/steps/projectTimeline";
import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline step="1" />
            </div>

            <div className="global-padding-lg min-h-full">

              <div className="">
<<<<<<< HEAD
                <h3 class="text-3xl text-center mb-8 font-normal">
                  <span className="text-color-title">The whitelist will open in</span>
=======
                <h3 class="text-2xl text-center mb-8 font-normal">
                  <span className="text-color-title">Danh sách đăng ký mua Parallel sẽ được mở trong</span>
>>>>>>> 2f1da7c6409001dfc6d3201a33c6145c2b5dac5f
                </h3>
                <CountDownLg />
              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default MainActions