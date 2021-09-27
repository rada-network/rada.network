import {getPage} from "../../data/query/page";
import { StaticLayout } from '../../components/page-layouts/StaticLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";


export default function StaticPage(props) {
    if (!props.page) return <h1>Page not found</h1>
    const homeStore = new HomeStore({isHome : false});
    const dataStore = new ObservableTweetStore({homeStore})
    const detailStore = new DetailStore();
    dataStore.lang = props.lang
    const meta = {
        "title" : props.page['title']
    }
    let content = props.page.content,title = props.page.title
    if (props.lang == "en"){
        content = props.page.content_en
        title = props.page.title_en
    }
    return (
        <StaticLayout meta={meta} detailStore={detailStore} dataStore={dataStore}>
            <div className={`page-section`}  >
                <div className={`post-content`}  >
                <div className="post-title">
                    <h1 className="inline">{title}</h1>
                </div>
                <div dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
            </div>
        </StaticLayout>
        
    )
}

export async function getStaticPaths() {
    return {
        paths: [
        ],
        fallback: 'blocking',
    }
}
  
export async function getStaticProps({params,locale}) {
    const page = await getPage({slug: params.slug, lang: locale})
    if (!page){
        return {
            notFound: true
          }
    }
    return {
        props: {
            ...await serverSideTranslations(locale, ['common', 'navbar']),
            lang : locale,
            page : page
        }
    }
}