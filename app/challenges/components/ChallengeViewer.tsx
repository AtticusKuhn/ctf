import React from "react"

import Markdown from "app/components/markdown"
import { Link, Routes } from "blitz"

export interface ChallengeViewerProps {
  isPreview?: boolean
  title: string
  updatedAt: Date
  difficulty: string
  body: string
  categories: { id: number; name: string }[]
  author: {
    id: number
    name: string | null
  }
}
const ChallengeViewer: React.FC<ChallengeViewerProps> = ({
  isPreview = false,
  title,
  updatedAt,
  categories,
  difficulty,
  body,
  author,
}) => {
  const Category = (category:{ id: number; name: string })=>(<>
  <Link href={Routes.CategoriesPage({category: category.name})}><a>{category.name}</a></Link></>)
  return (
    <>
      <h1>{title}</h1>
      Categories: {categories.map((c,i)=><Category key={i} {...c} />)} <br />
      difficulty: {difficulty} <br />
      <p>
        by
        <Link href={Routes.ShowUserPage({ userId: author.id })}>
          <a> {author.name || "anyonmus user"}</a>
        </Link>
        , Created {new Date(updatedAt).toLocaleDateString("en-US")}
      </p>
      <Markdown markdown={body} />
      <div>submit the flag</div>
      <p>Struggling? <Link  href={Routes.ArticlesPage({categories: categories.map(c=>c.name)})}><a>get help with related articles</a></Link></p>
      <input placeholder="submit flag" />
      <br />
      <button disabled={isPreview} onClick={() => isPreview || alert("TODO: not implemented")}>
        submit
      </button>
      <br />
    </>
  )
}
export default ChallengeViewer
