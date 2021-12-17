import React, { useEffect, useRef,useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProject } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import useStore from "@lib/useStore";
import myUtils from "@lib/util";
import { useRouter } from "next/router";
import Layout from "@components/page-layouts/Global";
import ProjectItem from "@components/project/Item/Index";
import fetcher from "@lib/fetchJson";

export default function ProjectPage({ slug, project, locale }) {
  const { dataStore } = usePageStore();
  const { locales, asPath } = useRouter();
  const store = useStore();
  dataStore.page = "launchverse";
  dataStore.lang = locale;
  const page = slug.length > 1 ? slug[1] : "index";

  const meta = myUtils.createSiteMetadata(
    {
      page: "ProjectDetail",
      subPage: page,
      dataStore: dataStore,
      data: project,
    },
    locales,
    asPath
  );
  const [selectedPool,setSelectedPool] = useState(null)
  const [poolContract,setPoolContract] = useState(null)

  useEffect(() => {
    let pool = {}
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      pool = project.project_pool.find(function(item){
        return item.slug == hash
      })
      if (!pool){
        pool = project.project_pool[0]
      }




    } else {
      // not contain hash
      pool = null  
      //project.project_pool[0]

    }
    setSelectedPool(pool)
  }, [asPath]);

  useEffect(() => {
    console.log(selectedPool)
    console.log(poolContract)
  }, [selectedPool])

  useEffect(() => {
    if (selectedPool !== null) {
      fetcher(`/api/pools/get-pools?slug=${project.slug}`).then(function(res){
        if (!!res[selectedPool.slug]){
          setPoolContract({...selectedPool,id : res[selectedPool.slug].pool_id,contract : res[selectedPool.slug].contract })
        }
        else{
          setPoolContract({...selectedPool,id : null,contract : "" })
        }
      })
    }
    
  }, [selectedPool]);



  store.updateNetwork(project?.platform.networkName);
  useEffect(() => {
    dataStore.meta = meta;
    document.body.classList.add("page-details");
    return () => {
      document.body.classList.remove("page-details");
    };
  }, [project]);

  /* Dragger to resize main col */
  const containerRef = useRef();
  //if (poolContact === null) return null
  return (
    <Layout
      extraClass="glassmorphism"
      bgImage={project.background_uri}
      meta={meta}
    >
      <div className={`pane-content`} ref={containerRef}>
        <ProjectItem project={project} pool={poolContract} slug={slug} page={page} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let project = await getProject({
    slug: context.params.slug[0],
    lang: context.locale,
  });
  if (Object.keys(project).length === 0) {
    return {
      notFound: true,
    };
  }
  let props = {
    locale: context.locale,
    slug: context.params.slug,
    project: await getProject({
      slug: context.params.slug[0],
      lang: context.locale,
    }),
  };
  props = Object.assign(props, {
    ...(await serverSideTranslations(context.locale, [
      "common",
      "navbar",
      "invest",
      "launchpad",
      "share2earn",
    ])),
  });
  return {
    props,
    revalidate: 60,
  };
}
