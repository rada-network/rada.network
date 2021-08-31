import Link from 'next/link'

// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Concepts
import SearchInput from "../components/search"
import {PostsList} from "../components/card-layouts/concepts/PostsList";
import {PostsListTrending} from "../components/card-layouts/concepts/PostsListTrending";

export default observer((props) => {

      {/* main content pane */}
      <div className={`pane-content--main`}>
        <PostsList title="Trends hunter for Cardano Community" />

        <div className={`pane-content--main--top`}>

          <div className="flex-1">
            {/* Search */}
            <SearchInput />
          </div>

          <div className="flex-shrink-0">
            {/* Sort */}
            <div className="btn-group btn-group-filter">
              <a className="btn btn-filter">Popular</a>
              <a className="btn btn-filter-active">Latest</a>
            </div>
          </div>

        </div>

        <div className={`pane-content--main--main`}>
          <PostsList />
        </div>

      </div>

      {/* secondary content pane */}
      <div className={`pane-content--sec scrollbar`} ref={scrollBox}>
        <PostsListTrending title="Most Popular" />
      <div className={`pane-content--sec`}>

        <div className={`pane-content--sec--top`}>
        </div>

        <div className={`pane-content--sec--main scrollbar`} ref={scrollBox}>
          <PostsListTrending title="Most Popular" />
        </div>

      </div>

    </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const props = await getData();
  return {
    props,
    revalidate: 900
  }
}