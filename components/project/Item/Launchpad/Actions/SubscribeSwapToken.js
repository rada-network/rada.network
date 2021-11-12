import Subscriber from "./Subscriber";
import Timeline from "./Timeline";
import SwapTokens from "./SwapToken"
const SubscribeSwapToken = ({ project }) => {

  return (
    <>
      <div className="mb-8 sr-only">
        <h3 className="text-3xl text-center font-normal">
          <span className="text-color-title">Chuyển đổi Token</span>
        </h3>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="box box--transparent">

          <div className="box-header !px-0">Quyền mua của bạn</div>

          <ul class="mt-4 flex-shrink-0 flex-grow">
            <li class="list-pair mb-2">
              <span class="list-key">Quyền mua tối đa</span>
              <span class="ml-auto list-value font-semibold">
                {project.launchpadInfo.individualMaximumAmount} USDT ( {project.launchpadInfo.individualMaximumAmount / 100} RIR )
              </span>
            </li>
            <li class="list-pair mb-2">
              <span class="list-key">Quyền mua tối thiểu</span>
              <span class="ml-auto list-value font-semibold">
                {project.launchpadInfo.individualMinimumAmount} USDT ( {project.launchpadInfo.individualMinimumAmount / 100} RIR )
              </span>
            </li>
            {/* <li class="list-pair mb-2">
                      <span class="list-key">Đã mua</span>
                      <span class="ml-auto list-value font-semibold">
                        100 USDT (1 RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Còn lại</span>
                      <span class="ml-auto font-semibold">
                        200 USDT (2 RIR)
                      </span>
                    </li> */}
          </ul>

          <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
            <p>
              <span className="icon mr-2 text-base">
                <i class="fas fa-info-circle text-yellow-500"></i>
              </span>
              <span>
                Some notices about rights or terms here.
              </span>
            </p>
          </div>

        </div>

        <div className="box box--gray">
          <div className="box-header">Swap Token</div>
          <SwapTokens project={project} />
        </div>

      </div>

    </>
  );
}

export default SubscribeSwapToken