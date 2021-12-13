import React from "react"

import Markdown from "app/components/markdown"
import { Link, Routes } from "blitz"

interface ChallengeViewerProps {
    isPreview?: boolean;
    title:string;
    updatedAt:Date;
    body: string;
    authorId:number;
}
const ChallengeViewer:React.FC<ChallengeViewerProps> = ({isPreview=false, title, updatedAt, body, authorId})=>{
    return <>
    <h1>{title}</h1>
        <p>by 
        <Link href={Routes.ShowUserPage({userId:authorId})}>
              <a>{authorId}</a>
            </Link>
            , {new Date(updatedAt).toLocaleDateString("en-US")}</p>
        <Markdown  markdown={body}/>
        <div>submit the flag</div>
        <input placeholder="submit flag" /> 
        <br />
        <button onClick={()=>isPreview && alert("TODO: not implemented")}>submit</button>
        <br />
    </>
}
export default ChallengeViewer