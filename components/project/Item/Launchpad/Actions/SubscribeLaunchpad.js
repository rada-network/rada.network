import HTMLHead from "next/head";
import { WalletProfile } from '../../../../Wallet';
import Timeline from './Timeline';
import useActiveWeb3React from '@utils/hooks/useActiveWeb3React';
import Subscriber from './Subscriber';
import SubscribeSwapToken from './SubscribeSwapToken';
import useStore from '@lib/useStore';
import { useEffect, useState } from "react";
import fetchJson from "@lib/fetchJson";
import useSWR from 'swr'

const SubscribeLaunchpad = ({ project }) => {
  const store = useStore()

  const {data} = useSWR('/api/kyc-status?refId=' + store.user.id, fetchJson)
  if (data) store.kyc.update(data.status)

  console.log('User: ', store.user.id)
  const { account, library } = useActiveWeb3React()
  if (!!account) {
    //return <SubscribeSwapToken project={project} />
  }
  return (
    <>
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
        <Login />
        <KYC />
      </div>

    </>
  );
}

const Login = () => {
  const store = useStore()
  const Info = () => {
    if (store.user.id) return <span>{store.user.id.split('-').pop()}</span>
    return <span>Login</span>
  }
  const Button = () => {
    if (store.user.id) return <span>Done</span>
    return <button className="btn btn-default w-full" onClick={e => store.user.showConnect(true)}>Login</button>
  }
  return (
    <div className="list-group--item md:!pb-4">
      <div className="list-group--item--title w-full md:w-1/4">
        <div className="list-group--item--media">
          <span className="icon"><i className="fas fa-user-check"></i></span>
        </div>
        <label for="blockchain-wallet" className="text-color-desc">User</label>
      </div>
      <div className="flex-1 md:mt-0">
        <div className="relative pl-8 md:pl-0 w-full flex items-center">
          <Info />
        </div>
      </div>
      <div className="text-right -mt-2 md:mt-0 w-1/5">
        <Button />
      </div>
    </div>
  )
}

const KYC = () => {
  const store = useStore()

  const Info = () => {
    if (store.kyc.status) return <span>{store.kyc.status}</span>
    return <span>Click to KYC</span>
  }

  const Button = () => {
    const [loadlib, setLoadlib] = useState(false)
    const clientId = process.env.BLOCKPASS_CLIENTID || "rada_launchverse_b9128" // why empty from env 

    useEffect(() => {
      if (store.kyc.status) return 

      if (!loadlib && !window.BlockpassKYCConnect) {
        let intervalId = 0
        const checkLoad = () => {
          if (window.BlockpassKYCConnect) {
            clearInterval(intervalId)
            setLoadlib(true)
          }
        }
        setInterval(checkLoad, 1000)
        return
      }

      const userId = store.user.id

      const blockpass = new window.BlockpassKYCConnect(
        clientId, // service client_id from the admin console
        {
          refId: userId, // assign the local user_id of the connected user
        }
      )
      blockpass.startKYCConnect()

      blockpass.on('KYCConnectSuccess', () => {
        //add code that will trigger when data have been sent.
        console.log('done: ', arguments)
      })

    }, [loadlib])

    if (store.kyc.status) return <span></span>
    return <button className="btn btn-default w-full" id="blockpass-kyc-connect">KYC</button>
  }

  return (
    <>
      <HTMLHead>
        <script src='https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js'></script>
      </HTMLHead>
      <div className="list-group--item md:!pb-4">
        <div className="list-group--item--title w-full md:w-1/4">
          <div className="list-group--item--media">
            <span className="icon"><i className="fas fa-user-check"></i></span>
          </div>
          <label for="blockchain-wallet" className="text-color-desc">KYC</label>
        </div>
        <div className="flex-1 md:mt-0">
          <div className="relative pl-8 md:pl-0 w-full flex items-center">
            <Info />
          </div>
        </div>
        <div className="text-right -mt-2 md:mt-0 w-1/5">
          <Button />
        </div>
      </div>
    </>
  )
}


export default SubscribeLaunchpad