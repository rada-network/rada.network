import {Layout} from '../../components/page-layouts/OneColumn';
import {Header} from '../../components/headers/Header';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {ProjectsList} from "../../components/card-layouts/ProjectsList";
import {SocialPostsList} from "../../components/card-layouts/SocialPostsList";
import {observer} from "mobx-react";

import {useRouter} from "next/router";
import utils from "../../lib/util";
import {useStore} from "../../lib/useStore";


import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import {NewsList} from "../../components/card-layouts/NewsList";
import {getTweet} from "../../data/query/postsTweet";

const homeStore = new HomeStore({isHome: false})
const observableTweetStore = new ObservableTweetStore({homeStore})
const observableNewsStore = new ObservableTweetStore({homeStore})
const observableItemStore = new ObservableTweetStore({homeStore})

const getData = async (word) => {

  return {

  }
}
const voteStore = new VoteStore()

export default observer(function Explore(props) {
  const router = useRouter();
  let {word} = router.query;
  const data = props

  return (
    <Layout extraClass="page_topic" meta={"Top info from " + word}>
      <div className="wrapper">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* mainbody */}
            <div className="mainbody lg:col-span-9">
              <SocialPostsList
                grid="1"
                gap="4"
                title={"Tweet from " + word}
                titleIcon="fire-alt"
                titleIconColor="red-500"
                dataStore={observableTweetStore}
              />
              <NewsList
                grid="1"
                gap="4"
                title={"News from " + word}
                titleIcon="cube"
                titleIconColor="pink-500"
                dataStore={observableNewsStore}
              />
              <ProjectsList
                grid="1"
                gap="4"
                title={"Idea from " + word}
                cta="Sorted by"
                detail={true}
                itemType={'all'}
                dataStore={observableItemStore}
                voteStore={voteStore}
              />
            </div>
            {/* Sidebar */}
            <Sidebar extraClass=""/>
          </div>

        </div>
      </div>

    </Layout>
  )

})

export async function getServerSideProps(context) {
  const {word} = context.query;
  const props = await getData(word)
  return {
    props: props
  }
}