import Challenge from "app/challenges/components/ShowChallenge"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes } from "blitz"
import React, { Suspense } from "react"

const ShowChallengePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ChallengesPage()}>
          <a>Challenges</a>
        </Link>
      </p>

      {/* <Suspense fallback={<div>Loading...</div>}>
        <Challenge />
      </Suspense> */}
    </div>
  )
}

ShowChallengePage.authenticate = true
ShowChallengePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowChallengePage
