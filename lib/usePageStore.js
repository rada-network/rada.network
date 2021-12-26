import {  createContext, useContext } from "react";
import {
  DetailStore,
  HomeStore,
  ObservableTweetStore,
  VoteStore,
} from "./store";
import _ from "lodash";

const PageStoreContext = createContext();

let pageStore;

export function initializePageStore() {
  const voteStore = new VoteStore();
  const homeStore = new HomeStore({ isHome: false });

  const observableItemStore = new ObservableTweetStore({ homeStore });
  const detailStore = new DetailStore();
  const _store = {
    dataStore: observableItemStore,
    detailStore: detailStore,
    voteStore: voteStore,
  };
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (_.isEmpty(pageStore)) {
    pageStore = _store;
  }
  return pageStore;
}

export function PageStoreProvider({ children }) {
  const store = initializePageStore();
  return (
    <PageStoreContext.Provider value={store}>
      {children}
    </PageStoreContext.Provider>
  );
}

export function usePageStore() {
  return useContext(PageStoreContext);
}
