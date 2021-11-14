import Subscriber from "./Subscriber";
import Timeline from "./Timeline";
import SwapTokens from "./SwapToken"
import { useERC20 } from "@utils/hooks/useContracts";
import { useEffect,useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { utils } from "ethers";
import { WalletProfile } from "@components/Wallet";
import {useLaunchpadInfo} from "@utils/hooks/index"
const SubscribeSwapToken = ({project}) => {

  const {launchpadInfo} = useLaunchpadInfo({project})

  const rirContract = useERC20(launchpadInfo.rirAddress)
  const bUSDContract = useERC20(launchpadInfo.bUSDAddress)
  const {account} = useActiveWeb3React()
  const [accountBalance, setAccountBalance] = useState({})
  useEffect(() => {
    if (!!rirContract && !!account){
      fetchAccountBalance();
    }
  },[rirContract,account])
  const fetchAccountBalance =  async function(){
    let rirBalance = await rirContract.balanceOf(account);
    let busdBalance = await bUSDContract.balanceOf(account);
    setAccountBalance({
      rirBalance : utils.formatEther(rirBalance),
      busdBalance : utils.formatEther(busdBalance),
    })
  }
  let orderUsd = launchpadInfo?.currentOrder?.amountBUSD ? launchpadInfo?.currentOrder?.amountBUSD : 0
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">
        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="">
              <Timeline step="2" />
            </div>

            <div className="global-padding-lg !px-6 min-h-full w-full mx-auto">
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
                        {launchpadInfo?.individualMaximumAmount} USDT ( {launchpadInfo?.individualMaximumAmount/100} RIR )
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Quyền mua tối thiểu</span>
                      <span class="ml-auto list-value font-semibold">
                      {launchpadInfo?.individualMinimumAmount} USDT ( {launchpadInfo?.individualMinimumAmount/100} RIR )
                      </span>
                    </li>
                    {/* <li class="list-pair mb-2">
                      <span class="list-key">Your RIR</span>
                      <span class="ml-auto list-value font-semibold">
                      {accountBalance?.rirBalance} RIR
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Your BUSD</span>
                      <span class="ml-auto list-value font-semibold">
                      {accountBalance?.busdBalance} BUSD
                      </span>
                    </li> */}
                    <li class="list-pair mb-2">
                      
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Đã mua</span>
                      <span class="ml-auto list-value font-semibold">
                        {utils.formatEther(orderUsd)} USDT ({parseInt(utils.formatEther(orderUsd))/100} RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Còn lại</span>
                      <span class="ml-auto font-semibold">
                        {launchpadInfo?.individualMaximumAmount - parseInt(utils.formatEther(orderUsd))} USDT ({(launchpadInfo?.individualMaximumAmount - parseInt(utils.formatEther(orderUsd)))/100} RIR)
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <WalletProfile />
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
                  <div className="box-header">Subscribe launchpad</div>
                  <SwapTokens project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-4">
        <div className="card-header items-center">
          <h3>Subscriber ({launchpadInfo?.ordersBuyerCount})</h3>
          <div className="search-wrapper">
            <div className="form-search rounded-full">
              <span className="icon form-search--icon">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                value=""
                className="form-search--input"
                placeholder="Search for winner"
              />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="global-padding-lg min-h-full">
              
              <Subscriber project={project} buyers={launchpadInfo.buyers} />  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscribeSwapToken