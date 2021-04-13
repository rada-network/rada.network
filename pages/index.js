// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export default function Home(props) {

  return (
    <Layout extraClass="page-home">
      <Header />
      <ProjectsList
        grid="2"
        gap="2"
        title="Today"
        cta="Sorted by"
      />
      <ProjectsList
        grid="1"
        gap="2"
        title="Yesterday"
        cta="Sorted by"
      />
      <ProjectsList
        grid="2"
        gap="2"
        title="10 Jan"
        cta="Sorted by"
      />
    </Layout>
  )
}

