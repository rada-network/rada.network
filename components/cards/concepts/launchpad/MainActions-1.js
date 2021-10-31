import ProjectTimeline1 from "../../../concepts/steps/projectTimeline-1";
import CountDownLg from "../../../concepts/timers/countdownLg";

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline1 />
            </div>

            <div className="global-padding">

              <div className="">
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