import {getPage} from "../../data/query/page";

export default function StaticPage({slug, page}) {
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
  
export async function getStaticProps({params}) {
    const page = await getPage({slug: params.slug})
    return {
        props: {
            slug: params.slug,
            page: page.data.pageBySlug
        }
    }
}