import React, { useEffect, useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProject } from "@data/query/projects";
import { usePageStore } from "@lib/usePageStore";
import useStore from "@lib/useStore";
import myUtils from "@lib/util";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Layout = dynamic(import("@components/page-layouts/Global"));
const ProjectItem = dynamic(import("@components/project/Item/Index"));

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
  return (
    <Layout
      extraClass="glassmorphism"
      bgImage={project.background_uri}
      meta={meta}
    >
      <div className={`pane-content`} ref={containerRef}>
        <ProjectItem project={project} slug={slug} page={page} />
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
