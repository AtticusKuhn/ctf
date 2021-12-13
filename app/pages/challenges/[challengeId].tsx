import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getChallenge from "app/challenges/queries/getChallenge"
import deleteChallenge from "app/challenges/mutations/deleteChallenge"
import Markdown from "app/components/markdown"
import ChallengeViewer from "app/challenges/components/ChallengeViewer"

export const Challenge = () => {
  const router = useRouter()
  const challengeId = useParam("challengeId", "number")
  const [deleteChallengeMutation] = useMutation(deleteChallenge)
  const [challenge] = useQuery(getChallenge, { id: challengeId })

  return (
    <>
      <Head>
        <title>Challenge {challenge.id}</title>
      </Head>

      <div>
        {/* <pre>{JSON.stringify(challenge, null,4)}</pre> */}
        <main style={{ alignContent: "center", alignItems: "center", textAlign: "center" }}>
          <ChallengeViewer {...challenge} />

          <Link href={Routes.EditChallengePage({ challengeId: challenge.id })}>
            <a>Edit</a>
          </Link>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteChallengeMutation({ id: challenge.id })
                router.push(Routes.ChallengesPage())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </main>
      </div>
    </>
  )
}

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
