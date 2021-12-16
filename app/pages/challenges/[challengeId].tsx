import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import  Challenge  from "app/challenges/components/ShowChallenge"

const ShowChallengePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ChallengesPage()}>
          <a>Challenges</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Challenge />
      </Suspense>
    </div>
  )
}

ShowChallengePage.authenticate = true
ShowChallengePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowChallengePage
