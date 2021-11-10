import { WalletProfile } from '../../../../Wallet';
import Timeline from './Timeline';
import useActiveWeb3React from '@utils/hooks/useActiveWeb3React';
import Subscriber from './Subscriber';
import SubscribeSwapToken from './SubscribeSwapToken';

const SubscribeLaunchpad = ({project}) => {
  const {account,library} = useActiveWeb3React()
  if (!!account) {
    return <SubscribeSwapToken project={project} />
  }
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

            <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">

              <div className="mb-8">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">{project?.token.name}'s Whitelist</span>
                </h3>
                <p className="text-center mt-2 font-normal">
                  Đăng ký để được xét duyệt tham gia dự án
                </p>
              </div>

              <div className="list-group">
                <WalletProfile />

                <div className="list-group--item md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/4">
                    <div className="list-group--item--media">
                      <span className="icon"><i className="fas fa-user-check"></i></span>
                    </div>
                    <label for="blockchain-wallet" className="text-color-desc">KYC</label>
                  </div>
                  <div className="flex-1 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full flex items-center">
                      <span>Chưa hoàn thành KYC</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/5">
                    <button className="btn btn-default w-full">KYC</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
            
        </div>

      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-8">

        <div className="card-header items-center">
          <h3>Subscriber (1000)</h3>
          <div className="search-wrapper">
            <div className="form-search rounded-full">
              <span className="icon form-search--icon">
                <i className="fa fa-search"></i>
              </span>
              <input type="text" value="" className="form-search--input" placeholder="Search for winner" />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="global-padding-lg min-h-full">

              <div className="">

                <Subscriber project={project} />

              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}


export default SubscribeLaunchpad