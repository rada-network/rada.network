import {getItemById, getItems} from "./getItem";

const details = {
    title: '',
    description: '',
    thumbnailUri: '',
    source: '',
    content: '',
    keywords: '',
    createdAt: '',
    websiteUri: '',
}

const launch_info = {
    symbol: 'MAT',
    name: 'Moniwar',
    img: "https://picsum.photos/600/300?random=1",
    tokenLogo: "./../../token-logos/moniwar.png",
    total: 450,
    price: 0.1,
    max_allocation: 1,
    min_allocation: 0.5,
    title: 'Moniwar',
    description: 'Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue.',
    start_time: '',
}

// get project information by symbol
export async function getProject({symbol}) {
    return {
        ...launch_info,
        id: `project-1`,
        details
    }
}

export async function getProjects() {
    const projects = []
    const project_news = await getItems({take: 10,skip: 0, orderBy: {createdAt : "desc"},query: '', type: 'projects', lang: 'en'})
    project_news.data.itemFeed.forEach((item, i) => {
        projects.push({
            ...launch_info, 
            id: `project-${i+1}`,
            details: {...item}
        })

    })
    return projects
}