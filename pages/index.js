// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';
import {PromoList} from '../components/card-layouts/PromoList';
import {TopUsersList} from '../components/card-layouts/TopUsersList';
import {CategoryList} from '../components/card-layouts/CategoryList';

//ReactIcons
import {IoChevronForwardSharp} from "react-icons/io5";
import getClient from "../data/client";
import postQuery from "../data/query/posts"
import postNftQuery from "../data/query/postsNFT"
import useSWR from "swr";
import {NftList} from "../components/card-layouts/NftList";


const getData = async () => {
    console.log("get data")
    const client = getClient()
    const posts = await client.query({
        query: postQuery,
        variables: {skip: 0, take: 4}
    })
    const postsNFT = await client.query({
        query: postNftQuery,
        variables: {skip: 0, take: 4, itemType: "nft"},
    })
    console.log("post",posts)
    console.log("postNFt",postsNFT)
    return {
        posts: posts.data.itemFeed,
        postsNFT: postsNFT.data.itemFeed,
    }
}

export default function Home(props) {
    const {data} = useSWR('homepage', getData, {initialData: props})
    return (
        <Layout extraClass="page-home">
            <Header/>
            <ProjectsList
                grid="2"
                gap="2"
                title="Popular Projects Today"
                posts={data.posts}
            />
            <CategoryList
                extraClass="category-list"
                grid="5"
                gap="5"
                title="Project Categories"
                cta="View all"
            />
            <NftList
                grid="2"
                gap="2"
                title="NFTs that you cannot missed"
                posts={data.postsNFT}
            />
            <ProjectsList
                grid="2"
                gap="2"
                title="Most Active Dapps in a Week"
                posts={data.posts}
            />
            <TopUsersList
                grid="5"
                gap="5"
            />
            <ProjectsList
                grid="1"
                gap="2"
                title="New Projects Today"
                posts={data.posts}
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
                posts={data.posts}
            />
        </Layout>
    )
}

export async function getStaticProps() {
    const props = await getData();
    return {
        props,
        revalidate: 1
    }
}