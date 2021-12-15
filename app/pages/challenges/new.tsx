import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createChallenge, { CreateChallenge } from "app/challenges/mutations/createChallenge"
// import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import * as z from "zod"
import { Suspense } from "react"

const NewChallengePage: BlitzPage = () => {
  const router = useRouter()
  const [createChallengeMutation] = useMutation(createChallenge)
//  return <>hi</>
  return (
    <div>
      <h1>Create New Challenge</h1>
    <Suspense fallback="I have no clue why this is here but if I don't I get an error">
      <ChallengeForm
        submitText="Create Challenge"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateChallenge}
        initialValues={{
          title: "string",
          body: "# hello",
          difficulty: "hard",
          categories: ["xss", "bugs"],
        }}
        onSubmit={async (values) => {
          try {
            const challenge = await createChallengeMutation(values)
            router.push(Routes.ShowChallengePage({ challengeId: challenge.id }))
          } catch (error: any) {
            // debugger
            // for(const err of error.issues){

            // }
            // if(error?.issues){

            // }
            console.log(error)
            // alert(errror)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ChallengesPage()}>
          <a>Challenges</a>
        </Link>
      </p>
      </Suspense>

    </div>
  )
}

NewChallengePage.authenticate = true
NewChallengePage.getLayout = (page) => <Layout title={"Create New Challenge"}>{page}</Layout>

export default NewChallengePage
