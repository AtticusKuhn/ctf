// import getChallenges from "app/challenges/qeries/getChallenges"
import Layout from "app/core/layouts/Layout"
import { useRouter, usePaginatedQuery, BlitzPage } from "blitz"
import { Routes, Link } from "blitz"

import React, { Suspense } from "react"
import listCategories from "../queries/listCategories"
const Category: React.FC<{name:string}>=({name})=>{
    console.log("name is", name)
    return (<>

    <Link href={Routes.Categories({category: name})}> 
        {name}
    </Link>
    <br />
</>)}
const CategoriesPage = ()=>{
    const router = useRouter()
    const page = Number(router.query.page) || 0
    const selectedCategories =router.query.category 


    const [{categories , hasMore }] = usePaginatedQuery(listCategories, {
      orderBy: { id: "asc" },
      ...(selectedCategories && {where: {
        name:{
            in: selectedCategories
        }
    }}),

    //   selectedCategories && ,
      skip: 10 * page,
      take: 10,
    })
    // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
    // const goToNextPage = () => router.push({ query: { page: page + 1 } })
   
    return (<>
    these are our categories:
    {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
    {categories.map((c,i)=><Category key={i} name={c.name} />)}
    <br />
    {/* selectedCategories: {selectedCategories} */}
    </>)
}
const Categories: BlitzPage =()=>(<Suspense fallback="loading">
    <CategoriesPage />
</Suspense>)

Categories.getLayout = (page) => <Layout title={"View the Categories"}>{page}</Layout>

export default Categories