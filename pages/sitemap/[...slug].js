// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import  {getItems} from '@data/query/getItem';
import {getProjects} from '@data/query/projects';
const getSiteMapNews = async ({ type, lang }) => {
  const itemFeed = await getItems({
    take: 200,
    skip: 0,
    orderBy: { createdAt: "desc" },
    query: "",
    type: type,
    lang: lang,
  });
  let fields = []
  fields.push({
    loc: `https://rada.network/${lang}/explore/${type}`, // Absolute url
    lastmod: new Date().toISOString(),
    changefreq : "daily",
    priority : 1
  },)
  for (let item of itemFeed.data.itemFeed) {
    fields.push({
      loc: `https://rada.network/${lang}/post/${item.news.slug}`, // Absolute url
      lastmod: new Date().toISOString(),
      changefreq : "daily",
      priority : 0.7
    },)
  }
  return fields
};

const getSiteMapLaunchVerse = async ({ lang }) => {
  const itemFeed = await getProjects({ lang})
  let fields = []
  fields.push({
    loc: `https://rada.network/${lang}/launchverse`, // Absolute url
    lastmod: new Date().toISOString(),
    changefreq : "daily",
    priority : 1
  },)
  for (let item of itemFeed) {
    fields.push({
      loc: `https://rada.network/${lang}/launchverse/${item.slug}`, // Absolute url
      lastmod: new Date().toISOString(),
      changefreq : "daily",
      priority : 0.7
    },)
  }
  return fields
};


export const getServerSideProps = async (context) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const key = context.params.slug[0]
  let fields = []
  switch (key) {
    case "main.xml":
      fields = [
        {
          loc: `https://rada.network/${context.locale}/sitemap/launchverse.xml`, // Absolute url
          lastmod: new Date().toISOString(),
          changefreq : "daily",
          priority : 0.7
        },
        {
          loc: `https://rada.network/${context.locale}/sitemap/about.xml`, // Absolute url
          lastmod: new Date().toISOString(),
          changefreq : "daily",
          priority : 0.7
        },
        {
          loc: `https://rada.network/${context.locale}/sitemap/research.xml`, // Absolute url
          lastmod: new Date().toISOString(),
          changefreq : "daily",
          priority : 0.7
        },
        {
          loc: `https://rada.network/${context.locale}/sitemap/articles.xml`, // Absolute url
          lastmod: new Date().toISOString(),
          changefreq : "daily",
          priority : 0.7
        },
        
      ]
      break;
    case "launchverse.xml":
      fields = await getSiteMapLaunchVerse({lang : context.locale})
      break;
    case "about.xml":
      fields = await getSiteMapNews({lang : context.locale,type : "about-rada"})
      break;  
    case "research.xml":
      fields = await getSiteMapNews({lang : context.locale,type : "research"})
      break;
    case "articles.xml":
      fields = await getSiteMapNews({lang : context.locale,type : "articles"})
      break;
    default:
      break;
  }
  

  return getServerSideSitemap(context, fields)
}

// Default export to prevent next.js errors
export default () => {}