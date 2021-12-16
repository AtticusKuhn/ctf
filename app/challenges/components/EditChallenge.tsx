import { FORM_ERROR } from "app/core/components/Form"
import { useRouter, useParam, useQuery, useMutation, Routes, Head } from "blitz"
import React from "react"
import updateChallenge from "../mutations/updateChallenge"
import getChallenge from "../queries/getChallenge"
import { ChallengeForm } from "./ChallengeForm"

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
            initialValues={{ ...challenge, categories: challenge.categories.map(c=>c.name)}}
            onSubmit={async (values) => {
              try {
                // const filteredValues = Object.assign(values, {
                //   categories: values.categories.map((a) => a.name),
                // })
                console.log("filteredValues", values)
                const updated = await updateChallengeMutation({
                  id: challenge.id,
                  ...values,
                })
                //@ts-ignore
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
  
  export default EditChallenge