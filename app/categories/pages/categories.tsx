// import getChallenges from "app/challenges/qeries/getChallenges"
import Layout from "app/core/layouts/Layout"
import { useRouter, usePaginatedQuery, BlitzPage } from "blitz"
import { Routes, Link } from "blitz"

import React, { Suspense } from "react"
import contentInCategory from "../queries/contentInCategory"
import listCategories from "../queries/listCategories"
const Category: React.FC<{name:string}>=({name})=>{
    console.log("name is", name)
    return (<>

    <Link href={Routes.Categories({category: name})}> 
        {name}
    </Link>
    <br />
</>)}
const ViewAllCategories: React.FC<{}> = ()=>{
    // const temp: string[] =  Array.isArray(selectedCategories) ? selectedCategories :  [selectedCategories]
    const [{categories , hasMore }] = usePaginatedQuery(listCategories, {
        orderBy: { id: "asc" },
        
        skip:0,
        take: 10,
      })
    return    <> These are all our categories <br />
    {categories.map((c,i)=><Category key={i} name={c.name} />)} </>

}
const ViewContent: React.FC<{title:string, id:number, type:string}>=({title, id, type})=>(<>
    
    <Link href={type === "article" ? Routes.ShowArticlePage({articleId:id}) : Routes.ShowChallengePage({challengeId:id})}><a>
    <h1>{title}</h1>
        </a></Link>
</>)
const ViewInCategory: React.FC<{selectedCategories: string | string[]}> = ({selectedCategories})=>{
    const tags = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories]
    const [{articles, challenges }] = usePaginatedQuery(contentInCategory, {
        orderBy: { id: "asc" },
        where:{
            categories:{some:{name: {in:tags}}}
        },
        skip:0,
        take: 10,
      })
      const content = [...articles.map(e=>Object.assign(e, {type:"article"})), ...challenges.map(e=>Object.assign(e, {type:"challenge"})) ]
    console.log("content", content)
    return <>
        here is all content in the category of {tags.join(", ")}
        <Link href={Routes.Categories()}><a>clear selection</a></Link>
        {content.map((e, i)=><ViewContent key={i} {...e} />)}
    </>
}
const CategoriesPage = ()=>{
    const router = useRouter()
    // const page = Number(router.query.page) || 0
    const selectedCategories =router.query.category 
    if(!selectedCategories){
        return    <ViewAllCategories />
    }else{
        return <ViewInCategory selectedCategories={selectedCategories} />
    }
    // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
    // const goToNextPage = () => router.push({ query: { page: page + 1 } })
   
   
}
const Categories: BlitzPage =()=>(
    <Suspense fallback="loading">
        <CategoriesPage />
    </Suspense>
)
Categories.getLayout = (page) => <Layout title={"View the Categories"}>{page}</Layout>

export default Categories