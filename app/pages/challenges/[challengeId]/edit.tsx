import EditChallenge from "app/challenges/components/EditChallenge"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes } from "blitz"
import React, { Suspense } from "react"


const Edit: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditChallenge />
      </Suspense>

      <p>
        <Link href={Routes.ChallengesPage()}>
          <a>Challenges</a>
        </Link>
      </p>
    </div>
  )
}

Edit.authenticate = true
Edit.getLayout = (page) => <Layout>{page}</Layout>

export default Edit
