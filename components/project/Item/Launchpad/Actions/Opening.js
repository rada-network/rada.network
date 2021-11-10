import HTMLHead from "next/head";
import { useEffect, useState } from "react";
import { WalletProfile } from "../../../../Wallet";
import { getProviders, getSession, signIn } from "next-auth/client"

import useStore from "../../../../../lib/useStore";

export default function ProjectOpening({ project }) {
    const store = useStore()


    // countdown ending
    return (
        <>
            <HTMLHead>
                <script src='https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js'></script>
            </HTMLHead>

            <div>
                <WalletProfile />
                <KYC store={store} />
            </div>

            <div>

            </div>
        </>
    )
}

const KYC = ({ store }) => {

    // get user session
    const [session, setSession] = useState()
    useEffect(() => {
        let cancel = false
        getSession().then((sess) => {
            if (cancel) return
            setSession(sess);
        })
        return () => {
            cancel = true;
        }
    }, [])
console.log('sess: ', session)
    const LoginToKYC = () => <span onClick={() => store.user.showConnect(true)}>Login to KYC</span>
    
    const KYCButton = ({userId}) => {
        useEffect(() => {
            console.log('init kyc with: ', userId)
            const blockpass = new window.BlockpassKYCConnect(
                'rada_launchverse_b9128', // service client_id from the admin console
                {
                    refId: userId, // assign the local user_id of the connected user
                }
            )
    
            blockpass.startKYCConnect()
    
            blockpass.on('KYCConnectSuccess', () => {
                //add code that will trigger when data have been sent.
                console.log('done: ', arguments)
            })

    
            blockpass.on('KYCConnectClose', () => {
                //add code that will trigger when the workflow is finished. ex:
                //alert('Finished!')
                console.log('close: ', arguments)
            })
    
            blockpass.on('KYCConnectCancel', () => {
                //add code that will trigger when the workflow is aborted. ex:
                //alert('Cancelled!')
                console.log('cancel: ', arguments)
            })            

        }, [])

        return (
            <>

            <button id="blockpass-kyc-connect">
                Verify with Blockpass
            </button>
            </>
        )
    }

    if (!session) {
        return <LoginToKYC />
    } else {
console.log('user: ', session.user.id)        
        return <KYCButton userId={session.user.id} />
    }
}