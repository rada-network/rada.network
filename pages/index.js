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
        gap="2"
        title="Today"
        cta="View all Collections"
      />
    </Layout>
  )
}

