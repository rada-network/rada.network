import {getPage} from "../../data/query/page";

export default function StaticPage({page}) {
    if (!page) return <h1>Page not found</h1>

    return (
        <div className={`pane-content`}  >
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{__html: page.content}}></div>
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
        ],
        fallback: 'blocking',
    }
}
  
export async function getStaticProps({params, locale}) {
    const page = await getPage({slug: params.slug, lang: locale})
    return {
        props: {
            page
        }
    }
}