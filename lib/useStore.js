import {  useMemo, createContext, useContext } from 'react'
import { types, applySnapshot, flow, onSnapshot } from 'mobx-state-tree'
import { useWallet } from 'use-wallet'

const StoreContext = createContext();

let store

const Wallet = types.model({
    address: types.optional(types.string, ""),
    showingConnect: types.optional(types.boolean, false)
}).views((self) => ({
    get isConnected() {
        return self.address !== ""
    },
})).actions(self => ({
    update(address) {
        self.address = address || ''
        if (address) self.showingConnect = false
    },
    showConnect(showing) {
        self.showingConnect = showing
    },
}))

const Store = types
  .model({
    wallet: types.optional(Wallet, {}),
    inited: false
  }).actions((self) => ({
    afterCreate() {
        //self.wallet.loadWallet()
    }
  }))

export function initializeStore() {
  const _store = store ?? Store.create({wallet: {}, projects: {}})

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
//   if (snapshot) {
//     applySnapshot(_store, snapshot)
//     _store.inited = true
//   }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  const snapshot = JSON.parse(localStorage.getItem('dhunt-store') || '{}')
  if (snapshot) {
    snapshot.inited = false
    applySnapshot(_store, snapshot)
  }
  
  onSnapshot(_store, snapshot => {
    localStorage.setItem('dhunt-store', JSON.stringify(snapshot))
  })

  // Create the store once in the client
  if (!store) store = _store
  if (typeof window !== 'undefined') window.store = store
  return store
}

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// }

export function StoreProvider({ children }) {
    const store = initializeStore()
    // const wallet = useWallet()
    // wallet.connect('walletconnect')
    // connect wallet if last time is connected
    //if (store.wallet.isConnected) store.wallet.showConnect(true)

    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    );
  }
  
export function useStore() {
    return useContext(StoreContext);
}