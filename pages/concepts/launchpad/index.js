import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import { ProjectsList } from "../_components/cards-layout/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";


import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";


const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {}

  return (
    <>
       <ul className="p-10">
            <li><a href="projects">Projects</a></li>
            <li>LaunchVerse Flow
            <ol className="ml-4 list-decimal">
                <li>Whitelist
                <ol className="ml-4">
                    <li><a href="./launchpad/project-whitelist-countdown">Whitelist Countdown</a></li>
                    <li><a href="./launchpad/project-whitelist-open">Whitelist Open</a></li>
                    <li><a href="./launchpad/project-whitelist-open-done">Whitelist Open - done</a></li>
                    <li><a href="./launchpad/project-whitelist-open-fail">Whitelist Open - fail</a></li>
                </ol>
                </li>
                <li>Prefunding
                    <ol className="ml-4">
                        <li><a href="./launchpad/project-prefunding-open-dropdown">Prefunding Open</a></li>
                    </ol>
                </li>
                <li>Status
                    <ol className="ml-4">
                        <li><a href="./launchpad/project-status-idle">Status - idle</a></li>
                        <li><a href="./launchpad/project-status-success">Status - success</a></li>
                        <li><a href="./launchpad/project-status-fail">Status - fail</a></li>
                    </ol>
                </li>
                <li><a href="./launchpad/project-claim">Claim</a></li>
            </ol>
            </li>
        </ul>

    </>
  );
})


export async function getStaticProps(context) {
  console.log(context)
  return { 
    props: {
      lang : context.locale
    }
  }
}

export default Layout;
