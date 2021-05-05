import { useMemo } from 'react'
import { types, applySnapshot } from 'mobx-state-tree'
import { useWallet, ConnectionRejectedError } from 'use-wallet'

const fetcher = (url) => window.fetch(url).then((response) => response.json())

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
    totalVotes: 0,
    totalComments: 0
})

const Projects = types.model({
    total: types.optional(types.integer, 0),
    items: types.maybe(types.map(ProjectInfo))
})

const Store = types
  .model({
    wallet: types.optional(Wallet, {}),
    projects: types.optional(Projects, {})
  }).actions((self) => ({
    afterCreate() {
        //self.wallet.loadWallet()
    }
  }))

export function initializeStore(snapshot = null) {
  const _store = store ?? Store.create({  })

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store
window.store = store
  return store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}