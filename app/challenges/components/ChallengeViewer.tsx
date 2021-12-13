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
  body,
  author,
}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>
        by
        <Link href={Routes.ShowUserPage({ userId: author.id })}>
          <a> {author.name || "anyonmus user"}</a>
        </Link>
        , {new Date(updatedAt).toLocaleDateString("en-US")}
      </p>
      <Markdown markdown={body} />
      <div>submit the flag</div>
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
