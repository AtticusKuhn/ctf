import React from "react"
import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getChallenge from "app/challenges/queries/getChallenge"
import updateChallenge from "app/challenges/mutations/updateChallenge"
import { ChallengeForm } from "app/challenges/components/ChallengeForm"
import { FORM_ERROR } from "app/core/components/Form"

export const EditChallenge = () => {
  const router = useRouter()
  const challengeId = useParam("challengeId", "number")
  const [challenge, { setQueryData }] = useQuery(
    getChallenge,
    { id: challengeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateChallengeMutation] = useMutation(updateChallenge)

  return (
    <>
      <Head>
        <title>Edit Challenge {challenge.id}</title>
      </Head>

      <div>
        <h1>Edit Challenge {challenge.id}</h1>
        <pre>{JSON.stringify(challenge, null, 2)}</pre>

        <ChallengeForm
          submitText="Update Challenge"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateChallenge}
          initialValues={challenge}
          onSubmit={async (values) => {
            try {
              const filteredValues = Object.assign(values, {
                categories: values.categories.map((a) => a.name),
              })
              console.log("filteredValues", filteredValues)
              const updated = await updateChallengeMutation({
                id: challenge.id,
                ...filteredValues,
              })
              await setQueryData(updated)
              router.push(Routes.ShowChallengePage({ challengeId: updated.id }))
            } catch (error: any) {
              alert(error)
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditChallengePage: BlitzPage = () => {
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

EditChallengePage.authenticate = true
EditChallengePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditChallengePage
