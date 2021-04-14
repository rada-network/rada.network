// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';
import {PromoList} from '../components/card-layouts/PromoList';
import {TopSellersList} from '../components/card-layouts/TopSellersList';
import {CategoryList} from '../components/card-layouts/CategoryList';

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export default function Home(props) {

  return (
    <Layout extraClass="page-home">
      <Header />
      <ProjectsList
        grid="2"
        gap="2"
        title="Popular Projects Today"
      />
      <CategoryList
        extraClass="category-list"
        grid="5"
        gap="5"
        title="Project Categories"
        cta="View all"
      />
      <ProjectsList
        grid="2"
        gap="2"
        title="NFTs that you cannot missed"
      />
      <ProjectsList
        grid="2"
        gap="2"
        title="Most Active Dapps in a Week"
      />
      <TopSellersList
        grid="5"
        gap="5"
      />
      <ProjectsList
        grid="1"
        gap="2"
        title="New Projects Today"
      />
      <PromoList
        extraClass="promo-list"
        grid="3"
        gap="5"
      />
       <ProjectsList
        grid="1"
        gap="2"
        title="All Projects"
        cta="Sorted by"
      />
    </Layout>
  )
}

