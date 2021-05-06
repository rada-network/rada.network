import {  useMemo, createContext, useContext } from 'react'
import { types, applySnapshot, flow } from 'mobx-state-tree'

const StoreContext = createContext();

let store

const Wallet = types.model({
    address: types.optional(types.string, ""),
    showingConnect: types.optional(types.boolean, false)
}).views((self) => ({
    get isConnected() {
        return self.address != ""
    },
})).actions(self => ({
    update(address) {
        self.address = address
        if (address) self.showingConnect = false
    },
    showConnect(showing) {
        self.showingConnect = showing
    },
}))

const ProjectInfo = types.model({
    id: types.identifier,
    totalVote: types.optional(types.integer, 0),
    totalComment: types.optional(types.integer, 0),
}).views(self => ({

})).actions(self => {
    const update = (json) => {
        self.totalVote = json?.totalVote || 0
        self.totalComment = json?.totalComment || 0
    }

    return {update}
})

const Projects = types.model({
    total: types.optional(types.integer, 0),
    items: types.map(ProjectInfo)
}).views(self => ({
})).actions(self => {
    const item = (id) => {
        let p = self.items.get(id)
        
        if (!p) {
            p = ProjectInfo.create({id})
        }
        self.items.put(p)
        return p
    }

    const update = (json) => {
        json.forEach((item) => {
            self.items.put(item)
        })        
    }

    return {
        item, update
    }
})

const Store = types
  .model({
    wallet: types.optional(Wallet, {}),
    projects: types.optional(Projects, {items: {}})
  }).actions((self) => ({
    afterCreate() {
        //self.wallet.loadWallet()
    }
  }))

export function initializeStore(snapshot = null) {
  const _store = store ?? Store.create({wallet: {}, projects: {}})

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
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
    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    );
  }
  
export function useStore() {
    return useContext(StoreContext);
}